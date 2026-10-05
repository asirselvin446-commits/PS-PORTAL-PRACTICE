import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, writeBatch } from 'firebase/firestore';
import { CodeEditor, EditorMarker } from './components/CodeEditor';
import { Console } from './components/Console';
import { Problem } from './data/problems';
import { executeCode, executeCustomCode, TestResult, ExecutionResult } from './utils/executor';
import { generateReport } from './utils/report';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LeaderboardModal } from './components/LeaderboardModal';
import { 
  getAdminSettings, 
  subscribeAdminSettings, 
  getEffectiveProblems, 
  subscribeProblems, 
  registerOrUpdateStudent, 
  computeLeaderboard,
  getStoredAnnouncements,
  fetchAnnouncementsFromFirestore,
  dismissAnnouncement,
  getDismissedAnnouncements,
  getStudent
} from './utils/adminStore';
import { AdminSettings, Announcement } from './types/admin';
import { 
  auth,
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  COLLEGE_DOMAIN, 
  COLLEGE_NAME,
  PortalUser,
  isFrancisXavierEmail,
  isFacultyEmail,
  DEVELOPER_EMAIL,
  isDeveloperEmail,
  resolveUserRole,
  db
} from './firebase';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  FileDown, 
  LogOut, 
  ShieldAlert, 
  GraduationCap, 
  RotateCcw,
  ExternalLink,
  ChevronRight,
  User,
  Hash,
  Building2,
  Mail,
  Search,
  Check,
  ShieldCheck,
  Trophy,
  Lock,
  Unlock,
  Key,
  Flame,
  AlertTriangle,
  Info,
  Sparkles,
  UserX,
  Megaphone,
  X
} from 'lucide-react';

type ViewState = 'list' | 'solve' | 'admin';

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Artificial Intelligence & Data Science',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Master of Computer Applications',
  'Faculty / Department Staff'
];

const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export default function App() {
  // Authentication state
  const [currentUser, setCurrentUser] = useState<PortalUser | null>(null);
  const [unauthorizedEmail, setUnauthorizedEmail] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authErrorLink, setAuthErrorLink] = useState<{ url: string; label: string } | null>(null);

  // Admin and Platform State
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(getAdminSettings);
  const [allProblems, setAllProblems] = useState<Problem[]>(getEffectiveProblems);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);

  // App navigation and problem state
  const [view, setView] = useState<ViewState>('list');
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Editor and Execution State
  const [code, setCode] = useState('');
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [submitCooldown, setSubmitCooldown] = useState(false); // brief gap between submissions to protect the shared Judge0 instance
  const [isCustomRun, setIsCustomRun] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [customOutput, setCustomOutput] = useState<ExecutionResult | null>(null);
  const compilerStandard = 'c99';
  const [editorMarkers, setEditorMarkers] = useState<EditorMarker[]>([]);
  const [mobileTab, setMobileTab] = useState<'desc' | 'code' | 'console'>('code');
  
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());
  const [attemptedProblems, setAttemptedProblems] = useState<Set<string>>(new Set());
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportNotification, setReportNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Broadcast announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => getStoredAnnouncements());
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState<string[]>(() => getDismissedAnnouncements());

  useEffect(() => {
    fetchAnnouncementsFromFirestore().then(anns => {
      setAnnouncements(anns);
    }).catch(() => {});
  }, []);

  const handleDismissAnnouncement = (id: string) => {
    dismissAnnouncement(id);
    setDismissedAnnouncements(prev => [...prev, id]);
  };

  // Subscribe to Admin settings and problems updates
  useEffect(() => {
    const unsubSettings = subscribeAdminSettings((newSettings) => {
      setAdminSettings(newSettings);
    });
    const unsubProblems = subscribeProblems((newProbs) => {
      setAllProblems(newProbs);
    });
    return () => {
      unsubSettings();
      unsubProblems();
    };
  }, []);

  // Helper to extract roll number / department hints from email
  const deriveDepartmentAndRoll = (email: string) => {
    const prefix = email.split('@')[0].toUpperCase();
    let roll = prefix;
    let dept = DEPARTMENTS[0];

    if (prefix.includes('CS') || prefix.includes('CSE')) dept = DEPARTMENTS[0];
    else if (prefix.includes('IT')) dept = DEPARTMENTS[1];
    else if (prefix.includes('AD') || prefix.includes('AI') || prefix.includes('DS')) dept = DEPARTMENTS[2];
    else if (prefix.includes('EC') || prefix.includes('ECE')) dept = DEPARTMENTS[3];
    else if (prefix.includes('EE') || prefix.includes('EEE')) dept = DEPARTMENTS[4];
    else if (prefix.includes('ME') || prefix.includes('MECH')) dept = DEPARTMENTS[5];
    else if (prefix.includes('CE') || prefix.includes('CIVIL')) dept = DEPARTMENTS[6];
    else if (prefix.includes('MCA')) dept = DEPARTMENTS[7];

    return { roll, dept };
  };

  // Listen to Firebase Auth state for ps-portal-practice
  useEffect(() => {
    // Complete a pending redirect sign-in (the popup-blocked fallback on
    // mobile) and surface any error it produced. No-op when there is none.
    getRedirectResult(auth).catch((err: any) => {
      if (!err) return;
      console.error('Redirect sign-in error:', err);
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setAuthError(err.message || 'Google Authentication failed. Please try again.');
      }
    });

    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const email = fbUser.email || '';
        if (isFrancisXavierEmail(email)) {
          setUnauthorizedEmail(null);
          setAuthError(null);
          setAuthErrorLink(null);

          const isDev = isDeveloperEmail(email);
          const currentAdminSettings = getAdminSettings();
          const assignedRole = resolveUserRole(email, currentAdminSettings.roleAssignments);

          let roll = '';
          let dept = '';
          if (isDev) {
            roll = 'DEVELOPER';
            dept = 'System Architecture & Engineering';
          } else if (assignedRole === 'primary_admin') {
            roll = 'PRIMARY ADMIN';
            dept = 'Principal Academic Administration';
          } else if (assignedRole === 'admin') {
            roll = 'ADMIN';
            dept = 'Academic Administration & Controls';
          } else if (assignedRole === 'staff') {
            roll = 'STAFF';
            dept = 'Faculty / Department Staff';
          } else {
            const derived = deriveDepartmentAndRoll(email);
            roll = derived.roll;
            dept = derived.dept;
          }

          const portalUser: PortalUser = {
            uid: fbUser.uid,
            email,
            displayName: isDev ? (fbUser.displayName || 'Developer') : (fbUser.displayName || email.split('@')[0]),
            rollNumber: roll,
            department: dept,
            role: assignedRole,
            photoURL: fbUser.photoURL || undefined,
            signedInAt: new Date().toISOString()
          };

          setCurrentUser(portalUser);
          if (portalUser.role === 'developer' || portalUser.role === 'primary_admin' || portalUser.role === 'admin' || portalUser.role === 'staff') {
            setIsAdminAuthenticated(true);
          } else {
            setIsAdminAuthenticated(false);
          }
          localStorage.setItem('fxec_session_user', JSON.stringify(portalUser));

          // 1. Sync User Profile to Firestore (ps-portal-practice database)
          try {
            const userDocRef = doc(db, 'users', fbUser.uid);
            const userSnap = await getDoc(userDocRef);
            if (!userSnap.exists()) {
              await setDoc(userDocRef, {
                uid: fbUser.uid,
                email,
                displayName: portalUser.displayName,
                rollNumber: portalUser.rollNumber,
                department: portalUser.department,
                role: portalUser.role,
                photoURL: fbUser.photoURL || '',
                college: isDev ? 'System Architecture' : COLLEGE_NAME,
                createdAt: new Date().toISOString(),
                lastLoginAt: new Date().toISOString(),
                solvedProblems: [],
                attemptedProblems: []
              });
            } else {
              const existingData = userSnap.data();
              // Preserve assigned role if set by developer
              const finalRole = isDev ? 'developer' : (portalUser.role !== 'student' ? portalUser.role : (existingData.role || 'student'));
              portalUser.batch = existingData.batch || portalUser.batch;
              portalUser.isSuspended = Boolean(existingData.isSuspended);
              portalUser.unlockedLevels = existingData.unlockedLevels || [];
              portalUser.role = finalRole;
              setCurrentUser({ ...portalUser });
              localStorage.setItem('fxec_session_user', JSON.stringify(portalUser));
              await updateDoc(userDocRef, {
                displayName: portalUser.displayName,
                photoURL: fbUser.photoURL || '',
                rollNumber: portalUser.rollNumber,
                department: portalUser.department,
                role: finalRole,
                lastLoginAt: new Date().toISOString(),
              });
            }
          } catch (syncErr) {
            console.warn('Firestore user profile sync notice:', syncErr);
          }

          // Check local student cache fallback
          const localStudent = getStudent(fbUser.uid);
          if (localStudent) {
            if (localStudent.isSuspended !== undefined) portalUser.isSuspended = localStudent.isSuspended;
            if (localStudent.unlockedLevels && localStudent.unlockedLevels.length > 0) {
              portalUser.unlockedLevels = localStudent.unlockedLevels;
            }
            if (localStudent.batch) portalUser.batch = localStudent.batch;
            setCurrentUser({ ...portalUser });
            localStorage.setItem('fxec_session_user', JSON.stringify(portalUser));
          }

          // 2. Load Progress from Firestore & localStorage
          try {
            const progressRef = doc(db, 'users', fbUser.uid, 'progress', 'current');
            const progressSnap = await getDoc(progressRef);
            if (progressSnap.exists()) {
              const pData = progressSnap.data();
              if (Array.isArray(pData.solvedProblems)) {
                setSolvedProblems(new Set<string>(pData.solvedProblems));
                localStorage.setItem(`solved_${fbUser.uid}`, JSON.stringify(pData.solvedProblems));
              }
              if (Array.isArray(pData.attemptedProblems)) {
                setAttemptedProblems(new Set<string>(pData.attemptedProblems));
                localStorage.setItem(`attempted_${fbUser.uid}`, JSON.stringify(pData.attemptedProblems));
              }
            } else {
              const savedSolved = localStorage.getItem(`solved_${fbUser.uid}`);
              const savedAttempted = localStorage.getItem(`attempted_${fbUser.uid}`);
              if (savedSolved) {
                try { setSolvedProblems(new Set<string>(JSON.parse(savedSolved))); } catch {}
              }
              if (savedAttempted) {
                try { setAttemptedProblems(new Set<string>(JSON.parse(savedAttempted))); } catch {}
              }
            }
          } catch (progressErr) {
            console.warn('Progress load notice:', progressErr);
          }

          // Register in Admin Directory (only students and assigned faculty, never developer)
          if (!isDev) {
            await registerOrUpdateStudent({
              uid: portalUser.uid,
              email: portalUser.email,
              displayName: portalUser.displayName,
              rollNumber: portalUser.rollNumber,
              department: portalUser.department,
              role: portalUser.role,
              photoURL: portalUser.photoURL
            });
          }

        } else {
          setUnauthorizedEmail(email);
          setCurrentUser(null);
        }
      } else {
        // Fallback to local session if present
        try {
          const stored = localStorage.getItem('fxec_session_user');
          if (stored) {
            const parsed: PortalUser = JSON.parse(stored);
            if (parsed && isFrancisXavierEmail(parsed.email)) {
              const localStudent = getStudent(parsed.uid);
              if (localStudent) {
                if (localStudent.isSuspended !== undefined) parsed.isSuspended = localStudent.isSuspended;
                if (localStudent.unlockedLevels && localStudent.unlockedLevels.length > 0) parsed.unlockedLevels = localStudent.unlockedLevels;
                if (localStudent.batch) parsed.batch = localStudent.batch;
              }
              // Never trust the role stored in localStorage — re-derive it from
              // the email + role assignments so a hand-edited session can't
              // escalate to an admin role.
              const restoredRole = resolveUserRole(parsed.email, getAdminSettings().roleAssignments);
              parsed.role = restoredRole;
              setCurrentUser(parsed);
              if (restoredRole === 'developer' || restoredRole === 'primary_admin' || restoredRole === 'admin' || restoredRole === 'staff') {
                setIsAdminAuthenticated(true);
              }
              const savedSolved = localStorage.getItem(`solved_${parsed.uid}`);
              const savedAttempted = localStorage.getItem(`attempted_${parsed.uid}`);
              if (savedSolved) {
                try { setSolvedProblems(new Set<string>(JSON.parse(savedSolved))); } catch {}
              }
              if (savedAttempted) {
                try { setAttemptedProblems(new Set<string>(JSON.parse(savedAttempted))); } catch {}
              }
            }
          }
        } catch (e) {
          console.warn('Local session restore error:', e);
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const persistProgress = async (
    newSolved: Set<string>,
    newAttempted: Set<string>,
    submittedProblemId?: string,
    submittedCode?: string,
    testCounts?: { passed: number; total: number }
  ) => {
    if (!currentUser) return;
    const uid = currentUser.uid;
    const solvedArr = Array.from(newSolved);
    const attemptedArr = Array.from(newAttempted);

    localStorage.setItem(`solved_${uid}`, JSON.stringify(solvedArr));
    localStorage.setItem(`attempted_${uid}`, JSON.stringify(attemptedArr));

    const submissions: Record<string, any> = {};
    if (submittedProblemId && submittedCode) {
      localStorage.setItem(`passed_code_${uid}_${submittedProblemId}`, submittedCode);
      submissions[submittedProblemId] = {
        code: submittedCode,
        passedCount: testCounts?.passed ?? 0,
        totalCount: testCounts?.total ?? 0,
        passedAt: new Date().toISOString()
      };
    }

    // Register update in admin directory (only if not developer)
    if (currentUser.role !== 'developer') {
      await registerOrUpdateStudent({
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        rollNumber: currentUser.rollNumber,
        department: currentUser.department,
        role: currentUser.role,
        solvedProblems: solvedArr,
        attemptedProblems: attemptedArr,
        submissions
      });
    }

    try {
      // Single batch so the progress subdoc and the roster doc stay in sync.
      const batch = writeBatch(db);
      const progressRef = doc(db, 'users', uid, 'progress', 'current');
      batch.set(progressRef, {
        userId: uid,
        solvedProblems: solvedArr,
        attemptedProblems: attemptedArr,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      if (submittedProblemId && submittedCode) {
        const userRef = doc(db, 'users', uid);
        batch.set(userRef, {
          [`submissions.${submittedProblemId}`]: {
            code: submittedCode,
            passedAt: new Date().toISOString(),
            passedCount: testCounts?.passed ?? 0,
            totalCount: testCounts?.total ?? 0
          }
        }, { merge: true });
      }
      await batch.commit();
    } catch (err) {
      console.warn('Firestore progress sync warning:', err);
    }
  };

  // Google sign-in: popup first (best UX on desktop), falling back to a
  // full-page redirect when the browser blocks popups (mobile Edge, in-app
  // browsers). Returns null when a redirect is in flight (page navigates away).
  const signInWithGoogle = async () => {
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      if (err?.code === 'auth/popup-blocked') {
        await signInWithRedirect(auth, googleProvider);
        return null;
      }
      throw err;
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    setAuthErrorLink(null);

    try {
      const result = await signInWithGoogle();
      if (!result) return; // redirect flow — page is navigating to Google
      const email = result.user.email || '';
      
      if (!isFrancisXavierEmail(email)) {
        setUnauthorizedEmail(email);
        setAuthError(`Access Restricted: "${email}" is not an authorized Francis Xavier Engineering College email. Please sign in with your official @francisxavier.ac.in account.`);
      } else {
        setUnauthorizedEmail(null);
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/unauthorized-domain') {
        const currentHost = window.location.hostname;
        setAuthError(`Domain authorization required: "${currentHost}" is not registered in Firebase Authorized Domains for project "ps-portal-practice".`);
        setAuthErrorLink({
          url: 'https://console.firebase.google.com/u/0/project/ps-portal-practice/authentication/settings',
          label: 'Open Firebase Settings to add Authorized Domain'
        });
      } else if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setAuthError(err.message || 'Google Authentication failed. Please try again.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSwitchAccount = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    setAuthErrorLink(null);

    try {
      await signOut(auth);
      localStorage.removeItem('fxec_session_user');
      const result = await signInWithGoogle();
      if (!result) return; // redirect flow — page is navigating to Google
      const email = result.user.email || '';

      if (!isFrancisXavierEmail(email)) {
        setUnauthorizedEmail(email);
        setAuthError(`Access Restricted: "${email}" is not authorized. Please choose your @francisxavier.ac.in account.`);
      } else {
        setUnauthorizedEmail(null);
      }
    } catch (err: any) {
      console.error('Switch account error:', err);
      if (err.code === 'auth/unauthorized-domain') {
        const currentHost = window.location.hostname;
        setAuthError(`Domain authorization required: "${currentHost}" is not in Authorized Domains for ps-portal-practice.`);
        setAuthErrorLink({
          url: 'https://console.firebase.google.com/u/0/project/ps-portal-practice/authentication/settings',
          label: 'Open Firebase Settings'
        });
      } else if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setAuthError(err.message || 'Authentication error.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleOpenAdminView = () => {
    if (currentUser?.role === 'developer' || currentUser?.role === 'primary_admin' || currentUser?.role === 'admin' || currentUser?.role === 'staff') {
      setView('admin');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Sign-out notice:', err);
    }
    localStorage.removeItem('fxec_session_user');
    setCurrentUser(null);
    setIsAdminAuthenticated(false);
    setUnauthorizedEmail(null);
    setAuthError(null);
    setAuthErrorLink(null);
    setSolvedProblems(new Set());
    setAttemptedProblems(new Set());
    setView('list');
    setActiveProblem(null);
  };

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode === undefined) return;
    setCode(newCode);

    if (activeProblem && currentUser) {
      const uid = currentUser.uid;
      const passedCode = localStorage.getItem(`passed_code_${uid}_${activeProblem.id}`);
      if (passedCode !== null) {
        if (newCode.trim() !== passedCode.trim()) {
          if (solvedProblems.has(activeProblem.id)) {
            const newSolved = new Set<string>(solvedProblems);
            newSolved.delete(activeProblem.id);
            setSolvedProblems(newSolved);

            const newAttempted = new Set<string>(attemptedProblems);
            newAttempted.add(activeProblem.id);
            setAttemptedProblems(newAttempted);
            persistProgress(newSolved, newAttempted);
            setReportNotification({
              message: 'Code edited — problem no longer counts as solved. Run and submit again.',
              type: 'error'
            });
            setTimeout(() => setReportNotification(null), 5000);
          }
        } else {
          if (!solvedProblems.has(activeProblem.id)) {
            const newSolved = new Set<string>(solvedProblems);
            newSolved.add(activeProblem.id);
            setSolvedProblems(newSolved);
            persistProgress(newSolved, attemptedProblems);
          }
        }
      }
    }
  };

  const handleSelectProblem = (problem: Problem) => {
    setActiveProblem(problem);
    const uid = currentUser?.uid || 'guest';
    const savedCode = localStorage.getItem(`code_${uid}_${problem.id}`);
    
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(problem.starterCode);
    }
    
    setResults(null);
    setError(null);
    setCustomOutput(null);
    setCustomInput('');
    setMobileTab('desc');
    setView('solve');
  };

  const handleBack = () => {
    if (activeProblem && currentUser) {
      localStorage.setItem(`code_${currentUser.uid}_${activeProblem.id}`, code);
    }
    setView('list');
    setActiveProblem(null);
    setResults(null);
    setError(null);
    setCustomOutput(null);
  };

  const handleRunCustom = async () => {
    if (!activeProblem) return;
    setIsRunning(true);
    setIsCustomRun(true);
    setError(null);
    setCustomOutput(null);
    setEditorMarkers([]);

    if (window.innerWidth < 768) {
      setMobileTab('console');
    }

    try {
      const result = await executeCustomCode(code, customInput, { standard: compilerStandard });
      setCustomOutput(result);
      if (result.error) {
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message || 'Execution failed');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!activeProblem || !currentUser) return;
    if (submitCooldown) {
      setReportNotification({ message: 'Please wait a few seconds before submitting again.', type: 'error' });
      setTimeout(() => setReportNotification(null), 3000);
      return;
    }
    setIsRunning(true);
    setIsCustomRun(false);
    setError(null);
    setResults(null);
    setEditorMarkers([]);

    if (window.innerWidth < 768) {
      setMobileTab('console');
    }

    localStorage.setItem(`code_${currentUser.uid}_${activeProblem.id}`, code);

    try {
      const res = await executeCode(code, activeProblem.functionName, activeProblem.testCases, { standard: compilerStandard });
      if (res.results) {
        setResults(res.results);
        
        // Guard against an empty result set — [].every() is vacuously true.
        const allPassed = res.results.length > 0 && res.results.every(r => r.passed);
        const passedCount = res.results.filter(r => r.passed).length;
        
        localStorage.setItem(`passed_count_${currentUser.uid}_${activeProblem.id}`, passedCount.toString());

        if (allPassed) {
          const newSolved = new Set<string>(solvedProblems);
          newSolved.add(activeProblem.id);
          setSolvedProblems(newSolved);
          
          localStorage.setItem(`passed_code_${currentUser.uid}_${activeProblem.id}`, code);
          persistProgress(newSolved, attemptedProblems, activeProblem.id, code, { passed: passedCount, total: res.results.length });
        } else {
          const newAttempted = new Set<string>(attemptedProblems);
          newAttempted.add(activeProblem.id);
          setAttemptedProblems(newAttempted);
          persistProgress(solvedProblems, newAttempted);
        }
      } else if (res.error) {
        setError(res.error);
        const newAttempted = new Set<string>(attemptedProblems);
        newAttempted.add(activeProblem.id);
        setAttemptedProblems(newAttempted);
        persistProgress(solvedProblems, newAttempted);
      }
    } catch (err: any) {
      setError(err.message || 'Execution error');
      const newAttempted = new Set<string>(attemptedProblems);
      newAttempted.add(activeProblem.id);
      setAttemptedProblems(newAttempted);
      persistProgress(solvedProblems, newAttempted);
    } finally {
      setIsRunning(false);
      // 5s cooldown before the next submit to avoid hammering the shared Judge0 instance
      setSubmitCooldown(true);
      setTimeout(() => setSubmitCooldown(false), 5000);
    }
  };

  const handleGenerateReport = async () => {
    if (!currentUser || isGeneratingReport) return;
    setIsGeneratingReport(true);

    try {
      const res = await generateReport({
        userId: currentUser.uid,
        userName: currentUser.displayName,
        problems: allProblems,
        solvedProblemIds: solvedProblems,
        attemptedProblemIds: attemptedProblems,
        userEmail: currentUser.email,
        rollNumber: currentUser.rollNumber,
        department: currentUser.department
      });

      setReportNotification({
        message: `Report downloaded: ${res.fileName}`,
        type: 'success'
      });
      setTimeout(() => setReportNotification(null), 5000);
    } catch (err: any) {
      console.error('Report error:', err);
      setReportNotification({
        message: err.message || 'Failed to generate report. Please try again.',
        type: 'error'
      });
      setTimeout(() => setReportNotification(null), 5000);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Case 1: Initial Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0d0e12] flex flex-col items-center justify-center p-6 text-neutral-300">
        <div className="w-8 h-8 rounded-full border-2 border-neutral-700 border-t-neutral-200 animate-spin mb-3" />
        <p className="text-xs text-neutral-400 font-medium">Verifying portal access...</p>
      </div>
    );
  }

  // Case 2: Unauthorized domain account signed in
  if (unauthorizedEmail) {
    return (
      <div className="min-h-screen bg-[#0d0e12] flex items-center justify-center p-4 text-neutral-200">
        <div className="bg-[#14151a] border border-neutral-800 p-8 rounded-xl w-full max-w-md text-left">
          <div className="flex items-center gap-2.5 text-rose-400 mb-3 text-xs font-semibold uppercase tracking-wider">
            <ShieldAlert size={16} />
            <span>Institutional Access Restricted</span>
          </div>

          <h1 className="text-lg font-semibold text-white tracking-tight mb-2">
            FXEC Account Required
          </h1>

          <p className="text-neutral-400 text-xs leading-relaxed mb-5">
            This platform is exclusively accessible to students and faculty with an official Francis Xavier Engineering College email.
          </p>

          <div className="bg-[#0b0c10] border border-neutral-800/80 rounded-lg p-3 mb-5 text-xs">
            <div className="text-neutral-500 text-[11px] mb-1">Signed in as:</div>
            <div className="font-mono text-neutral-300 break-all">{unauthorizedEmail}</div>
            <div className="mt-2 pt-2 border-t border-neutral-800/60 text-[11px] text-neutral-400">
              Required: <span className="text-neutral-200 font-mono">{COLLEGE_DOMAIN}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={handleSwitchAccount}
              disabled={isSigningIn}
              className="w-full flex items-center justify-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-medium py-2.5 px-4 rounded-lg text-xs transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Switch to @francisxavier.ac.in Account</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 border border-neutral-700/80 hover:bg-neutral-800 text-neutral-400 font-medium py-2 px-4 rounded-lg text-xs transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Case 2b: Account Suspended -> Clear notification screen
  if (currentUser && currentUser.isSuspended && currentUser.role !== 'developer') {
    return (
      <div className="min-h-screen bg-[#0c0d10] flex items-center justify-center p-4 text-neutral-100 font-sans">
        <div className="w-full max-w-md bg-[#131418] border border-rose-900/60 rounded-2xl p-6 sm:p-8 shadow-2xl text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose-950/70 border border-rose-800/60 text-rose-400 mb-4">
            <UserX size={24} />
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-800/80 text-rose-300 text-[11px] font-semibold tracking-wide mb-3">
            <span>Account Temporarily Suspended</span>
          </div>

          <h1 className="text-lg font-semibold text-white tracking-tight mb-2">
            Access Restricted
          </h1>

          <p className="text-neutral-400 text-xs leading-relaxed mb-5">
            Your student account has been temporarily suspended by the department coordinator or administrator. Practice problems and submissions are temporarily locked.
          </p>

          <div className="bg-[#0b0c10] border border-neutral-800/80 rounded-lg p-3.5 mb-5 text-xs text-left space-y-1.5">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-neutral-500">Student:</span>
              <span className="font-semibold text-neutral-200">{currentUser.displayName}</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-neutral-500">Roll Number:</span>
              <span className="font-mono text-neutral-300 font-bold">{currentUser.rollNumber}</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-neutral-500">Email:</span>
              <span className="font-mono text-neutral-400">{currentUser.email}</span>
            </div>
            <div className="flex justify-between items-center text-[11px] pt-1.5 border-t border-neutral-800/60">
              <span className="text-neutral-500">Department:</span>
              <span className="text-neutral-300">{currentUser.department}</span>
            </div>
          </div>

          <p className="text-[11px] text-neutral-500 mb-5 leading-normal">
            Please contact your faculty advisor or department administration for assistance or reactivation.
          </p>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-neutral-100 hover:bg-white text-neutral-900 font-medium py-2.5 px-4 rounded-lg text-xs transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    );
  }

  // Case 3: Not Authenticated -> Clean Minimal Login
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#0c0d10] flex items-center justify-center p-4 text-neutral-100">
        <div className="w-full max-w-sm">
          <div className="bg-[#131418] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {/* Minimal Brand Identity */}
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-neutral-800/80 border border-neutral-700/60 text-neutral-200 mb-3.5">
                <GraduationCap size={22} />
              </div>

              <h1 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                {COLLEGE_NAME}
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                PS Portal · Code Challenge Practice
              </p>
            </div>

            {/* Quiet Domain Indicator */}
            <div className="py-2 px-3 rounded-lg bg-neutral-900 border border-neutral-800 text-center mb-6">
              <span className="text-xs text-neutral-400 font-mono">
                Domain restricted to <strong className="text-neutral-200">{COLLEGE_DOMAIN}</strong>
              </span>
            </div>

            {/* Error Banner */}
            {authError && (
              <div className="mb-5 p-3 rounded-lg bg-rose-950/30 border border-rose-900/50 text-xs text-rose-300 leading-relaxed text-left">
                <div>{authError}</div>
                {authErrorLink && (
                  <a
                    href={authErrorLink.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-neutral-200 underline mt-2 font-medium"
                  >
                    <span>{authErrorLink.label}</span>
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            )}

            {/* Primary Action: Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-neutral-100 disabled:opacity-60 text-neutral-900 font-medium py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
            >
              {isSigningIn ? (
                <div className="w-4 h-4 rounded-full border-2 border-neutral-400 border-t-neutral-900 animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              <span>{isSigningIn ? 'Connecting...' : 'Sign in with Google Account'}</span>
            </button>

            <div className="mt-4 pt-4 border-t border-neutral-800/80 text-center">
              <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                Official Google Authentication for FXEC students, faculty, and administrator accounts.
              </p>
            </div>

          </div>

          <p className="text-center text-[11px] text-neutral-400 mt-4 font-mono">
            Autonomous Institution · Tirunelveli · C99 Environment
          </p>
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW: ADMIN DASHBOARD
  // =========================================================================
  if (view === 'admin') {
    if (!currentUser || (currentUser.role !== 'developer' && currentUser.role !== 'primary_admin' && currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
      return null;
    }
    return (
      <AdminDashboard
        problems={allProblems}
        currentUser={currentUser}
        onExitAdmin={() => setView('list')}
        onRefreshProblems={() => setAllProblems(getEffectiveProblems())}
        onSignOut={handleLogout}
      />
    );
  }

  // =========================================================================
  // VIEW: PROBLEM LIST DASHBOARD (STUDENT VIEW)
  // =========================================================================
  const levels: number[] = Array.from(new Set<number>(allProblems.map(p => Number(p.level)))).sort((a: number, b: number) => a - b);

  // Check if selected level is locked by Admin or progressive unlock rule
  const isLevelLockedByAdmin = adminSettings.lockedLevels?.includes(selectedLevel);
  let isLevelLockedByProgress = false;
  let progressRequirementText = '';

  if (adminSettings.levelUnlockMode === 'progressive' && selectedLevel > 1) {
    const prevLevel = selectedLevel - 1;
    const defaultThreshold = selectedLevel === 2 ? 5 : (15 + (selectedLevel - 3) * 10);
    const required = adminSettings.minProblemsToUnlockLevel?.[selectedLevel] ?? defaultThreshold;
    const prevSolved = allProblems.filter(p => p.level === prevLevel && solvedProblems.has(p.id)).length;
    if (prevSolved < required) {
      isLevelLockedByProgress = true;
      progressRequirementText = `Solve at least ${required} problems in Level ${prevLevel} to unlock (Current: ${prevSolved}/${required})`;
    }
  }

  const isManuallyUnlocked = Boolean(currentUser?.unlockedLevels?.includes(selectedLevel));
  const isLevelLocked = !isManuallyUnlocked && (isLevelLockedByAdmin || isLevelLockedByProgress);
  
  const displayedProblems = allProblems.filter(p => {
    const matchesLevel = p.level === selectedLevel;
    const matchesDiff = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
    const matchesSearch = !searchQuery.trim() || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesDiff && matchesSearch;
  });

  const levelTotalProblems = allProblems.filter(p => p.level === selectedLevel);
  const levelSolvedCount = levelTotalProblems.filter(p => solvedProblems.has(p.id)).length;
  const levelPercent = levelTotalProblems.length > 0 ? Math.round((levelSolvedCount / levelTotalProblems.length) * 100) : 0;
  const displayName = currentUser.displayName;

  // Active targeted or campus-wide announcements
  const activeAnnouncements = announcements.filter(ann => {
    if (!ann.active) return false;
    if (dismissedAnnouncements.includes(ann.id)) return false;
    if (!ann.targetUids || ann.targetUids.length === 0 || ann.targetUids.includes('all')) {
      return true;
    }
    return currentUser ? ann.targetUids.includes(currentUser.uid) : false;
  });

  if (view === 'list') {
    return (
      <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col font-sans">
        
        {/* Dynamic Broadcast Announcements */}
        {activeAnnouncements.map(ann => (
          <div 
            key={ann.id} 
            className="bg-neutral-900 text-neutral-100 text-xs py-2 px-4 border-b border-neutral-800 flex items-center justify-between gap-3 shadow-xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Megaphone size={14} className="text-amber-400 shrink-0" />
              <span className="font-semibold text-white shrink-0">{ann.title}:</span>
              <span className="text-neutral-200 truncate">{ann.message}</span>
            </div>
            <button
              onClick={() => handleDismissAnnouncement(ann.id)}
              className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Dismiss announcement"
            >
              <X size={13} />
            </button>
          </div>
        ))}

        {/* Top Announcement Banner if set by Faculty in settings */}
        {adminSettings.announcement && activeAnnouncements.length === 0 && (
          <div className="bg-neutral-900 text-neutral-200 text-xs py-2 px-4 border-b border-neutral-800 flex items-center justify-center gap-2">
            <Info size={13} className="text-indigo-400 shrink-0" />
            <span className="font-medium">{adminSettings.announcement}</span>
          </div>
        )}

        {/* Top Bar Contract (1 row, 3 zones) */}
        <header className="h-14 bg-white border-b border-neutral-200/90 px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
          
          {/* Zone 1: Brand title */}
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-neutral-900 whitespace-nowrap">
              FXEC Code Challenge
            </span>
            <span className="hidden sm:inline text-neutral-400 text-xs">·</span>
            <span className="hidden sm:inline text-xs text-neutral-500 font-normal truncate max-w-[200px]">
              PS Portal Practice
            </span>
          </div>

          {/* Zone 2: Level Segmented Controls */}
          <div className="hidden md:flex items-center bg-neutral-100 p-0.5 rounded-lg border border-neutral-200/80">
            {levels.map(level => {
              const isUnlockedForUser = Boolean(currentUser?.unlockedLevels?.includes(level));
              const locked = !isUnlockedForUser && adminSettings.lockedLevels?.includes(level);
              return (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedLevel === level
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {locked && <Lock size={11} className="text-neutral-400" />}
                  <span>Level {level}</span>
                </button>
              );
            })}
          </div>

          {/* Zone 3: Actions & User Info */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Student Leaderboard Button */}
            {adminSettings.leaderboardVisibleToStudents && (
              <button
                onClick={() => setShowLeaderboardModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors cursor-pointer"
                title="View College Leaderboard"
              >
                <Trophy size={13} className="text-amber-600" />
                <span className="hidden sm:inline">Leaderboard</span>
              </button>
            )}

            {/* Developer / Primary Admin / Admin / Staff Switch - Only visible to privileged roles (Hidden from students) */}
            {(currentUser.role === 'developer' || currentUser.role === 'primary_admin' || currentUser.role === 'admin' || currentUser.role === 'staff') && (
              <button
                onClick={handleOpenAdminView}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                  currentUser.role === 'developer'
                    ? 'bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800'
                    : currentUser.role === 'primary_admin'
                    ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                    : currentUser.role === 'admin'
                    ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                }`}
                title={
                  currentUser.role === 'developer'
                    ? 'Master Developer Console'
                    : currentUser.role === 'primary_admin'
                    ? 'Primary Administrator Portal'
                    : currentUser.role === 'admin'
                    ? 'Administrator Portal'
                    : 'Staff Portal'
                }
              >
                {currentUser.role === 'developer' ? (
                  <Sparkles size={13} className="text-amber-400" />
                ) : (
                  <ShieldCheck size={14} className={currentUser.role === 'primary_admin' ? 'text-purple-600' : ''} />
                )}
                <span className="hidden sm:inline">
                  {currentUser.role === 'developer'
                    ? 'Developer Console'
                    : currentUser.role === 'primary_admin'
                    ? 'Primary Admin'
                    : currentUser.role === 'admin'
                    ? 'Admin Portal'
                    : 'Staff Portal'}
                </span>
              </button>
            )}

            <div className="text-right hidden sm:block">
              <div className="text-xs font-medium text-neutral-900 leading-tight">
                {displayName}
              </div>
              <div className="text-[11px] text-neutral-500 font-mono">
                {currentUser.rollNumber ? `${currentUser.rollNumber} · ` : ''}{currentUser.department.split('&')[0].trim()}
              </div>
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={isGeneratingReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 disabled:opacity-60 rounded-lg transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
              title="Download official PDF report"
            >
              {isGeneratingReport ? (
                <div className="w-3.5 h-3.5 rounded-full border-2 border-neutral-400 border-t-neutral-800 animate-spin" />
              ) : (
                <FileDown size={14} className="text-neutral-500" />
              )}
              <span className="hidden sm:inline">{isGeneratingReport ? 'Generating...' : 'Report'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          
          {/* Mobile Level Tabs */}
          <div className="flex md:hidden items-center justify-between bg-neutral-100 p-0.5 rounded-lg border border-neutral-200 mb-5">
            {levels.map(level => {
              const isUnlockedForUser = Boolean(currentUser?.unlockedLevels?.includes(level));
              const locked = !isUnlockedForUser && adminSettings.lockedLevels?.includes(level);
              return (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors text-center cursor-pointer flex items-center justify-center gap-1 ${
                    selectedLevel === level
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600'
                  }`}
                >
                  {locked && <Lock size={10} className="text-neutral-400" />}
                  <span>Level {level}</span>
                </button>
              );
            })}
          </div>

          {/* Level Progress Banner */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-neutral-200/80">
            <div>
              <div className="text-xs text-neutral-500 font-medium">
                Level {selectedLevel} Problem Set
              </div>
              <h2 className="text-lg font-semibold text-neutral-900 tracking-tight">
                {selectedLevel === 1 
                  ? 'Conditional Statements' 
                  : selectedLevel === 2 
                  ? 'Loops & Patterns' 
                  : 'Arrays'}
              </h2>
            </div>

            <div className="sm:text-right">
              <div className="text-xs text-neutral-500 font-mono">
                <span className="text-neutral-900 font-semibold">{levelSolvedCount}</span> of {levelTotalProblems.length} completed ({levelPercent}%)
              </div>
              <div className="w-36 h-1.5 bg-neutral-200 rounded-full overflow-hidden mt-1.5 sm:ml-auto">
                <div 
                  className="h-full bg-neutral-900 transition-all duration-300 rounded-full"
                  style={{ width: `${levelPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* CHECK IF LEVEL IS LOCKED */}
          {isLevelLocked ? (
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center max-w-lg mx-auto shadow-sm my-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto">
                <Lock size={20} />
              </div>
              <h3 className="text-base font-semibold text-neutral-900">
                Level {selectedLevel} is Currently Locked
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-md mx-auto">
                {isLevelLockedByAdmin 
                  ? 'This level is locked by the faculty administrator for this assessment session.'
                  : progressRequirementText}
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setSelectedLevel(1)}
                  className="px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  Return to Level 1
                </button>
                {(currentUser.role === 'developer' || currentUser.role === 'primary_admin' || currentUser.role === 'admin' || currentUser.role === 'staff') && (
                  <button
                    onClick={handleOpenAdminView}
                    className="px-3 py-2 border border-neutral-200 text-neutral-600 hover:text-neutral-900 rounded-lg text-xs font-medium cursor-pointer"
                  >
                    Manage in Admin
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Filter Bar & Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
                {/* Difficulty Filter */}
                <div className="inline-flex items-center gap-1 bg-neutral-100 p-0.5 rounded-lg border border-neutral-200/80 self-start">
                  {(['All', 'Easy', 'Medium', 'Hard'] as const).map(diff => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        difficultyFilter === diff
                          ? 'bg-white text-neutral-900 shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-60">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search challenges..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
                  />
                </div>
              </div>

              {/* Problem List (Zero-Pill Discipline, Clean Unboxed Rows) */}
              <div className="bg-white border border-neutral-200/90 rounded-xl divide-y divide-neutral-100 overflow-hidden shadow-2xs">
                {displayedProblems.map((problem) => {
                  const isSolved = solvedProblems.has(problem.id);
                  const isAttempted = attemptedProblems.has(problem.id) && !isSolved;

                  return (
                    <div
                      key={problem.id}
                      onClick={() => handleSelectProblem(problem)}
                      className="px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Status Indicator */}
                        <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                          {isSolved ? (
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                              <Check size={12} strokeWidth={2.5} />
                            </div>
                          ) : isAttempted ? (
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" title="Attempted" />
                          ) : (
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 group-hover:bg-neutral-300 transition-colors" />
                          )}
                        </div>

                        {/* Title and Unboxed Metadata */}
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-neutral-900 group-hover:text-blue-600 transition-colors truncate">
                            {problem.title}
                          </div>
                          
                          {/* Zero-Pill metadata with · typographic separators */}
                          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mt-0.5">
                            <span className={
                              problem.difficulty === 'Easy' ? 'text-emerald-600 font-medium' :
                              problem.difficulty === 'Medium' ? 'text-amber-600 font-medium' :
                              'text-rose-600 font-medium'
                            }>
                              {problem.difficulty}
                            </span>
                            <span>·</span>
                            <span>{problem.testCases.length} test cases</span>
                            <span>·</span>
                            <span>Level {problem.level}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action */}
                      <div className="flex items-center gap-1 text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0 ml-3">
                        <span className="text-xs font-medium hidden sm:inline">
                          {isSolved ? 'Review' : 'Solve'}
                        </span>
                        <ChevronRight size={15} />
                      </div>
                    </div>
                  );
                })}

                {displayedProblems.length === 0 && (
                  <div className="py-12 text-center text-xs text-neutral-400">
                    No challenges match the active filter or search query.
                  </div>
                )}
              </div>
            </>
          )}

          {/* Footer note */}
          <footer className="mt-8 pt-4 border-t border-neutral-200/60 text-center text-[11px] text-neutral-400">
            Francis Xavier Engineering College · Department Evaluation Portal · C99
          </footer>
        </main>

        {/* Report Download Status Notification */}
        {reportNotification && (
          <div className={`fixed bottom-5 right-5 z-50 text-xs px-4 py-2.5 rounded-lg shadow-lg border flex items-center gap-2 transition-all ${
            reportNotification.type === 'success'
              ? 'bg-neutral-900 text-neutral-100 border-neutral-800'
              : 'bg-rose-950 text-rose-200 border-rose-900'
          }`}>
            {reportNotification.type === 'success' ? (
              <Check size={14} className="text-emerald-400 shrink-0" />
            ) : (
              <ShieldAlert size={14} className="text-rose-400 shrink-0" />
            )}
            <span>{reportNotification.message}</span>
          </div>
        )}

        {/* Leaderboard Modal */}
        {showLeaderboardModal && (
          <LeaderboardModal
            rows={computeLeaderboard(allProblems, currentUser.uid)}
            settings={adminSettings}
            currentUserId={currentUser.uid}
            onClose={() => setShowLeaderboardModal(false)}
          />
        )}



      </div>
    );
  }

  // =========================================================================
  // VIEW: SOLVE WORKSPACE (CLEAN IDE)
  // =========================================================================
  const isCurrentSolved = activeProblem ? solvedProblems.has(activeProblem.id) : false;

  return (
    <div className="h-screen flex flex-col bg-[#0f1014] text-neutral-200 overflow-hidden font-sans">
      {/* Workspace Minimal Header */}
      <header className="h-12 bg-[#14151a] border-b border-neutral-800/80 px-3 sm:px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={handleBack}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors cursor-pointer shrink-0"
            title="Return to problem list"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="flex items-center gap-2 truncate text-xs sm:text-sm">
            <span className="font-medium text-white truncate">
              {activeProblem?.title}
            </span>
            <span className="text-neutral-500 hidden sm:inline">·</span>
            <span className="text-neutral-400 text-xs hidden sm:inline font-mono">
              Level {activeProblem?.level}
            </span>
            {isCurrentSolved && (
              <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-medium ml-1">
                <Check size={12} strokeWidth={2.5} />
                <span>Solved</span>
              </span>
            )}
          </div>
        </div>
        
        {/* Run & Submit Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRunCustom}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-neutral-200 text-xs font-medium rounded-md transition-colors cursor-pointer border border-neutral-700/60"
            title="Run with Custom Stdin (Ctrl+Enter)"
          >
            {isRunning && isCustomRun ? (
              <div className="w-3 h-3 rounded-full border-2 border-neutral-400 border-t-white animate-spin" />
            ) : (
              <Play size={12} fill="currentColor" />
            )}
            <span>{isRunning && isCustomRun ? 'Running...' : 'Run'}</span>
          </button>

          <button
            onClick={handleSubmitCode}
            disabled={isRunning || submitCooldown}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-medium rounded-md transition-colors cursor-pointer shadow-xs"
            title="Submit against all test cases (Ctrl+Shift+Enter)"
          >
            {isRunning && !isCustomRun ? (
              <div className="w-3 h-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            ) : (
              <CheckCircle2 size={13} />
            )}
            <span>{isRunning && !isCustomRun ? 'Submitting...' : 'Submit'}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Panels */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden bg-[#14151a] border-b border-neutral-800/80 shrink-0">
          {(['desc', 'code', 'console'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`flex-1 py-2 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                mobileTab === tab 
                  ? 'text-white border-b-2 border-neutral-200 bg-neutral-800/30' 
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {tab === 'desc' ? 'Problem' : tab === 'code' ? 'Code' : 'Console'}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Panel: Description */}
          <div className={`${mobileTab === 'desc' ? 'flex' : 'hidden'} md:flex flex-1 md:flex-none w-full md:w-5/12 md:max-w-md flex-col bg-[#111216] md:border-r border-neutral-800/80 shrink-0 overflow-hidden`}>
            <div className="px-4 py-2 bg-[#17181f] border-b border-neutral-800/80 text-neutral-400 text-xs font-medium shrink-0 flex items-center justify-between">
              <span>Problem Statement</span>
              <span className="font-mono text-[11px] text-neutral-500">{activeProblem?.difficulty}</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 custom-scrollbar text-neutral-300 text-xs sm:text-sm leading-relaxed">
              <div 
                className="prose prose-invert prose-xs max-w-none [&_pre]:bg-[#0c0d10] [&_pre]:border [&_pre]:border-neutral-800 [&_pre]:p-2.5 [&_pre]:rounded-lg [&_code]:font-mono [&_strong]:text-neutral-200" 
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(activeProblem?.description || '', { ALLOWED_TAGS: ['p', 'br', 'pre', 'code', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'table', 'thead', 'tbody', 'tr', 'td', 'th'] }) }} 
              />
            </div>
          </div>

          {/* Right Panel: Editor and Output Console */}
          <div className={`${(mobileTab === 'code' || mobileTab === 'console') ? 'flex' : 'hidden'} md:flex flex-1 flex-col min-w-0`}>
            <div className={`${mobileTab === 'code' ? 'flex' : 'hidden'} md:flex flex-[3] min-h-0 flex-col`}>
              <CodeEditor 
                value={code} 
                onChange={handleCodeChange} 
                language="c" 
                onRun={handleRunCustom} 
                onSubmit={handleSubmitCode} 
                markers={editorMarkers} 
                disableCopyPaste={adminSettings.disableCopyPaste}
              />
            </div>

            <div className={`${mobileTab === 'console' ? 'flex' : 'hidden'} md:flex flex-[2] min-h-0 flex-col`}>
              <Console 
                results={results} 
                error={error} 
                isRunning={isRunning} 
                isCustomRun={isCustomRun}
                customOutput={customOutput}
                customInput={customInput}
                setCustomInput={setCustomInput}
                hiddenTestVisibility={adminSettings.hiddenTestCasesVisibility}
              />
            </div>
          </div>
        </div>
        {/* Unsolve / status toast (reuses the report-notification style) */}
        {reportNotification && (
          <div className={`fixed bottom-5 right-5 z-50 text-xs px-4 py-2.5 rounded-lg shadow-lg border flex items-center gap-2 transition-all ${
            reportNotification.type === 'success'
              ? 'bg-neutral-900 text-neutral-100 border-neutral-800'
              : 'bg-rose-950 text-rose-200 border-rose-900'
          }`}>
            {reportNotification.type === 'success' ? (
              <Check size={14} className="text-emerald-400 shrink-0" />
            ) : (
              <ShieldAlert size={14} className="text-rose-400 shrink-0" />
            )}
            <span>{reportNotification.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
