import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Problem, TestCase, problems as defaultProblems } from '../data/problems';
import { AdminSettings, StudentProfile, ProblemOverride, LeaderboardRow, StudentSubmission, UserRole } from '../types/admin';

const SETTINGS_KEY = 'fxec_admin_settings';
const OVERRIDES_KEY = 'fxec_problem_overrides';
const CUSTOM_PROBLEMS_KEY = 'fxec_custom_problems';
const STUDENTS_KEY = 'fxec_admin_students';
const LEADERBOARD_SNAPSHOT_KEY = 'fxec_leaderboard_frozen_snapshot';

export const DEFAULT_MIN_PROBLEMS_TO_UNLOCK_LEVEL: Record<number, number> = (() => {
  const map: Record<number, number> = { 2: 5, 3: 15 };
  for (let lvl = 4; lvl <= 40; lvl++) {
    map[lvl] = 15 + (lvl - 3) * 10;
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

export function getAdminSettings(): AdminSettings {
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

export async function assignUserRole(email: string, role: UserRole): Promise<void> {
  const normalized = email.trim().toLowerCase();
  if (normalized === 'asirselvin446@gmail.com' && role !== 'developer') {
    throw new Error('Developer account role cannot be changed.');
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

export async function removeUserRole(email: string): Promise<void> {
  const normalized = email.trim().toLowerCase();
  if (normalized === 'asirselvin446@gmail.com') {
    throw new Error('Developer account role cannot be removed.');
  }

  const settings = getAdminSettings();
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
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  settingsListeners.forEach(listener => listener(newSettings));

  // Sync to Firestore
  try {
    const settingsDoc = doc(db, 'settings', 'global');
    await setDoc(settingsDoc, {
      ...newSettings,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore settings sync notice:', err);
  }
}

export function subscribeAdminSettings(listener: Listener<AdminSettings>): () => void {
  settingsListeners.add(listener);
  return () => { settingsListeners.delete(listener); };
}

// -------------------------------------------------------------
// Problem & Test Case Overrides
// -------------------------------------------------------------

export function getProblemOverrides(): Record<string, ProblemOverride> {
  try {
    const raw = localStorage.getItem(OVERRIDES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getCustomAddedProblems(): Problem[] {
  try {
    const raw = localStorage.getItem(CUSTOM_PROBLEMS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
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
}

export async function deleteCustomProblem(problemId: string): Promise<void> {
  const custom = getCustomAddedProblems().filter(p => p.id !== problemId);
  localStorage.setItem(CUSTOM_PROBLEMS_KEY, JSON.stringify(custom));

  const overrides = getProblemOverrides();
  delete overrides[problemId];
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));

  const updatedProblems = getEffectiveProblems();
  problemsListeners.forEach(listener => listener(updatedProblems));
}

export function subscribeProblems(listener: Listener<Problem[]>): () => void {
  problemsListeners.add(listener);
  return () => { problemsListeners.delete(listener); };
}

// -------------------------------------------------------------
// Student Profiles & Submissions Management
// -------------------------------------------------------------

export async function fetchStudentsFromFirestore(): Promise<StudentProfile[]> {
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
  } catch (err) {
    console.warn('Firestore override sync notice:', err);
  }
}

export async function resetStudentProgress(uid: string): Promise<void> {
  const students = getStoredStudents();
  const idx = students.findIndex(s => s.uid === uid);
  if (idx >= 0) {
    students[idx].solvedProblems = [];
    students[idx].attemptedProblems = [];
    students[idx].submissions = {};
    students[idx].lastActive = new Date().toISOString();
    saveStudents(students);
  }

  localStorage.removeItem(`solved_${uid}`);
  localStorage.removeItem(`attempted_${uid}`);

  try {
    const progressRef = doc(db, 'users', uid, 'progress', 'current');
    await setDoc(progressRef, {
      userId: uid,
      solvedProblems: [],
      attemptedProblems: [],
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Firestore reset progress notice:', err);
  }
}

export function updateStudentDetails(
  uid: string,
  details: { displayName: string; rollNumber: string; department: string; role?: UserRole }
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
  }
}

export function deleteStudent(uid: string): void {
  const students = getStoredStudents().filter(s => s.uid !== uid);
  saveStudents(students);
  localStorage.removeItem(`solved_${uid}`);
  localStorage.removeItem(`attempted_${uid}`);
  localStorage.removeItem(`code_${uid}`);
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
    .filter(s => !excluded.has(s.uid) && s.role !== 'admin' && s.role !== 'developer' && s.email?.toLowerCase().trim() !== 'asirselvin446@gmail.com')
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
