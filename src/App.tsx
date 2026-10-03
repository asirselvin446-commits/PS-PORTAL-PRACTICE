import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { CodeEditor, EditorMarker } from './components/CodeEditor';
import { Console } from './components/Console';
import { problems, Problem } from './data/problems';
import { executeCode, executeCustomCode, TestResult, ExecutionResult } from './utils/executor';
import { generateReport } from './utils/report';
import { 
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  COLLEGE_DOMAIN, 
  COLLEGE_NAME,
  PortalUser,
  isFrancisXavierEmail,
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
  Check
} from 'lucide-react';

type ViewState = 'list' | 'solve';

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
  const [showManualForm, setShowManualForm] = useState(false);

  // Manual institutional form state
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginRollNumber, setLoginRollNumber] = useState('');
  const [loginDepartment, setLoginDepartment] = useState(DEPARTMENTS[0]);

  // App navigation and problem state
  const [view, setView] = useState<ViewState>('list');
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Editor and Execution State
  const [code, setCode] = useState('');
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
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
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const email = fbUser.email || '';
        if (isFrancisXavierEmail(email)) {
          setUnauthorizedEmail(null);
          setAuthError(null);
          setAuthErrorLink(null);

          const { roll, dept } = deriveDepartmentAndRoll(email);
          const portalUser: PortalUser = {
            uid: fbUser.uid,
            email,
            displayName: fbUser.displayName || email.split('@')[0],
            rollNumber: roll,
            department: dept,
            role: 'student',
            photoURL: fbUser.photoURL || undefined,
            signedInAt: new Date().toISOString()
          };

          setCurrentUser(portalUser);
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
                photoURL: fbUser.photoURL || '',
                college: COLLEGE_NAME,
                createdAt: new Date().toISOString(),
                lastLoginAt: new Date().toISOString(),
              });
            } else {
              await updateDoc(userDocRef, {
                displayName: portalUser.displayName,
                photoURL: fbUser.photoURL || '',
                lastLoginAt: new Date().toISOString(),
              });
            }
          } catch (syncErr) {
            console.warn('Firestore user profile sync notice:', syncErr);
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
              setCurrentUser(parsed);
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

  const persistProgress = async (newSolved: Set<string>, newAttempted: Set<string>) => {
    if (!currentUser) return;
    const uid = currentUser.uid;
    const solvedArr = Array.from(newSolved);
    const attemptedArr = Array.from(newAttempted);

    localStorage.setItem(`solved_${uid}`, JSON.stringify(solvedArr));
    localStorage.setItem(`attempted_${uid}`, JSON.stringify(attemptedArr));

    try {
      const progressRef = doc(db, 'users', uid, 'progress', 'current');
      await setDoc(progressRef, {
        userId: uid,
        solvedProblems: solvedArr,
        attemptedProblems: attemptedArr,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore progress sync warning:', err);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    setAuthErrorLink(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
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
      const result = await signInWithPopup(auth, googleProvider);
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

  const handleManualSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthErrorLink(null);

    let cleanEmail = loginEmail.trim().toLowerCase();
    if (cleanEmail && !cleanEmail.includes('@')) {
      cleanEmail = `${cleanEmail}${COLLEGE_DOMAIN}`;
    }

    if (!loginName.trim()) {
      setAuthError('Please enter your full name.');
      return;
    }
    if (!loginRollNumber.trim()) {
      setAuthError('Please enter your Roll / Register Number.');
      return;
    }
    if (!isFrancisXavierEmail(cleanEmail)) {
      setAuthError(`Access Restricted: Only emails ending in ${COLLEGE_DOMAIN} from Francis Xavier Engineering College are permitted.`);
      return;
    }

    const uid = `fxec_${cleanEmail.replace(/[^a-z0-9]/g, '_')}`;
    const newUser: PortalUser = {
      uid,
      email: cleanEmail,
      displayName: loginName.trim(),
      rollNumber: loginRollNumber.trim().toUpperCase(),
      department: loginDepartment,
      role: 'student',
      signedInAt: new Date().toISOString()
    };

    localStorage.setItem('fxec_session_user', JSON.stringify(newUser));
    setCurrentUser(newUser);

    const savedSolved = localStorage.getItem(`solved_${uid}`);
    const savedAttempted = localStorage.getItem(`attempted_${uid}`);
    if (savedSolved) {
      try { setSolvedProblems(new Set<string>(JSON.parse(savedSolved))); } catch {}
    } else {
      setSolvedProblems(new Set<string>());
    }
    if (savedAttempted) {
      try { setAttemptedProblems(new Set<string>(JSON.parse(savedAttempted))); } catch {}
    } else {
      setAttemptedProblems(new Set<string>());
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
        
        const allPassed = res.results.every(r => r.passed);
        const passedCount = res.results.filter(r => r.passed).length;
        
        localStorage.setItem(`passed_count_${currentUser.uid}_${activeProblem.id}`, passedCount.toString());

        if (allPassed) {
          const newSolved = new Set<string>(solvedProblems);
          newSolved.add(activeProblem.id);
          setSolvedProblems(newSolved);
          
          localStorage.setItem(`passed_code_${currentUser.uid}_${activeProblem.id}`, code);
          persistProgress(newSolved, attemptedProblems);
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
    }
  };

  const handleGenerateReport = () => {
    if (currentUser) {
      generateReport(
        currentUser.displayName, 
        problems, 
        solvedProblems, 
        attemptedProblems, 
        currentUser.email,
        currentUser.rollNumber,
        currentUser.department
      );
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

            {/* Secondary Option: Manual Institutional Login */}
            <div className="mt-5 pt-5 border-t border-neutral-800/80 text-center">
              <button
                type="button"
                onClick={() => setShowManualForm(!showManualForm)}
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
              >
                {showManualForm ? 'Hide manual login' : 'Or sign in with roll number'}
              </button>

              {showManualForm && (
                <form onSubmit={handleManualSignIn} className="mt-4 text-left space-y-3">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arun Kumar S"
                      value={loginName}
                      onChange={(e) => setLoginName(e.target.value)}
                      className="w-full bg-[#0c0d10] border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Roll / Register Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 21CS042"
                      value={loginRollNumber}
                      onChange={(e) => setLoginRollNumber(e.target.value)}
                      className="w-full bg-[#0c0d10] border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 font-mono uppercase focus:outline-none focus:border-neutral-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Department</label>
                    <select
                      value={loginDepartment}
                      onChange={(e) => setLoginDepartment(e.target.value)}
                      className="w-full bg-[#0c0d10] border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-neutral-600 cursor-pointer"
                    >
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">
                      Institutional Email ({COLLEGE_DOMAIN})
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={`username${COLLEGE_DOMAIN}`}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-[#0c0d10] border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 font-mono focus:outline-none focus:border-neutral-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-2 bg-neutral-200 hover:bg-white text-neutral-900 font-medium py-2 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Enter Portal
                  </button>
                </form>
              )}
            </div>

          </div>

          <p className="text-center text-[11px] text-neutral-600 mt-4">
            Autonomous Institution · Tirunelveli
          </p>
        </div>
      </div>
    );
  }

  // Case 4: Authorized @francisxavier.ac.in user! Minimal Problem List Dashboard
  const levels = Array.from(new Set(problems.map(p => p.level))).sort((a, b) => a - b);
  
  const displayedProblems = problems.filter(p => {
    const matchesLevel = p.level === selectedLevel;
    const matchesDiff = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
    const matchesSearch = !searchQuery.trim() || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesDiff && matchesSearch;
  });

  const levelTotalProblems = problems.filter(p => p.level === selectedLevel);
  const levelSolvedCount = levelTotalProblems.filter(p => solvedProblems.has(p.id)).length;
  const levelPercent = levelTotalProblems.length > 0 ? Math.round((levelSolvedCount / levelTotalProblems.length) * 100) : 0;
  const displayName = currentUser.displayName;

  if (view === 'list') {
    return (
      <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col">
        {/* Top Bar Contract (1 row, 3 zones) */}
        <header className="h-14 bg-white border-b border-neutral-200/90 px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
          {/* Zone 1: Brand title */}
          <div className="flex items-center gap-2">
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
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedLevel === level
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Level {level}
              </button>
            ))}
          </div>

          {/* Zone 3: Actions & User Info */}
          <div className="flex items-center gap-2.5">
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
              title="Download PDF report"
            >
              <FileDown size={14} className="text-neutral-500" />
              <span>Report</span>
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
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors text-center cursor-pointer ${
                  selectedLevel === level
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600'
                }`}
              >
                Level {level}
              </button>
            ))}
          </div>

          {/* Level Progress Banner (Clean, Minimal) */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-neutral-200/80">
            <div>
              <div className="text-xs text-neutral-500 font-medium">
                Level {selectedLevel} Problem Set
              </div>
              <h2 className="text-lg font-semibold text-neutral-900 tracking-tight">
                {selectedLevel === 1 ? 'For Loops & Iterative Logic' : `Advanced Algorithms · Part ${selectedLevel}`}
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

          {/* Footer note */}
          <footer className="mt-8 pt-4 border-t border-neutral-200/60 text-center text-[11px] text-neutral-400">
            Francis Xavier Engineering College · Department Evaluation Portal · C99
          </footer>
        </main>
      </div>
    );
  }

  // Case 5: Workspace View (Clean IDE)
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
            disabled={isRunning}
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
                dangerouslySetInnerHTML={{ __html: activeProblem?.description || '' }} 
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
