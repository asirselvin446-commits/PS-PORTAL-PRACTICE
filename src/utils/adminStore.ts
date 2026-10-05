import { doc, getDoc, setDoc, updateDoc, deleteDoc, deleteField, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Problem, TestCase, problems as defaultProblems, LEVELS } from '../data/problems';
import { 
  AdminSettings, 
  StudentProfile, 
  ProblemOverride, 
  LeaderboardRow, 
  StudentSubmission, 
  UserRole,
  Batch,
  Announcement,
  CodeSimilarityPair
} from '../types/admin';

const SETTINGS_KEY = 'fxec_admin_settings';
const OVERRIDES_KEY = 'fxec_problem_overrides';
const CUSTOM_PROBLEMS_KEY = 'fxec_custom_problems';
const STUDENTS_KEY = 'fxec_admin_students';
const LEADERBOARD_SNAPSHOT_KEY = 'fxec_leaderboard_frozen_snapshot';

export const DEFAULT_MIN_PROBLEMS_TO_UNLOCK_LEVEL: Record<number, number> = (() => {
  const map: Record<number, number> = { 2: 5, 3: 15 };
  for (const lvl of LEVELS) {
    if (lvl > 3 && !map[lvl]) {
      map[lvl] = 15 + (lvl - 3) * 10;
    }
  }
  return map;
})();

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  hiddenTestCasesVisibility: 'allow_reveal',
  levelUnlockMode: 'open',
  minProblemsToUnlockLevel: DEFAULT_MIN_PROBLEMS_TO_UNLOCK_LEVEL,
  lockedLevels: [],
  leaderboardFrozen: false,
  leaderboardVisibleToStudents: true,
  excludedLeaderboardUids: [],
  examModeEnabled: false,
  disableCopyPaste: false,
  announcement: '',
  roleAssignments: {}
};

// Listeners for reactivity across components
type Listener<T> = (data: T) => void;
const settingsListeners: Set<Listener<AdminSettings>> = new Set();
const studentsListeners: Set<Listener<StudentProfile[]>> = new Set();
const problemsListeners: Set<Listener<Problem[]>> = new Set();

// -------------------------------------------------------------
// Settings Management
// -------------------------------------------------------------

let isSyncingSettings = false;

function readLocalAdminSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_ADMIN_SETTINGS,
        ...parsed,
        roleAssignments: parsed.roleAssignments || {},
        minProblemsToUnlockLevel: {
          ...DEFAULT_MIN_PROBLEMS_TO_UNLOCK_LEVEL,
          ...(parsed.minProblemsToUnlockLevel || {})
        }
      };
    }
  } catch (err) {
    console.warn('Error reading admin settings from localStorage:', err);
  }
  return { ...DEFAULT_ADMIN_SETTINGS };
}

export async function fetchAdminSettingsFromFirestore(): Promise<AdminSettings> {
  const local = readLocalAdminSettings();
  try {
    const settingsDocRef = doc(db, 'settings', 'global');
    const snap = await getDoc(settingsDocRef);
    if (snap.exists()) {
      const remoteData = snap.data() as Partial<AdminSettings> & { updatedAt?: string };
      const remoteUpdatedAt = remoteData.updatedAt ? new Date(remoteData.updatedAt).getTime() : 0;
      const localUpdatedAt = local.updatedAt ? new Date(local.updatedAt).getTime() : 0;

      // Use Firestore document when it is newer
      if (remoteUpdatedAt > localUpdatedAt) {
        const merged: AdminSettings = {
          ...DEFAULT_ADMIN_SETTINGS,
          ...remoteData,
          roleAssignments: remoteData.roleAssignments || {},
          minProblemsToUnlockLevel: {
            ...DEFAULT_MIN_PROBLEMS_TO_UNLOCK_LEVEL,
            ...(remoteData.minProblemsToUnlockLevel || {})
          },
          updatedAt: remoteData.updatedAt
        };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
        settingsListeners.forEach(listener => listener(merged));
        return merged;
      }
    }
  } catch (err) {
    console.warn('Error fetching admin settings from Firestore, falling back to localStorage:', err);
  }
  return local;
}

export function getAdminSettings(): AdminSettings {
  const local = readLocalAdminSettings();

  // Load path: fetch Firestore document and use it when newer, falling back to localStorage
  if (!isSyncingSettings && typeof window !== 'undefined') {
    isSyncingSettings = true;
    fetchAdminSettingsFromFirestore().finally(() => {
      isSyncingSettings = false;
    });
  }

  return local;
}

export async function assignUserRole(email: string, role: UserRole, operatorRole?: UserRole): Promise<void> {
  const normalized = email.trim().toLowerCase();
  if (normalized === 'asirselvin446@gmail.com') {
    throw new Error('Developer account role cannot be changed.');
  }

  // Operator authorization check
  if (operatorRole && operatorRole !== 'developer' && operatorRole !== 'primary_admin') {
    throw new Error('Unauthorized: Only Master Developer or Primary Administrator can assign roles.');
  }

  // Permission checks if operator is Primary Admin
  if (operatorRole === 'primary_admin') {
    if (role !== 'admin' && role !== 'staff') {
      throw new Error('Primary Administrator can only assign Sub-Admin or Staff roles.');
    }
    const currentSettings = getAdminSettings();
    const existingTargetRole = currentSettings.roleAssignments?.[normalized];
    if (existingTargetRole === 'primary_admin' || existingTargetRole === 'developer') {
      throw new Error('Primary Administrator cannot modify another Primary Admin or Developer.');
    }
  }

  const settings = getAdminSettings();
  const updatedAssignments: Record<string, UserRole> = {
    ...(settings.roleAssignments || {}),
    [normalized]: role
  };

  const updatedSettings: AdminSettings = {
    ...settings,
    roleAssignments: updatedAssignments
  };

  await saveAdminSettings(updatedSettings);

  // Also update stored student profiles and Firestore user doc
  const students = getStoredStudents();
  const student = students.find(s => s.email.trim().toLowerCase() === normalized);
  if (student) {
    student.role = role;
    saveStudents([...students]);

    try {
      const userRef = doc(db, 'users', student.uid);
      await updateDoc(userRef, { role, updatedAt: new Date().toISOString() });
    } catch (e) {
      console.warn('Could not update user doc directly:', e);
    }
  }
}

export async function removeUserRole(email: string, operatorRole?: UserRole): Promise<void> {
  const normalized = email.trim().toLowerCase();
  if (normalized === 'asirselvin446@gmail.com') {
    throw new Error('Developer account role cannot be removed.');
  }

  // Operator authorization check
  if (operatorRole && operatorRole !== 'developer' && operatorRole !== 'primary_admin') {
    throw new Error('Unauthorized: Only Master Developer or Primary Administrator can remove roles.');
  }

  const settings = getAdminSettings();
  if (operatorRole === 'primary_admin') {
    const existingTargetRole = settings.roleAssignments?.[normalized];
    if (existingTargetRole === 'primary_admin' || existingTargetRole === 'developer') {
      throw new Error('Primary Administrator cannot remove Primary Admin or Developer accounts.');
    }
  }

  const updatedAssignments = { ...(settings.roleAssignments || {}) };
  delete updatedAssignments[normalized];

  const updatedSettings: AdminSettings = {
    ...settings,
    roleAssignments: updatedAssignments
  };

  await saveAdminSettings(updatedSettings);

  // Revert stored student to default 'student'
  const students = getStoredStudents();
  const student = students.find(s => s.email.trim().toLowerCase() === normalized);
  if (student) {
    student.role = 'student';
    saveStudents([...students]);

    try {
      const userRef = doc(db, 'users', student.uid);
      await updateDoc(userRef, { role: 'student', updatedAt: new Date().toISOString() });
    } catch (e) {
      console.warn('Could not update user doc directly:', e);
    }
  }
}

export async function saveAdminSettings(newSettings: AdminSettings): Promise<void> {
  const timestamp = new Date().toISOString();
  const settingsWithTimestamp: AdminSettings = {
    ...newSettings,
    updatedAt: timestamp
  };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsWithTimestamp));
  settingsListeners.forEach(listener => listener(settingsWithTimestamp));

  // Sync to Firestore
  try {
    const settingsDoc = doc(db, 'settings', 'global');
    await setDoc(settingsDoc, settingsWithTimestamp, { merge: true });
  } catch (err) {
    console.warn('Firestore settings sync notice:', err);
  }
}

export function subscribeAdminSettings(listener: Listener<AdminSettings>): () => void {
  settingsListeners.add(listener);
  // Also initiate background Firestore sync if not already done
  if (!isSyncingSettings && typeof window !== 'undefined') {
    isSyncingSettings = true;
    fetchAdminSettingsFromFirestore().finally(() => {
      isSyncingSettings = false;
    });
  }
  return () => { settingsListeners.delete(listener); };
}

// -------------------------------------------------------------
// Problem & Test Case Overrides
// -------------------------------------------------------------

let hasFetchedOverrides = false;
let hasFetchedCustomProblems = false;

export async function fetchProblemOverridesFromFirestore(): Promise<Record<string, ProblemOverride>> {
  try {
    const overrideDoc = doc(db, 'settings', 'problem_overrides');
    const snap = await getDoc(overrideDoc);
    if (snap.exists()) {
      const data = snap.data();
      if (data.overrides) {
        localStorage.setItem(OVERRIDES_KEY, JSON.stringify(data.overrides));
        const updatedProblems = getEffectiveProblems();
        problemsListeners.forEach(listener => listener(updatedProblems));
        return data.overrides;
      }
    }
  } catch (err) {
    console.warn('Firestore problem overrides fetch notice:', err);
  }
  return getProblemOverrides();
}

export function getProblemOverrides(): Record<string, ProblemOverride> {
  let overrides: Record<string, ProblemOverride> = {};
  try {
    const raw = localStorage.getItem(OVERRIDES_KEY);
    overrides = raw ? JSON.parse(raw) : {};
  } catch {
    overrides = {};
  }

  if (!hasFetchedOverrides && typeof window !== 'undefined') {
    hasFetchedOverrides = true;
    fetchProblemOverridesFromFirestore().catch(() => {});
  }

  return overrides;
}

export async function fetchCustomProblemsFromFirestore(): Promise<Problem[]> {
  try {
    const customDoc = doc(db, 'settings', 'custom_problems');
    const snap = await getDoc(customDoc);
    if (snap.exists()) {
      const data = snap.data();
      if (Array.isArray(data.problems)) {
        localStorage.setItem(CUSTOM_PROBLEMS_KEY, JSON.stringify(data.problems));
        const updatedProblems = getEffectiveProblems();
        problemsListeners.forEach(listener => listener(updatedProblems));
        return data.problems;
      }
    }
  } catch (err) {
    console.warn('Firestore custom problems fetch notice:', err);
  }
  return getCustomAddedProblems();
}

export function getCustomAddedProblems(): Problem[] {
  let list: Problem[] = [];
  try {
    const raw = localStorage.getItem(CUSTOM_PROBLEMS_KEY);
    list = raw ? JSON.parse(raw) : [];
  } catch {
    list = [];
  }

  if (!hasFetchedCustomProblems && typeof window !== 'undefined') {
    hasFetchedCustomProblems = true;
    fetchCustomProblemsFromFirestore().catch(() => {});
  }

  return list;
}

export function getEffectiveProblems(): Problem[] {
  const overrides = getProblemOverrides();
  const custom = getCustomAddedProblems();

  const mergedDefaults = defaultProblems.map((p) => {
    const over = overrides[p.id];
    if (!over) return p;
    return {
      ...p,
      title: over.title ?? p.title,
      difficulty: over.difficulty ?? p.difficulty,
      level: over.level ?? p.level,
      description: over.description ?? p.description,
      starterCode: over.starterCode ?? p.starterCode,
      functionName: over.functionName ?? p.functionName,
      testCases: over.testCases ? [...over.testCases] : p.testCases
    };
  });

  return [...mergedDefaults, ...custom];
}

export async function saveProblemOverride(override: ProblemOverride): Promise<void> {
  const overrides = getProblemOverrides();
  overrides[override.id] = { ...(overrides[override.id] || {}), ...override };
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
  
  const updatedProblems = getEffectiveProblems();
  problemsListeners.forEach(listener => listener(updatedProblems));

  try {
    const overrideDoc = doc(db, 'settings', 'problem_overrides');
    await setDoc(overrideDoc, { overrides, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn('Firestore problem override sync notice:', err);
  }
}

export async function addCustomProblem(problem: Problem): Promise<void> {
  const custom = getCustomAddedProblems();
  const filtered = custom.filter(p => p.id !== problem.id);
  filtered.push(problem);
  localStorage.setItem(CUSTOM_PROBLEMS_KEY, JSON.stringify(filtered));

  const updatedProblems = getEffectiveProblems();
  problemsListeners.forEach(listener => listener(updatedProblems));

  // Sync to Firestore so custom problems survive across devices, consistent with problem overrides
  try {
    const customDoc = doc(db, 'settings', 'custom_problems');
    await setDoc(customDoc, { problems: filtered, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn('Firestore custom problem sync notice:', err);
  }
}

export async function deleteCustomProblem(problemId: string): Promise<void> {
  const custom = getCustomAddedProblems().filter(p => p.id !== problemId);
  localStorage.setItem(CUSTOM_PROBLEMS_KEY, JSON.stringify(custom));

  const overrides = getProblemOverrides();
  delete overrides[problemId];
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));

  const updatedProblems = getEffectiveProblems();
  problemsListeners.forEach(listener => listener(updatedProblems));

  try {
    const customDoc = doc(db, 'settings', 'custom_problems');
    await setDoc(customDoc, { problems: custom, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn('Firestore custom problem delete notice:', err);
  }
}

export function subscribeProblems(listener: Listener<Problem[]>): () => void {
  problemsListeners.add(listener);
  return () => { problemsListeners.delete(listener); };
}

// -------------------------------------------------------------
// Student Profiles & Submissions Management
// -------------------------------------------------------------

export async function fetchStudentsFromFirestore(throwOnError = false): Promise<StudentProfile[]> {
  try {
    const usersCol = collection(db, 'users');
    const snapshot = await getDocs(usersCol);
    if (!snapshot.empty) {
      const localStudents = getStoredStudents();
      const localMap = new Map(localStudents.map(s => [s.uid, s]));
      const firestoreStudents: StudentProfile[] = [];

      for (const userDoc of snapshot.docs) {
        const data = userDoc.data();
        const uid = data.uid || userDoc.id;
        const local = localMap.get(uid);

        let solvedArr: string[] = Array.isArray(data.solvedProblems) ? data.solvedProblems : [];
        let attemptedArr: string[] = Array.isArray(data.attemptedProblems) ? data.attemptedProblems : [];

        // Check if user has progress doc
        try {
          const progDoc = await getDoc(doc(db, 'users', uid, 'progress', 'current'));
          if (progDoc.exists()) {
            const pData = progDoc.data();
            if (Array.isArray(pData.solvedProblems) && pData.solvedProblems.length >= solvedArr.length) {
              solvedArr = pData.solvedProblems;
            }
            if (Array.isArray(pData.attemptedProblems)) {
              attemptedArr = pData.attemptedProblems;
            }
          }
        } catch {
          // ignore subcollection read error if rules block or doc missing
        }

        const emailLower = (data.email || '').toLowerCase().trim();
        // NEVER include developer account in students roster visible to faculty/staff
        if (emailLower === 'asirselvin446@gmail.com' || data.role === 'developer') {
          continue;
        }

        const settings = getAdminSettings();
        let resolvedRole: UserRole = 'student';
        if (settings.roleAssignments && settings.roleAssignments[emailLower]) {
          resolvedRole = settings.roleAssignments[emailLower];
        } else if (data.role === 'admin' || data.role === 'staff') {
          resolvedRole = data.role;
        } else {
          resolvedRole = 'student';
        }

        const profile: StudentProfile = {
          uid,
          email: data.email || '',
          displayName: data.displayName || data.email?.split('@')[0] || 'Student',
          rollNumber: data.rollNumber || data.email?.split('@')[0]?.toUpperCase() || 'UNREGISTERED',
          department: data.department || 'Computer Science & Engineering',
          batch: data.batch || local?.batch || undefined,
          isSuspended: data.isSuspended ?? local?.isSuspended ?? false,
          unlockedLevels: data.unlockedLevels || local?.unlockedLevels || [],
          role: resolvedRole,
          photoURL: data.photoURL || undefined,
          solvedProblems: Array.from(new Set([...solvedArr, ...(local?.solvedProblems || [])])),
          attemptedProblems: Array.from(new Set([...attemptedArr, ...(local?.attemptedProblems || [])])),
          lastActive: data.lastActive || data.lastLoginAt || data.updatedAt || new Date().toISOString(),
          joinedAt: data.createdAt || data.joinedAt || new Date().toISOString(),
          submissions: {
            ...(data.submissions || {}),
            ...(local?.submissions || {})
          }
        };

        firestoreStudents.push(profile);
      }

      if (firestoreStudents.length > 0) {
        saveStudents(firestoreStudents);
        return firestoreStudents;
      }
    }
  } catch (err) {
    console.warn('Notice: Firestore student fetch fallback to local cache:', err);
    if (throwOnError) {
      throw err;
    }
  }

  return getStoredStudents();
}

export function getStoredStudents(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(STUDENTS_KEY);
    if (raw) {
      const parsed: StudentProfile[] = JSON.parse(raw);
      return parsed.filter(s => s.email?.toLowerCase().trim() !== 'asirselvin446@gmail.com' && s.role !== 'developer');
    }
  } catch (err) {
    console.warn('Error reading students from localStorage:', err);
  }
  return [];
}

export function saveStudents(students: StudentProfile[]): void {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  studentsListeners.forEach(listener => listener(students));
}

export function subscribeStudents(listener: Listener<StudentProfile[]>): () => void {
  studentsListeners.add(listener);
  return () => { studentsListeners.delete(listener); };
}

export function getStudent(uid: string): StudentProfile | undefined {
  const students = getStoredStudents();
  return students.find(s => s.uid === uid);
}

export async function registerOrUpdateStudent(profile: Partial<StudentProfile> & { uid: string; email: string }): Promise<void> {
  const emailLower = (profile.email || '').toLowerCase().trim();
  if (emailLower === 'asirselvin446@gmail.com' || profile.role === 'developer') {
    return; // Developer is never registered as a student
  }

  const students = getStoredStudents();
  const existingIdx = students.findIndex(s => s.uid === profile.uid);

  const effectiveSolved = profile.solvedProblems || (profile.uid ? JSON.parse(localStorage.getItem(`solved_${profile.uid}`) || '[]') : []);
  const effectiveAttempted = profile.attemptedProblems || (profile.uid ? JSON.parse(localStorage.getItem(`attempted_${profile.uid}`) || '[]') : []);

  // Collect submitted code from localStorage if available
  const submissions: Record<string, StudentSubmission> = {};
  effectiveSolved.forEach((pid: string) => {
    const code = localStorage.getItem(`code_${profile.uid}_${pid}`) || localStorage.getItem(`passed_code_${profile.uid}_${pid}`);
    if (code) {
      submissions[pid] = {
        code,
        passedCount: 4,
        totalCount: 4,
        passedAt: new Date().toISOString()
      };
    }
  });

  const updatedProfile: StudentProfile = {
    uid: profile.uid,
    email: profile.email,
    displayName: profile.displayName || profile.email.split('@')[0],
    rollNumber: profile.rollNumber || profile.email.split('@')[0].toUpperCase(),
    department: profile.department || 'Computer Science & Engineering',
    batch: profile.batch || (existingIdx >= 0 ? students[existingIdx].batch : undefined),
    isSuspended: profile.isSuspended ?? (existingIdx >= 0 ? students[existingIdx].isSuspended : false),
    unlockedLevels: profile.unlockedLevels || (existingIdx >= 0 ? students[existingIdx].unlockedLevels : []),
    role: profile.role || 'student',
    photoURL: profile.photoURL,
    solvedProblems: Array.from(new Set(effectiveSolved)),
    attemptedProblems: Array.from(new Set(effectiveAttempted)),
    lastActive: new Date().toISOString(),
    joinedAt: existingIdx >= 0 ? students[existingIdx].joinedAt : new Date().toISOString(),
    submissions: {
      ...(existingIdx >= 0 ? students[existingIdx].submissions : {}),
      ...submissions,
      ...(profile.submissions || {})
    }
  };

  if (existingIdx >= 0) {
    students[existingIdx] = updatedProfile;
  } else {
    students.push(updatedProfile);
  }

  saveStudents(students);

  // Sync to Firestore
  try {
    const userDocRef = doc(db, 'users', profile.uid);
    await setDoc(userDocRef, {
      uid: updatedProfile.uid,
      email: updatedProfile.email,
      displayName: updatedProfile.displayName,
      rollNumber: updatedProfile.rollNumber,
      department: updatedProfile.department,
      role: updatedProfile.role,
      photoURL: updatedProfile.photoURL || '',
      college: 'Francis Xavier Engineering College',
      lastActive: updatedProfile.lastActive,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    const progressRef = doc(db, 'users', profile.uid, 'progress', 'current');
    await setDoc(progressRef, {
      userId: profile.uid,
      solvedProblems: updatedProfile.solvedProblems,
      attemptedProblems: updatedProfile.attemptedProblems,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore student profile sync notice:', err);
  }
}

export async function overrideStudentProblem(
  uid: string,
  problemId: string,
  action: 'solve' | 'unsolve' | 'attempt'
): Promise<void> {
  const students = getStoredStudents();
  const idx = students.findIndex(s => s.uid === uid);
  if (idx < 0) return;

  const student = students[idx];
  const solved = new Set(student.solvedProblems);
  const attempted = new Set(student.attemptedProblems);

  if (action === 'solve') {
    solved.add(problemId);
    attempted.delete(problemId);
    if (!student.submissions) student.submissions = {};
    if (!student.submissions[problemId]) {
      student.submissions[problemId] = {
        code: `// Manually verified & credited by Faculty Administrator\n// Date: ${new Date().toLocaleDateString()}\n#include <stdio.h>\n\nint main() {\n    // Solution approved by evaluation committee\n    return 0;\n}`,
        passedAt: new Date().toISOString(),
        passedCount: 4,
        totalCount: 4
      };
    }
    localStorage.setItem(`passed_code_${uid}_${problemId}`, student.submissions[problemId].code);
  } else if (action === 'unsolve') {
    solved.delete(problemId);
    attempted.add(problemId);
    localStorage.removeItem(`passed_code_${uid}_${problemId}`);
  } else if (action === 'attempt') {
    solved.delete(problemId);
    attempted.add(problemId);
  }

  student.solvedProblems = Array.from(solved);
  student.attemptedProblems = Array.from(attempted);
  student.lastActive = new Date().toISOString();
  students[idx] = student;

  saveStudents(students);
  localStorage.setItem(`solved_${uid}`, JSON.stringify(student.solvedProblems));
  localStorage.setItem(`attempted_${uid}`, JSON.stringify(student.attemptedProblems));

  try {
    const progressRef = doc(db, 'users', uid, 'progress', 'current');
    await setDoc(progressRef, {
      userId: uid,
      solvedProblems: student.solvedProblems,
      attemptedProblems: student.attemptedProblems,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    // Keep the submissions map on the user doc in sync so the solve record is
    // consistent on every device (previously only the progress doc was updated,
    // leaving solved-without-code records visible elsewhere).
    const userRef = doc(db, 'users', uid);
    if (action === 'solve' && student.submissions?.[problemId]) {
      await setDoc(userRef, {
        [`submissions.${problemId}`]: student.submissions[problemId]
      }, { merge: true });
    } else if (action === 'unsolve' || action === 'attempt') {
      await updateDoc(userRef, {
        [`submissions.${problemId}`]: deleteField()
      }).catch(() => {});
    }
  } catch (err) {
    console.warn('Firestore override sync notice:', err);
  }
}

export async function resetStudentProgress(uid: string, level?: number, allProblems?: Problem[]): Promise<void> {
  const students = getStoredStudents();
  const idx = students.findIndex(s => s.uid === uid);
  if (idx < 0) return;

  const student = students[idx];
  if (level !== undefined && allProblems) {
    const levelProblemIds = new Set(allProblems.filter(p => p.level === level).map(p => p.id));
    student.solvedProblems = (student.solvedProblems || []).filter(pid => !levelProblemIds.has(pid));
    student.attemptedProblems = (student.attemptedProblems || []).filter(pid => !levelProblemIds.has(pid));
    if (student.submissions) {
      for (const pid of levelProblemIds) {
        delete student.submissions[pid];
        localStorage.removeItem(`passed_code_${uid}_${pid}`);
        localStorage.removeItem(`code_${uid}_${pid}`);
      }
    }
  } else {
    student.solvedProblems = [];
    student.attemptedProblems = [];
    student.submissions = {};
    localStorage.removeItem(`solved_${uid}`);
    localStorage.removeItem(`attempted_${uid}`);
    for (let k = localStorage.length - 1; k >= 0; k--) {
      const key = localStorage.key(k);
      if (key && (key.startsWith(`code_${uid}_`) || key.startsWith(`passed_code_${uid}_`))) {
        localStorage.removeItem(key);
      }
    }
  }
  student.lastActive = new Date().toISOString();
  students[idx] = student;
  saveStudents(students);

  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      solvedProblems: student.solvedProblems,
      attemptedProblems: student.attemptedProblems,
      submissions: student.submissions || {},
      lastActive: student.lastActive,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    const progressRef = doc(db, 'users', uid, 'progress', 'current');
    await setDoc(progressRef, {
      userId: uid,
      solvedProblems: student.solvedProblems,
      attemptedProblems: student.attemptedProblems,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore reset progress notice:', err);
  }
}

export async function toggleStudentLevelUnlock(uid: string, level: number): Promise<number[]> {
  const students = getStoredStudents();
  const idx = students.findIndex(s => s.uid === uid);
  if (idx < 0) return [];

  const student = students[idx];
  const unlocked = new Set<number>(student.unlockedLevels || []);
  if (unlocked.has(level)) {
    unlocked.delete(level);
  } else {
    unlocked.add(level);
  }
  const newUnlocked = Array.from(unlocked).sort((a, b) => a - b);
  student.unlockedLevels = newUnlocked;
  students[idx] = student;
  saveStudents(students);

  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      unlockedLevels: newUnlocked,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore toggle level unlock sync notice:', err);
  }

  return newUnlocked;
}

export async function toggleStudentSuspension(uid: string, isSuspended: boolean): Promise<void> {
  const students = getStoredStudents();
  const idx = students.findIndex(s => s.uid === uid);
  if (idx < 0) return;

  const student = students[idx];
  student.isSuspended = isSuspended;
  students[idx] = student;
  saveStudents(students);

  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      isSuspended,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore suspension sync notice:', err);
  }
}

export async function updateStudentRole(uid: string, newRole: UserRole, operatorRole?: UserRole): Promise<void> {
  const students = getStoredStudents();
  const student = students.find(s => s.uid === uid);
  if (!student) throw new Error('Student not found');

  if (student.email?.toLowerCase().trim() === 'asirselvin446@gmail.com') {
    throw new Error('Developer account role cannot be changed.');
  }

  await assignUserRole(student.email, newRole, operatorRole);
}

export async function assignStudentBatch(uid: string, batchName: string): Promise<void> {
  const students = getStoredStudents();
  const idx = students.findIndex(s => s.uid === uid);
  if (idx < 0) return;

  students[idx].batch = batchName || undefined;
  saveStudents(students);

  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      batch: batchName || '',
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore batch assignment notice:', err);
  }
}

export async function bulkAssignBatch(uids: string[], batchName: string): Promise<void> {
  const uidSet = new Set(uids);
  const students = getStoredStudents();
  students.forEach(s => {
    if (uidSet.has(s.uid)) {
      s.batch = batchName || undefined;
    }
  });
  saveStudents(students);

  await Promise.all(
    uids.map(async (uid) => {
      try {
        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, { batch: batchName || '', updatedAt: new Date().toISOString() }, { merge: true });
      } catch (e) {
        console.warn('Error syncing batch for user:', uid, e);
      }
    })
  );
}

export async function bulkResetProgress(uids: string[], level?: number, allProblems?: Problem[]): Promise<void> {
  for (const uid of uids) {
    await resetStudentProgress(uid, level, allProblems);
  }
}

export function updateStudentDetails(
  uid: string,
  details: { displayName: string; rollNumber: string; department: string; batch?: string; role?: UserRole }
): void {
  const students = getStoredStudents();
  const idx = students.findIndex(s => s.uid === uid);
  if (idx >= 0) {
    students[idx] = {
      ...students[idx],
      ...details,
      lastActive: new Date().toISOString()
    };
    saveStudents(students);

    try {
      const userRef = doc(db, 'users', uid);
      updateDoc(userRef, { ...details, updatedAt: new Date().toISOString() });
    } catch {}
  }
}

export async function deleteStudent(uid: string): Promise<void> {
  const students = getStoredStudents().filter(s => s.uid !== uid);
  saveStudents(students);
  localStorage.removeItem(`solved_${uid}`);
  localStorage.removeItem(`attempted_${uid}`);
  localStorage.removeItem(`code_${uid}`);

  try {
    const userRef = doc(db, 'users', uid);
    await deleteDoc(userRef);
    const progressRef = doc(db, 'users', uid, 'progress', 'current');
    await deleteDoc(progressRef).catch(() => {});
  } catch (err) {
    console.warn('Firestore delete student notice:', err);
  }
}

export async function bulkDeleteStudents(uids: string[]): Promise<void> {
  const uidSet = new Set(uids);
  const students = getStoredStudents().filter(s => !uidSet.has(s.uid));
  saveStudents(students);

  await Promise.all(
    uids.map(async (uid) => {
      localStorage.removeItem(`solved_${uid}`);
      localStorage.removeItem(`attempted_${uid}`);
      try {
        const userRef = doc(db, 'users', uid);
        await deleteDoc(userRef);
        const progressRef = doc(db, 'users', uid, 'progress', 'current');
        await deleteDoc(progressRef).catch(() => {});
      } catch (e) {
        console.warn('Error deleting student from Firestore:', uid, e);
      }
    })
  );
}

// -------------------------------------------------------------
// Batches / Sections Management
// -------------------------------------------------------------

const BATCHES_KEY = 'fxec_batches';
export const DEFAULT_BATCHES: Batch[] = [
  { id: 'batch_2021_2025', name: 'Batch 2021-2025', createdAt: '2021-08-01T00:00:00.000Z' },
  { id: 'batch_2022_2026', name: 'Batch 2022-2026', createdAt: '2022-08-01T00:00:00.000Z' },
  { id: 'batch_2023_2027', name: 'Batch 2023-2027', createdAt: '2023-08-01T00:00:00.000Z' },
  { id: 'batch_2024_2028', name: 'Batch 2024-2028', createdAt: '2024-08-01T00:00:00.000Z' }
];

export function getStoredBatches(): Batch[] {
  try {
    const raw = localStorage.getItem(BATCHES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return DEFAULT_BATCHES;
}

export async function fetchBatchesFromFirestore(): Promise<Batch[]> {
  try {
    const batchDocRef = doc(db, 'settings', 'batches');
    const snap = await getDoc(batchDocRef);
    if (snap.exists() && Array.isArray(snap.data()?.batches)) {
      const batches: Batch[] = snap.data().batches;
      localStorage.setItem(BATCHES_KEY, JSON.stringify(batches));
      return batches;
    }
  } catch (err) {
    console.warn('Error fetching batches from Firestore:', err);
  }
  return getStoredBatches();
}

export async function saveBatches(batches: Batch[]): Promise<void> {
  localStorage.setItem(BATCHES_KEY, JSON.stringify(batches));
  try {
    const batchDocRef = doc(db, 'settings', 'batches');
    await setDoc(batchDocRef, { batches, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn('Firestore batches sync notice:', err);
  }
}

export async function createBatch(name: string): Promise<Batch> {
  const trimmed = name.trim();
  if (!trimmed) throw new Error('Batch name cannot be empty');
  const batches = getStoredBatches();
  if (batches.some(b => b.name.toLowerCase() === trimmed.toLowerCase())) {
    throw new Error('A batch with this name already exists');
  }
  const newBatch: Batch = {
    id: `batch_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    name: trimmed,
    createdAt: new Date().toISOString()
  };
  const updated = [...batches, newBatch];
  await saveBatches(updated);
  return newBatch;
}

export async function renameBatch(oldName: string, newName: string): Promise<void> {
  const trimmed = newName.trim();
  if (!trimmed) throw new Error('New batch name cannot be empty');
  const batches = getStoredBatches();
  const idx = batches.findIndex(b => b.name === oldName);
  if (idx < 0) throw new Error('Batch not found');
  batches[idx].name = trimmed;
  await saveBatches(batches);

  const students = getStoredStudents();
  let changed = false;
  students.forEach(s => {
    if (s.batch === oldName) {
      s.batch = trimmed;
      changed = true;
      try {
        const userRef = doc(db, 'users', s.uid);
        updateDoc(userRef, { batch: trimmed, updatedAt: new Date().toISOString() });
      } catch {}
    }
  });
  if (changed) saveStudents(students);
}

export async function deleteBatch(batchName: string): Promise<void> {
  const batches = getStoredBatches().filter(b => b.name !== batchName);
  await saveBatches(batches);

  const students = getStoredStudents();
  let changed = false;
  students.forEach(s => {
    if (s.batch === batchName) {
      s.batch = undefined;
      changed = true;
      try {
        const userRef = doc(db, 'users', s.uid);
        updateDoc(userRef, { batch: '', updatedAt: new Date().toISOString() });
      } catch {}
    }
  });
  if (changed) saveStudents(students);
}

// -------------------------------------------------------------
// Announcements Management
// -------------------------------------------------------------

const ANNOUNCEMENTS_KEY = 'fxec_announcements';
const DISMISSED_ANNOUNCEMENTS_KEY = 'fxec_dismissed_announcements';

export function getStoredAnnouncements(): Announcement[] {
  try {
    const raw = localStorage.getItem(ANNOUNCEMENTS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  return [];
}

export async function fetchAnnouncementsFromFirestore(): Promise<Announcement[]> {
  try {
    const annDocRef = doc(db, 'settings', 'announcements');
    const snap = await getDoc(annDocRef);
    if (snap.exists() && Array.isArray(snap.data()?.announcements)) {
      const announcements: Announcement[] = snap.data().announcements;
      localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements));
      return announcements;
    }
  } catch (err) {
    console.warn('Error fetching announcements from Firestore:', err);
  }
  return getStoredAnnouncements();
}

export async function saveAnnouncements(announcements: Announcement[]): Promise<void> {
  localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements));
  try {
    const annDocRef = doc(db, 'settings', 'announcements');
    await setDoc(annDocRef, { announcements, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn('Firestore announcements sync notice:', err);
  }
}

export async function createAnnouncement(
  title: string,
  message: string,
  targetUids?: string[],
  createdBy?: string
): Promise<Announcement> {
  const announcements = getStoredAnnouncements();
  const newAnn: Announcement = {
    id: `ann_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    title: title.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
    createdBy,
    targetUids: targetUids && targetUids.length > 0 ? targetUids : undefined,
    active: true
  };
  const updated = [newAnn, ...announcements];
  await saveAnnouncements(updated);
  return newAnn;
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const announcements = getStoredAnnouncements().filter(a => a.id !== id);
  await saveAnnouncements(announcements);
}

export function dismissAnnouncement(id: string): void {
  try {
    const dismissed = getDismissedAnnouncements();
    if (!dismissed.includes(id)) {
      dismissed.push(id);
      localStorage.setItem(DISMISSED_ANNOUNCEMENTS_KEY, JSON.stringify(dismissed));
    }
  } catch {}
}

export function getDismissedAnnouncements(): string[] {
  try {
    const raw = localStorage.getItem(DISMISSED_ANNOUNCEMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// -------------------------------------------------------------
// Manual Student Add & CSV Import
// -------------------------------------------------------------

export function validateCollegeEmail(email: string): boolean {
  const norm = email.trim().toLowerCase();
  return /^[a-zA-Z0-9._%+-]+@francisxavier\.ac\.in$/.test(norm);
}

export async function addManualStudent(data: {
  displayName: string;
  rollNumber: string;
  email: string;
  department: string;
  batch?: string;
}): Promise<StudentProfile> {
  const email = data.email.trim().toLowerCase();
  if (!validateCollegeEmail(email)) {
    throw new Error('Invalid email: Must be an official @francisxavier.ac.in institutional account.');
  }
  const roll = data.rollNumber.trim().toUpperCase();
  const name = data.displayName.trim();
  if (!roll || !name) {
    throw new Error('Name and Roll Number are required.');
  }

  const existing = getStoredStudents();
  if (existing.some(s => s.email.toLowerCase() === email)) {
    throw new Error(`A student with email ${email} already exists.`);
  }
  if (existing.some(s => s.rollNumber.toUpperCase() === roll)) {
    throw new Error(`A student with roll number ${roll} already exists.`);
  }

  const uid = `student_${roll.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Date.now()}`;
  const newProfile: StudentProfile = {
    uid,
    email,
    displayName: name,
    rollNumber: roll,
    department: data.department || 'Computer Science & Engineering',
    batch: data.batch?.trim() || undefined,
    role: 'student',
    solvedProblems: [],
    attemptedProblems: [],
    lastActive: new Date().toISOString(),
    joinedAt: new Date().toISOString(),
    submissions: {}
  };

  const updated = [newProfile, ...existing];
  saveStudents(updated);

  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...newProfile,
      college: 'Francis Xavier Engineering College',
      createdAt: newProfile.joinedAt,
      lastLoginAt: newProfile.lastActive,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore manual student add notice:', err);
  }

  return newProfile;
}

export async function importStudentsFromCSV(csvText: string): Promise<{
  successCount: number;
  errors: string[];
  imported: StudentProfile[];
}> {
  const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) {
    throw new Error('CSV must contain a header row and at least one student data row.');
  }

  const header = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
  const nameIdx = header.findIndex(h => h.includes('name'));
  const rollIdx = header.findIndex(h => h.includes('roll'));
  const emailIdx = header.findIndex(h => h.includes('email') || h.includes('mail'));
  const deptIdx = header.findIndex(h => h.includes('dept') || h.includes('department'));
  const batchIdx = header.findIndex(h => h.includes('batch') || h.includes('section'));

  if (emailIdx === -1) {
    throw new Error('CSV must include an "Email" column.');
  }

  const existing = getStoredStudents();
  const emailSet = new Set(existing.map(s => s.email.toLowerCase().trim()));
  const rollSet = new Set(existing.map(s => s.rollNumber.toUpperCase().trim()));

  const imported: StudentProfile[] = [];
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i];
    const cols = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)?.map(c => c.trim().replace(/^"|"$/g, '')) || row.split(',').map(c => c.trim());
    const email = (cols[emailIdx] || '').trim().toLowerCase();
    const name = nameIdx !== -1 && cols[nameIdx] ? cols[nameIdx].trim() : (email.split('@')[0] || `Student ${i}`);
    const roll = rollIdx !== -1 && cols[rollIdx] ? cols[rollIdx].trim().toUpperCase() : email.split('@')[0].toUpperCase();
    const dept = deptIdx !== -1 && cols[deptIdx] ? cols[deptIdx].trim() : 'Computer Science & Engineering';
    const batch = batchIdx !== -1 && cols[batchIdx] ? cols[batchIdx].trim() : undefined;

    if (!email) {
      errors.push(`Row ${i + 1}: Missing email.`);
      continue;
    }
    if (!validateCollegeEmail(email)) {
      errors.push(`Row ${i + 1} (${email}): Skipped — Must be @francisxavier.ac.in email.`);
      continue;
    }
    if (emailSet.has(email)) {
      errors.push(`Row ${i + 1} (${email}): Skipped — Student email already registered.`);
      continue;
    }
    if (rollSet.has(roll)) {
      errors.push(`Row ${i + 1} (${roll}): Skipped — Roll number already registered.`);
      continue;
    }

    const uid = `student_${roll.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Date.now()}_${i}`;
    const newStudent: StudentProfile = {
      uid,
      email,
      displayName: name,
      rollNumber: roll,
      department: dept,
      batch: batch || undefined,
      role: 'student',
      solvedProblems: [],
      attemptedProblems: [],
      lastActive: new Date().toISOString(),
      joinedAt: new Date().toISOString(),
      submissions: {}
    };

    imported.push(newStudent);
    emailSet.add(email);
    rollSet.add(roll);

    try {
      const userRef = doc(db, 'users', uid);
      setDoc(userRef, {
        ...newStudent,
        college: 'Francis Xavier Engineering College',
        createdAt: newStudent.joinedAt,
        lastLoginAt: newStudent.lastActive,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (e) {
      console.warn('Error saving imported student to Firestore:', email, e);
    }
  }

  if (imported.length > 0) {
    const updatedAll = [...imported, ...existing];
    saveStudents(updatedAll);
  }

  return {
    successCount: imported.length,
    errors,
    imported
  };
}

// -------------------------------------------------------------
// Similarity & Integrity Flagging
// -------------------------------------------------------------

function cleanCodeForComparison(code: string): string {
  let cleaned = code.replace(/\/\/.*$/gm, '');
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  return cleaned;
}

function calculateDiceSimilarity(a: string, b: string): number {
  if (a === b) return 100;
  if (!a || !b) return 0;
  const getBigrams = (str: string) => {
    const s = str.replace(/\s+/g, ' ').trim();
    const bigrams = new Map<string, number>();
    for (let i = 0; i < s.length - 1; i++) {
      const bg = s.substring(i, i + 2);
      bigrams.set(bg, (bigrams.get(bg) || 0) + 1);
    }
    return bigrams;
  };
  const bgA = getBigrams(a);
  const bgB = getBigrams(b);
  let intersection = 0;
  let totalA = 0;
  for (const [bg, count] of bgA) {
    totalA += count;
    if (bgB.has(bg)) {
      intersection += Math.min(count, bgB.get(bg)!);
    }
  }
  let totalB = 0;
  for (const count of bgB.values()) {
    totalB += count;
  }
  if (totalA + totalB === 0) return 0;
  return Math.round((2 * intersection / (totalA + totalB)) * 100);
}

export function computeCodeSimilarity(
  allProblems: Problem[],
  students: StudentProfile[],
  threshold = 75
): CodeSimilarityPair[] {
  const problemMap = new Map<string, Problem>();
  allProblems.forEach(p => problemMap.set(p.id, p));

  interface SubEntry {
    student: StudentProfile;
    code: string;
    submittedAt?: string;
  }
  const problemSubmissions = new Map<string, SubEntry[]>();

  students.forEach(student => {
    if (student.submissions) {
      Object.entries(student.submissions).forEach(([pid, sub]) => {
        if (sub && sub.code) {
          const list = problemSubmissions.get(pid) || [];
          list.push({
            student,
            code: sub.code,
            submittedAt: sub.passedAt
          });
          problemSubmissions.set(pid, list);
        }
      });
    }
  });

  const flaggedPairs: CodeSimilarityPair[] = [];

  for (const [pid, subs] of problemSubmissions.entries()) {
    if (subs.length < 2) continue;
    const problem = problemMap.get(pid);
    if (!problem) continue;

    for (let i = 0; i < subs.length; i++) {
      for (let j = i + 1; j < subs.length; j++) {
        const sub1 = subs[i];
        const sub2 = subs[j];
        if (sub1.student.uid === sub2.student.uid) continue;

        const clean1 = cleanCodeForComparison(sub1.code);
        const clean2 = cleanCodeForComparison(sub2.code);

        if (clean1.length < 30 || clean2.length < 30) continue;

        const score = calculateDiceSimilarity(clean1, clean2);
        if (score >= threshold) {
          flaggedPairs.push({
            problemId: pid,
            problemTitle: problem.title,
            problemLevel: problem.level,
            studentA: {
              uid: sub1.student.uid,
              name: sub1.student.displayName,
              roll: sub1.student.rollNumber,
              email: sub1.student.email,
              submittedAt: sub1.submittedAt,
              code: sub1.code
            },
            studentB: {
              uid: sub2.student.uid,
              name: sub2.student.displayName,
              roll: sub2.student.rollNumber,
              email: sub2.student.email,
              submittedAt: sub2.submittedAt,
              code: sub2.code
            },
            similarityScore: score
          });
        }
      }
    }
  }

  return flaggedPairs.sort((a, b) => b.similarityScore - a.similarityScore);
}


// -------------------------------------------------------------
// Seed Sample Students (for evaluation & realistic testing)
// -------------------------------------------------------------

export function seedSampleStudents(): void {
  const allProblems = getEffectiveProblems();
  const pIds = allProblems.map(p => p.id);

  const sampleRoster: Array<{
    name: string;
    email: string;
    roll: string;
    dept: string;
    solvedRatio: number;
    attemptedRatio: number;
  }> = [
    {
      name: 'Aravind Krishnan',
      email: 'aravind.k@francisxavier.ac.in',
      roll: '21CS042',
      dept: 'Computer Science & Engineering',
      solvedRatio: 0.85,
      attemptedRatio: 0.12
    },
    {
      name: 'Priyanka Sundaram',
      email: 'priyanka.s@francisxavier.ac.in',
      roll: '21IT028',
      dept: 'Information Technology',
      solvedRatio: 0.72,
      attemptedRatio: 0.18
    },
    {
      name: 'Manoj Kumar V',
      email: 'manoj.kumar@francisxavier.ac.in',
      roll: '22AI015',
      dept: 'Artificial Intelligence & Data Science',
      solvedRatio: 0.65,
      attemptedRatio: 0.20
    },
    {
      name: 'Deepika Selvam',
      email: 'deepika.selvam@francisxavier.ac.in',
      roll: '21EC089',
      dept: 'Electronics & Communication Engineering',
      solvedRatio: 0.54,
      attemptedRatio: 0.22
    },
    {
      name: 'Saravanan Muthu',
      email: 'saravanan.m@francisxavier.ac.in',
      roll: '22CS104',
      dept: 'Computer Science & Engineering',
      solvedRatio: 0.48,
      attemptedRatio: 0.25
    },
    {
      name: 'Kavitha Rajendran',
      email: 'kavitha.r@francisxavier.ac.in',
      roll: '22EE034',
      dept: 'Electrical & Electronics Engineering',
      solvedRatio: 0.36,
      attemptedRatio: 0.30
    },
    {
      name: 'Vigneshwaran P',
      email: 'vignesh.p@francisxavier.ac.in',
      roll: '21ME052',
      dept: 'Mechanical Engineering',
      solvedRatio: 0.28,
      attemptedRatio: 0.35
    },
    {
      name: 'Sneha Murugan',
      email: 'sneha.m@francisxavier.ac.in',
      roll: '23AI048',
      dept: 'Artificial Intelligence & Data Science',
      solvedRatio: 0.20,
      attemptedRatio: 0.25
    },
    {
      name: 'Karthik Raja S',
      email: 'karthik.raja@francisxavier.ac.in',
      roll: '23CS112',
      dept: 'Computer Science & Engineering',
      solvedRatio: 0.15,
      attemptedRatio: 0.20
    },
    {
      name: 'Ananya Balamurugan',
      email: 'ananya.b@francisxavier.ac.in',
      roll: '23IT009',
      dept: 'Information Technology',
      solvedRatio: 0.08,
      attemptedRatio: 0.14
    }
  ];

  const existing = getStoredStudents();
  const existingUids = new Set(existing.map(s => s.uid));

  const newProfiles: StudentProfile[] = [...existing];

  sampleRoster.forEach((sample, idx) => {
    const uid = `sample_student_${sample.roll.toLowerCase()}`;
    if (existingUids.has(uid)) return;

    const solvedCount = Math.floor(pIds.length * sample.solvedRatio);
    const attemptedCount = Math.floor(pIds.length * sample.attemptedRatio);

    const solved = pIds.slice(0, solvedCount);
    const attempted = pIds.slice(solvedCount, solvedCount + attemptedCount);

    const submissions: Record<string, StudentSubmission> = {};
    solved.slice(0, 15).forEach((pid) => {
      submissions[pid] = {
        code: `#include <stdio.h>\n\n// Verified solution by ${sample.name} (${sample.roll})\nint main() {\n    // Implementation logic for ${pid}\n    int val;\n    if (scanf("%d", &val) == 1) {\n        printf("%d\\n", val);\n    }\n    return 0;\n}`,
        passedAt: new Date(Date.now() - (idx * 3600000 + 120000)).toISOString(),
        passedCount: 4,
        totalCount: 4
      };
    });

    newProfiles.push({
      uid,
      email: sample.email,
      displayName: sample.name,
      rollNumber: sample.roll,
      department: sample.dept,
      role: 'student',
      solvedProblems: solved,
      attemptedProblems: attempted,
      lastActive: new Date(Date.now() - idx * 1800000).toISOString(),
      joinedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      submissions
    });
  });

  saveStudents(newProfiles);
}

// -------------------------------------------------------------
// Leaderboard Calculation & Export
// -------------------------------------------------------------

export function computeLeaderboard(allProblems: Problem[], currentUid?: string): LeaderboardRow[] {
  const settings = getAdminSettings();
  
  // If frozen and snapshot exists, return snapshot
  if (settings.leaderboardFrozen) {
    try {
      const snap = localStorage.getItem(LEADERBOARD_SNAPSHOT_KEY);
      if (snap) {
        return JSON.parse(snap);
      }
    } catch {}
  }

  const students = getStoredStudents();
  const problemLevelMap = new Map<string, number>();
  allProblems.forEach(p => problemLevelMap.set(p.id, p.level));

  const excluded = new Set(settings.excludedLeaderboardUids || []);

  const rows: LeaderboardRow[] = students
    .filter(s => !excluded.has(s.uid) && s.role !== 'admin' && s.role !== 'primary_admin' && s.role !== 'staff' && s.role !== 'developer' && s.email?.toLowerCase().trim() !== 'asirselvin446@gmail.com')
    .map(s => {
      const solvedList = s.solvedProblems || [];
      let l1 = 0, l2 = 0, l3 = 0;
      solvedList.forEach(id => {
        const lvl = problemLevelMap.get(id) || 1;
        if (lvl === 1) l1++;
        else if (lvl === 2) l2++;
        else if (lvl === 3) l3++;
      });

      // Score formula: Level 1 = 10 pts, Level 2 = 20 pts, Level 3 = 30 pts
      const score = (l1 * 10) + (l2 * 20) + (l3 * 30);

      return {
        rank: 0,
        uid: s.uid,
        displayName: s.displayName,
        rollNumber: s.rollNumber,
        department: s.department,
        batch: s.batch,
        solvedCount: solvedList.length,
        attemptedCount: (s.attemptedProblems || []).length,
        score,
        level1Solved: l1,
        level2Solved: l2,
        level3Solved: l3,
        lastActive: s.lastActive,
        isCurrentUser: s.uid === currentUid
      };
    });

  // Sort by solvedCount desc, then score desc, then alphabetical
  rows.sort((a, b) => {
    if (b.solvedCount !== a.solvedCount) return b.solvedCount - a.solvedCount;
    if (b.score !== a.score) return b.score - a.score;
    return a.displayName.localeCompare(b.displayName);
  });

  // Assign ranks
  rows.forEach((row, i) => {
    row.rank = i + 1;
  });

  return rows;
}

export function freezeLeaderboard(rows: LeaderboardRow[]): void {
  localStorage.setItem(LEADERBOARD_SNAPSHOT_KEY, JSON.stringify(rows));
}

export function exportLeaderboardCSV(rows: LeaderboardRow[]): void {
  const headers = ['Rank', 'Roll Number', 'Student Name', 'Department', 'Solved Problems', 'Attempted', 'Level 1 Solved', 'Level 2 Solved', 'Level 3 Solved', 'Total Points', 'Last Active'];
  const csvLines = [headers.join(',')];

  rows.forEach(r => {
    const line = [
      r.rank,
      `"${r.rollNumber}"`,
      `"${r.displayName.replace(/"/g, '""')}"`,
      `"${r.department.replace(/"/g, '""')}"`,
      r.solvedCount,
      r.attemptedCount,
      r.level1Solved,
      r.level2Solved,
      r.level3Solved,
      r.score,
      `"${new Date(r.lastActive).toLocaleString()}"`
    ];
    csvLines.push(line.join(','));
  });

  const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `FXEC_CodeChallenge_Leaderboard_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
