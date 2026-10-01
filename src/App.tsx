import React, { useState, useEffect } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
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
  isFrancisXavierEmail, 
  COLLEGE_DOMAIN, 
  COLLEGE_NAME, 
  db,
  OperationType,
  handleFirestoreError
} from './firebase';
import { 
  ArrowLeft, 
  Play, 
  LayoutList, 
  Trophy, 
  CheckCircle, 
  FileDown, 
  CheckCircle2, 
  LogOut, 
  ShieldAlert, 
  GraduationCap, 
  School,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

type ViewState = 'list' | 'solve';

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
  // Auth state
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // App navigation and problem state
  const [view, setView] = useState<ViewState>('list');
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);
  
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

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setAuthLoading(false);

      if (user && isFrancisXavierEmail(user.email)) {
        setAuthError(null);
        const userEmail = user.email!;
        const displayName = user.displayName || userEmail.split('@')[0];

        // 1. Sync user profile to Firestore
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userDocRef);
          if (!userSnap.exists()) {
            await setDoc(userDocRef, {
              uid: user.uid,
              email: userEmail,
              displayName,
              photoURL: user.photoURL || '',
              college: COLLEGE_NAME,
              createdAt: new Date().toISOString(),
              lastLoginAt: new Date().toISOString(),
            });
          } else {
            await updateDoc(userDocRef, {
              displayName,
              photoURL: user.photoURL || '',
              lastLoginAt: new Date().toISOString(),
            });
          }
        } catch (err) {
          console.error('Firestore user profile sync warning:', err);
        }

        // 2. Load user progress from Firestore or localStorage
        try {
          const progressDocRef = doc(db, 'users', user.uid, 'progress', 'current');
          const progressSnap = await getDoc(progressDocRef);
          if (progressSnap.exists()) {
            const pData = progressSnap.data();
            if (Array.isArray(pData.solvedProblems)) {
              setSolvedProblems(new Set(pData.solvedProblems));
              localStorage.setItem(`solved_${user.uid}`, JSON.stringify(pData.solvedProblems));
            }
            if (Array.isArray(pData.attemptedProblems)) {
              setAttemptedProblems(new Set(pData.attemptedProblems));
              localStorage.setItem(`attempted_${user.uid}`, JSON.stringify(pData.attemptedProblems));
            }
          } else {
            const savedSolved = localStorage.getItem(`solved_${user.uid}`);
            const savedAttempted = localStorage.getItem(`attempted_${user.uid}`);
            if (savedSolved) {
              try { setSolvedProblems(new Set(JSON.parse(savedSolved))); } catch {}
            }
            if (savedAttempted) {
              try { setAttemptedProblems(new Set(JSON.parse(savedAttempted))); } catch {}
            }
          }
        } catch (err) {
          console.error('Firestore progress loading warning:', err);
        }
      } else {
        setSolvedProblems(new Set());
        setAttemptedProblems(new Set());
      }
    });

    return () => unsubscribe();
  }, []);

  const persistProgress = async (newSolved: Set<string>, newAttempted: Set<string>) => {
    if (!currentUser || !isFrancisXavierEmail(currentUser.email)) return;
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
      console.error('Error persisting progress to Firestore:', err);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;
      if (!isFrancisXavierEmail(email)) {
        setAuthError(`Access Restricted: "${email}" is not an authorized Francis Xavier Engineering College email. Please sign in with your official @francisxavier.ac.in account.`);
      }
    } catch (err: any) {
      console.error('Sign-in error:', err);
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setAuthError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSwitchAccount = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      await signOut(auth);
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;
      if (!isFrancisXavierEmail(email)) {
        setAuthError(`Access Restricted: "${email}" is not an authorized Francis Xavier Engineering College email. Please sign in with your official @francisxavier.ac.in account.`);
      }
    } catch (err: any) {
      console.error('Switch account error:', err);
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setAuthError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign-out error:', err);
    }
    setCurrentUser(null);
    setAuthError(null);
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
            
            const newAttempted = new Set<string>(attemptedProblems);
            newAttempted.delete(activeProblem.id);
            setAttemptedProblems(newAttempted);

            persistProgress(newSolved, newAttempted);
          }
        }
      }
    }
  };

  const handleSolve = (problem: Problem) => {
    setActiveProblem(problem);
    
    const uid = currentUser?.uid || 'guest';
    const savedCode = localStorage.getItem(`code_${uid}_${problem.id}`);
    const passedCode = localStorage.getItem(`passed_code_${uid}_${problem.id}`);
    setCode(savedCode || passedCode || problem.starterCode);
    
    setResults(null);
    setError(null);
    setIsCustomRun(false);
    setCustomOutput(null);
    setEditorMarkers([]);
    setView('solve');
  };

  const handleBack = () => {
    if (activeProblem && currentUser) {
      localStorage.setItem(`code_${currentUser.uid}_${activeProblem.id}`, code);
    }
    setView('list');
    setActiveProblem(null);
  };

  const parseCompilerOutputToMarkers = (output: string) => {
    const regex = /prog\.c:(\d+):(\d+):\s+(error|warning):\s+(.*)/g;
    const regex2 = /main\.c:(\d+):(\d+):\s+(error|warning):\s+(.*)/g;
    const regex3 = /source_file\.c:(\d+):(\d+):\s+(error|warning):\s+(.*)/g;
    let match;
    const newMarkers: EditorMarker[] = [];
    
    const parseMatches = (r: RegExp) => {
      while ((match = r.exec(output)) !== null) {
        newMarkers.push({
          startLineNumber: parseInt(match[1]),
          startColumn: parseInt(match[2]),
          endLineNumber: parseInt(match[1]),
          endColumn: parseInt(match[2]) + 5,
          message: match[4],
          severity: match[3] === 'error' ? 8 : 4
        });
      }
    };
    
    parseMatches(regex);
    parseMatches(regex2);
    parseMatches(regex3);
    setEditorMarkers(newMarkers);
  };

  const handleRunCustom = async () => {
    if (!activeProblem || !currentUser) return;
    
    setMobileTab('console');
    setIsRunning(true);
    setEditorMarkers([]);
    setIsCustomRun(true);
    setResults(null);
    setError(null);
    setCustomOutput(null);

    localStorage.setItem(`code_${currentUser.uid}_${activeProblem.id}`, code);

    const result = await executeCustomCode(code, customInput, { standard: compilerStandard });

    setIsRunning(false);
    
    if (!result.success && !result.compile_output && !result.stderr && !result.output) {
      setError(result.error || 'An unknown error occurred');
      return;
    }

    setCustomOutput(result);
    if (result.compile_output || result.stderr) {
      parseCompilerOutputToMarkers((result.compile_output || '') + '\n' + (result.stderr || ''));
    }
  };

  const handleSubmitCode = async () => {
    if (!activeProblem || !currentUser) return;
    
    setMobileTab('console');
    setIsRunning(true);
    setIsCustomRun(false);
    setResults(null);
    setError(null);
    setCustomOutput(null);

    const uid = currentUser.uid;
    localStorage.setItem(`code_${uid}_${activeProblem.id}`, code);

    const { success, results, error } = await executeCode(
      code,
      activeProblem.functionName,
      activeProblem.testCases,
      { standard: compilerStandard }
    );

    setIsRunning(false);
    
    if (!success) {
      setError(error || 'An unknown error occurred');
      
      const newAttempted = new Set<string>(attemptedProblems);
      newAttempted.add(activeProblem.id);
      setAttemptedProblems(newAttempted);
      persistProgress(solvedProblems, newAttempted);
      
      return;
    }

    setResults(results || null);
    
    if (results) {
      const failed = results.find(r => !r.passed);
      if (failed && failed.error) {
        parseCompilerOutputToMarkers(failed.error);
      }

      const allPassed = results.every((r) => r.passed);
      const passedCount = results.filter(r => r.passed).length;
      localStorage.setItem(`passed_count_${uid}_${activeProblem.id}`, passedCount.toString());

      if (allPassed) {
        localStorage.setItem(`passed_code_${uid}_${activeProblem.id}`, code);
        const newSolved = new Set<string>(solvedProblems);
        newSolved.add(activeProblem.id);
        setSolvedProblems(newSolved);

        const newAttempted = new Set<string>(attemptedProblems);
        newAttempted.delete(activeProblem.id);
        setAttemptedProblems(newAttempted);

        persistProgress(newSolved, newAttempted);
      } else {
        const newAttempted = new Set<string>(attemptedProblems);
        newAttempted.add(activeProblem.id);
        setAttemptedProblems(newAttempted);

        persistProgress(solvedProblems, newAttempted);
      }
    }
  };

  const handleGenerateReport = () => {
    if (currentUser) {
      const name = currentUser.displayName || currentUser.email?.split('@')[0] || 'FXEC Student';
      generateReport(name, problems, solvedProblems, attemptedProblems, currentUser.email || undefined);
    }
  };

  // Case 1: Initial auth check loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center p-6 text-white">
        <div className="w-12 h-12 rounded-full border-3 border-blue-500/20 border-t-blue-500 animate-spin mb-4" />
        <p className="text-neutral-400 text-sm font-medium">Verifying Francis Xavier Engineering College credentials...</p>
      </div>
    );
  }

  // Case 2: Not authenticated at all -> Institutional Google Sign In Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="bg-[#171717] border border-neutral-800 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-lg text-center relative z-10">
          {/* Institutional Crest Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-tr from-blue-700 to-indigo-600 text-white rounded-2xl shadow-lg ring-4 ring-blue-500/20">
              <GraduationCap size={44} />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/60 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <School size={13} />
            Autonomous Institution
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Francis Xavier Engineering College
          </h1>
          <p className="text-blue-400 text-sm font-semibold mt-1">
            PS PORTAL PRACTICE
          </p>
          <p className="text-neutral-400 text-xs sm:text-sm mt-3 mb-8 leading-relaxed max-w-sm mx-auto">
            Exclusive problem solving and code evaluation portal for students and faculty of FXEC.
          </p>

          {/* Domain Access Warning Badge */}
          <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-6 text-left flex items-start gap-3">
            <ShieldAlert size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-relaxed">
              <span className="font-semibold text-amber-300 block">Domain Restriction Enforced</span>
              Only Google accounts ending in <span className="font-mono bg-amber-400/20 px-1 py-0.5 rounded text-amber-200 font-bold">{COLLEGE_DOMAIN}</span> are authorized to sign in.
            </div>
          </div>

          {authError && (
            <div className="p-3.5 bg-rose-950/70 border border-rose-800/80 rounded-xl mb-6 text-left flex items-start gap-3 text-rose-300 text-xs leading-relaxed">
              <AlertTriangle size={18} className="text-rose-400 shrink-0 mt-0.5" />
              <div>{authError}</div>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isSigningIn}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-100 disabled:opacity-60 text-neutral-900 font-semibold py-3 px-5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
          >
            {isSigningIn ? (
              <div className="w-5 h-5 rounded-full border-2 border-neutral-400 border-t-neutral-900 animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            <span className="text-sm sm:text-base">
              {isSigningIn ? 'Connecting to Google...' : 'Sign in with Google Account'}
            </span>
          </button>

          <p className="text-[11px] text-neutral-500 mt-6">
            Make sure to pick your institutional email address ending with <strong className="text-neutral-400">{COLLEGE_DOMAIN}</strong>.
          </p>
        </div>
      </div>
    );
  }

  // Case 3: Authenticated, but email DOES NOT end with @francisxavier.ac.in -> Restrict Access
  const isAuthorized = isFrancisXavierEmail(currentUser.email);
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 relative">
        <div className="bg-[#171717] border border-rose-900/60 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-lg text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-rose-950 text-rose-400 rounded-2xl border border-rose-800 ring-4 ring-rose-500/10">
              <ShieldAlert size={44} />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-semibold mb-3">
            Access Restricted
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Institutional Access Only
          </h1>

          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
            This platform is strictly reserved for students and staff of <strong className="text-white">Francis Xavier Engineering College</strong>.
          </p>

          <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 mb-6 text-left">
            <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
              Signed in account
            </div>
            <div className="text-sm font-mono text-rose-300 font-medium break-all">
              {currentUser.email || 'No email provided'}
            </div>
            <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center gap-2 text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              Required domain: <strong className="text-blue-400 font-mono">{COLLEGE_DOMAIN}</strong>
            </div>
          </div>

          {authError && (
            <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-lg text-rose-300 text-xs mb-6 text-left">
              {authError}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={handleSwitchAccount}
              disabled={isSigningIn}
              className="w-full flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm cursor-pointer text-sm"
            >
              {isSigningIn ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <RotateCcw size={16} />
              )}
              Switch to @francisxavier.ac.in Account
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium py-2 px-4 rounded-xl transition-colors text-sm cursor-pointer"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Case 4: Authorized @francisxavier.ac.in user! Full access granted.
  const levels = Array.from(new Set(problems.map(p => p.level))).sort((a, b) => a - b);
  const displayedProblems = problems.filter(p => p.level === selectedLevel && (difficultyFilter === 'All' || p.difficulty === difficultyFilter));
  const levelSolvedCount = displayedProblems.filter(p => solvedProblems.has(p.id)).length;
  const displayName = currentUser.displayName || currentUser.email?.split('@')[0] || 'FXEC Student';

  if (view === 'list') {
    return (
      <div className="min-h-screen bg-neutral-50 text-neutral-900 p-4 sm:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Institution Header Banner */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200 shadow-sm">
            <div className="flex items-center gap-3 sm:gap-4">
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={displayName} 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-2 ring-blue-500/30 object-cover"
                />
              ) : (
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-neutral-900">
                    {displayName}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-[11px] font-semibold">
                    <School size={12} />
                    FXEC Verified
                  </span>
                </div>
                <p className="text-neutral-500 text-xs sm:text-sm font-mono mt-0.5 truncate max-w-xs sm:max-w-md">
                  {currentUser.email}
                </p>
                <p className="text-neutral-400 text-[11px] font-medium mt-0.5">
                  Francis Xavier Engineering College • PS Portal Practice
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
              <button
                onClick={handleGenerateReport}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm transition-colors cursor-pointer"
                title="Download verified institutional performance report"
              >
                <FileDown size={16} />
                <span className="hidden sm:inline">Generate Report</span>
                <span className="sm:hidden">Report</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 text-xs sm:text-sm font-medium rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          {/* Level Filter & Difficulty Filter */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-colors cursor-pointer ${
                    selectedLevel === level
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  Level {level}
                </button>
              ))}
            </div>
            
            <div className="hidden sm:block h-8 w-px bg-neutral-300"></div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-neutral-500 mr-1">Difficulty:</span>
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map(diff => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    difficultyFilter === diff
                      ? 'bg-neutral-800 text-white shadow-sm'
                      : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Problem Set Card */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50/50 flex justify-between items-center">
              <h2 className="font-semibold text-neutral-800 flex items-center gap-2">
                <LayoutList size={18} />
                Level {selectedLevel} Problem Set
              </h2>
              <div className="text-sm text-neutral-500 font-medium">
                {levelSolvedCount} / {displayedProblems.length} Solved
              </div>
            </div>
            
            <div className="divide-y divide-neutral-100">
              {displayedProblems.map((problem) => {
                const isSolved = solvedProblems.has(problem.id);
                const isAttempted = attemptedProblems.has(problem.id) && !isSolved;
                return (
                  <div 
                    key={problem.id} 
                    className="p-6 flex items-center justify-between hover:bg-neutral-50 transition-colors group cursor-pointer"
                    onClick={() => handleSolve(problem)}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded-full flex items-center justify-center ${isSolved ? 'bg-green-100 text-green-600' : isAttempted ? 'bg-amber-100 text-amber-600' : 'bg-neutral-100 text-neutral-300'}`}>
                        {isSolved ? <CheckCircle size={16} /> : isAttempted ? <div className="w-2 h-2 rounded-full bg-amber-400" /> : <div className="w-2 h-2 rounded-full bg-neutral-300" />}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-medium text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {problem.title}
                        </h3>
                        <div className="flex items-center flex-wrap gap-2 mt-1">
                          <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${
                            problem.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                            problem.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-rose-100 text-rose-700'
                          }`}>
                            {problem.difficulty}
                          </span>
                          {isAttempted && <span className="text-[10px] sm:text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Attempted</span>}
                        </div>
                      </div>
                    </div>
                    <button 
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-neutral-200 text-neutral-700 text-xs sm:text-sm shrink-0 font-medium rounded-lg hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm ml-2 sm:ml-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSolve(problem);
                      }}
                    >
                      <span className="hidden sm:inline">{isSolved ? 'Solve Again' : isAttempted ? 'Keep Trying' : 'Solve Challenge'}</span>
                      <span className="sm:hidden">{isSolved ? 'Again' : 'Solve'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Solve view
  return (
    <div className="flex flex-col h-[100dvh] bg-[#0d0d0d] text-neutral-300 font-sans">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 px-4 sm:px-6 py-3 bg-[#1a1a1a] border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto overflow-hidden">
          <button 
            onClick={handleBack}
            className="p-1.5 hover:bg-gray-800 text-gray-400 hover:text-white rounded transition-colors shrink-0 cursor-pointer"
            title="Back to problems"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="truncate">
            <h1 className="text-base sm:text-lg font-semibold text-white tracking-tight truncate">
              {activeProblem?.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="text-blue-400 font-medium">FXEC Portal</span>
              <span>•</span>
              <span>Level {activeProblem?.level}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={handleRunCustom}
            disabled={isRunning}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-medium rounded shadow-sm transition-colors shrink-0 cursor-pointer"
          >
            {isRunning && isCustomRun ? <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <Play size={14} className="sm:w-4 sm:h-4" fill="currentColor" />}
            {isRunning && isCustomRun ? 'Running...' : 'Run'}
          </button>
          <button
            onClick={handleSubmitCode}
            disabled={isRunning}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-medium rounded shadow-sm transition-colors shrink-0 cursor-pointer"
          >
            {isRunning && !isCustomRun ? <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <CheckCircle2 size={14} className="sm:w-4 sm:h-4" />}
            {isRunning && !isCustomRun ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Tabs */}
        <div className="flex md:hidden bg-[#1a1a1a] border-b border-gray-800 shrink-0">
          {(['desc', 'code', 'console'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                mobileTab === tab ? 'text-blue-400 border-b-2 border-blue-500 bg-[#2d2d2d]' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              {tab === 'desc' ? 'Problem' : tab === 'code' ? 'Code' : 'Console'}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Panel: Description */}
          <div className={`${mobileTab === 'desc' ? 'flex' : 'hidden'} md:flex flex-1 md:flex-none w-full md:w-1/3 md:min-w-[300px] flex-col bg-[#1a1a1a] md:border-r border-gray-800 shrink-0 overflow-hidden`}>
            <div className="hidden md:block px-4 py-2 bg-[#2d2d2d] border-b border-gray-800 text-gray-300 text-xs font-semibold uppercase tracking-wider shrink-0">
              Description
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 prose prose-invert prose-sm max-w-none">
               <div dangerouslySetInnerHTML={{ __html: activeProblem?.description || '' }} />
            </div>
          </div>

          {/* Right Panel: Editor and Console */}
          <div className={`${(mobileTab === 'code' || mobileTab === 'console') ? 'flex' : 'hidden'} md:flex flex-1 flex-col min-w-0`}>
            <div className={`${mobileTab === 'code' ? 'flex' : 'hidden'} md:flex flex-[2] min-h-0 flex-col`}>
              <CodeEditor value={code} onChange={handleCodeChange} language="c" onRun={handleRunCustom} onSubmit={handleSubmitCode} markers={editorMarkers} />
            </div>
            <div className={`${mobileTab === 'console' ? 'flex' : 'hidden'} md:flex flex-1 min-h-0 flex-col md:border-t border-gray-800`}>
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
