import React, { useState, useEffect } from 'react';
import { CodeEditor, EditorMarker } from './components/CodeEditor';
import { Console } from './components/Console';
import { problems, Problem } from './data/problems';
import { executeCode, executeCustomCode, TestResult, ExecutionResult, CompilerOptions } from './utils/executor';
import { generateReport } from './utils/report';
import { ArrowLeft, Play, LayoutList, Trophy, CheckCircle, FileDown, CheckCircle2, LogOut } from 'lucide-react';

type ViewState = 'list' | 'solve';

export default function App() {
  const [userName, setUserName] = useState<string | null>(localStorage.getItem('currentUser'));
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  
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
  const [compilerStandard, setCompilerStandard] = useState<string>('c99');
  const [editorMarkers, setEditorMarkers] = useState<EditorMarker[]>([]);
  
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());
  const [attemptedProblems, setAttemptedProblems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (userName) {
      const savedSolved = localStorage.getItem(`solved_${userName}`);
      if (savedSolved) {
        try {
          setSolvedProblems(new Set(JSON.parse(savedSolved)));
        } catch (e) {
          console.error('Failed to parse saved solved progress');
        }
      }
      
      const savedAttempted = localStorage.getItem(`attempted_${userName}`);
      if (savedAttempted) {
        try {
          setAttemptedProblems(new Set(JSON.parse(savedAttempted)));
        } catch (e) {
          console.error('Failed to parse saved attempted progress');
        }
      }
    }
  }, [userName]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim() && passwordInput.trim()) {
      const name = nameInput.trim();
      const password = passwordInput.trim();
      
      const savedPassword = localStorage.getItem(`password_${name}`);
      if (savedPassword) {
        if (savedPassword !== password) {
          setLoginError('Incorrect password');
          return;
        }
      } else {
        localStorage.setItem(`password_${name}`, password);
      }
      
      setLoginError(null);
      setUserName(name);
      localStorage.setItem('currentUser', name);
    }
  };

  const handleLogout = () => {
    setUserName(null);
    localStorage.removeItem('currentUser');
    setSolvedProblems(new Set());
    setAttemptedProblems(new Set());
    setNameInput('');
    setPasswordInput('');
    setLoginError(null);
    setView('list');
    setActiveProblem(null);
  };

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode === undefined) return;
    setCode(newCode);

    if (activeProblem && userName) {
      const passedCode = localStorage.getItem(`passed_code_${userName}_${activeProblem.id}`);
      if (passedCode !== null) {
        if (newCode.trim() !== passedCode.trim()) {
          if (solvedProblems.has(activeProblem.id)) {
            const newSolved = new Set(solvedProblems);
            newSolved.delete(activeProblem.id);
            setSolvedProblems(newSolved);
            localStorage.setItem(`solved_${userName}`, JSON.stringify(Array.from(newSolved)));

            const newAttempted = new Set(attemptedProblems);
            newAttempted.add(activeProblem.id);
            setAttemptedProblems(newAttempted);
            localStorage.setItem(`attempted_${userName}`, JSON.stringify(Array.from(newAttempted)));
          }
        } else {
          if (!solvedProblems.has(activeProblem.id)) {
            const newSolved = new Set(solvedProblems);
            newSolved.add(activeProblem.id);
            setSolvedProblems(newSolved);
            localStorage.setItem(`solved_${userName}`, JSON.stringify(Array.from(newSolved)));
            
            const newAttempted = new Set(attemptedProblems);
            newAttempted.delete(activeProblem.id);
            setAttemptedProblems(newAttempted);
            localStorage.setItem(`attempted_${userName}`, JSON.stringify(Array.from(newAttempted)));
          }
        }
      }
    }
  };

  const handleSolve = (problem: Problem) => {
    setActiveProblem(problem);
    
    // Load saved code for this problem if it exists
    const savedCode = localStorage.getItem(`code_${userName}_${problem.id}`);
    const passedCode = localStorage.getItem(`passed_code_${userName}_${problem.id}`);
    setCode(savedCode || passedCode || problem.starterCode);
    
    setResults(null);
    setError(null);
    setIsCustomRun(false);
    setCustomOutput(null);
    setEditorMarkers([]);
    setView('solve');
  };

  const handleBack = () => {
    if (activeProblem && userName) {
      localStorage.setItem(`code_${userName}_${activeProblem.id}`, code);
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
          severity: match[3] === 'error' ? 8 : 4 // 8 = Error, 4 = Warning
        });
      }
    };
    
    parseMatches(regex);
    parseMatches(regex2);
    parseMatches(regex3);
    setEditorMarkers(newMarkers);
  };

  const handleRunCustom = async () => {
    if (!activeProblem || !userName) return;
    
    setIsRunning(true);
    setEditorMarkers([]);
    setIsCustomRun(true);
    setResults(null);
    setError(null);
    setCustomOutput(null);

    // Save code to local storage
    localStorage.setItem(`code_${userName}_${activeProblem.id}`, code);

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
    if (!activeProblem || !userName) return;
    
    setIsRunning(true);
    setIsCustomRun(false);
    setResults(null);
    setError(null);
    setCustomOutput(null);

    // Save code to local storage
    localStorage.setItem(`code_${userName}_${activeProblem.id}`, code);

    const { success, results, error } = await executeCode(
      code,
      activeProblem.functionName,
      activeProblem.testCases,
      { standard: compilerStandard }
    );

    setIsRunning(false);
    
    if (!success) {
      setError(error || 'An unknown error occurred');
      
      const newAttempted = new Set(attemptedProblems);
      newAttempted.add(activeProblem.id);
      setAttemptedProblems(newAttempted);
      localStorage.setItem(`attempted_${userName}`, JSON.stringify(Array.from(newAttempted)));
      
      return;
    }

    setResults(results || null);
    
    // Find the first error result if any
    if (results) {
      const failed = results.find(r => !r.passed);
      if (failed && failed.error) {
        parseCompilerOutputToMarkers(failed.error);
      }
    }


    if (results) {
      const allPassed = results.every((r) => r.passed);
      
      const passedCount = results.filter(r => r.passed).length;
      localStorage.setItem(`passed_count_${userName}_${activeProblem.id}`, passedCount.toString());

      if (allPassed) {
        localStorage.setItem(`passed_code_${userName}_${activeProblem.id}`, code);
        const newSolved = new Set(solvedProblems);
        newSolved.add(activeProblem.id);
        setSolvedProblems(newSolved);
        localStorage.setItem(`solved_${userName}`, JSON.stringify(Array.from(newSolved)));
      } else {
        const newAttempted = new Set(attemptedProblems);
        newAttempted.add(activeProblem.id);
        setAttemptedProblems(newAttempted);
        localStorage.setItem(`attempted_${userName}`, JSON.stringify(Array.from(newAttempted)));
      }
    }
  };

  const handleGenerateReport = () => {
    if (userName) {
      generateReport(userName, problems, solvedProblems, attemptedProblems);
    }
  };

  if (!userName) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-neutral-200">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
              <Trophy size={40} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-neutral-900 mb-2">Welcome to PS PORTAL PRACTICE</h1>
          <p className="text-neutral-500 text-center mb-8">Please enter your name to continue</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium text-center">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-neutral-900"
                placeholder="e.g. John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-neutral-900"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm"
            >
              Start Coding
            </button>
          </form>
        </div>
      </div>
    );
  }

  const levels = Array.from(new Set(problems.map(p => p.level))).sort((a, b) => a - b);
  const displayedProblems = problems.filter(p => p.level === selectedLevel && (difficultyFilter === 'All' || p.difficulty === difficultyFilter));
  const levelSolvedCount = displayedProblems.filter(p => solvedProblems.has(p.id)).length;

  if (view === 'list') {
    return (
      <div className="min-h-screen bg-neutral-50 text-neutral-900 p-4 sm:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 text-white rounded-lg shadow-sm">
                <Trophy size={24} className="sm:w-7 sm:h-7" />
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-neutral-900">PS PORTAL PRACTICE</h1>
                <p className="text-neutral-500 text-sm sm:text-base">Welcome, {userName}!</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
              <button
                onClick={handleGenerateReport}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-sm sm:text-base font-medium rounded-lg shadow-sm transition-colors"
              >
                <FileDown size={18} />
                <span className="hidden sm:inline">Generate Report</span>
                <span className="sm:hidden">Report</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 text-sm sm:text-base font-medium rounded-lg shadow-sm transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2 sm:gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
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
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
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

  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d] text-neutral-300 font-sans">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 px-4 sm:px-6 py-3 bg-[#1a1a1a] border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto overflow-hidden">
          <button 
            onClick={handleBack}
            className="p-1.5 hover:bg-gray-800 text-gray-400 hover:text-white rounded transition-colors shrink-0"
            title="Back to problems"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-base sm:text-lg font-semibold text-white tracking-tight truncate">
            {activeProblem?.title}
          </h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <select 
            value={compilerStandard} 
            onChange={(e) => setCompilerStandard(e.target.value)}
            className="bg-[#2d2d2d] text-white text-xs sm:text-sm border border-gray-700 rounded px-2 py-1.5 focus:outline-none focus:border-blue-500 shrink-0"
          >
            <option value="c89">C89</option>
            <option value="c99">C99</option>
            <option value="c11">C11</option>
            <option value="c17">C17</option>
            <option value="c2x">C23</option>
          </select>
          <button
            onClick={handleRunCustom}
            disabled={isRunning}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-medium rounded shadow-sm transition-colors shrink-0"
          >
            {isRunning && isCustomRun ? <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <Play size={14} className="sm:w-4 sm:h-4" fill="currentColor" />}
            {isRunning && isCustomRun ? 'Running...' : 'Run'}
          </button>
          <button
            onClick={handleSubmitCode}
            disabled={isRunning}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-medium rounded shadow-sm transition-colors shrink-0"
          >
            {isRunning && !isCustomRun ? <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <CheckCircle2 size={14} className="sm:w-4 sm:h-4" />}
            {isRunning && !isCustomRun ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel: Description */}
        <div className="w-full md:w-1/3 md:min-w-[300px] h-1/3 md:h-auto flex flex-col bg-[#1a1a1a] border-b md:border-b-0 md:border-r border-gray-800 overflow-hidden shrink-0">
          <div className="px-4 py-2 bg-[#2d2d2d] border-b border-gray-800 text-gray-300 text-xs font-semibold uppercase tracking-wider shrink-0">
            Description
          </div>
          <div className="flex-1 overflow-auto p-6 prose prose-invert prose-sm max-w-none">
             <div dangerouslySetInnerHTML={{ __html: activeProblem?.description || '' }} />
          </div>
        </div>

        {/* Right Panel: Editor and Console */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-[2] min-h-0">
            <CodeEditor value={code} onChange={handleCodeChange} language="c" onRun={handleRunCustom} onSubmit={handleSubmitCode} markers={editorMarkers} />
          </div>
          <div className="flex-1 min-h-0">
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
  );
}


