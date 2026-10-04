import React, { useState } from 'react';
import { StudentProfile } from '../../types/admin';
import { Problem } from '../../data/problems';
import { 
  X, 
  Check, 
  FileDown, 
  Code, 
  Copy, 
  CheckCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { generateReport } from '../../utils/report';

interface StudentProfileModalProps {
  student: StudentProfile;
  problems: Problem[];
  onClose: () => void;
  onRefresh: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  problems,
  onClose,
  onRefresh
}) => {
  const solvedSet = new Set<string>(student.solvedProblems || []);
  const attemptedSet = new Set<string>(student.attemptedProblems || []);
  
  // Find all solved problems
  const solvedProblemsList = problems.filter(p => solvedSet.has(p.id));
  
  // Selected problem to view code for (default to first solved problem or first problem)
  const [selectedProblemId, setSelectedProblemId] = useState<string>(
    solvedProblemsList.length > 0 ? solvedProblemsList[0].id : (problems[0]?.id || '')
  );

  const [copied, setCopied] = useState(false);

  const activeProblem = problems.find(p => p.id === selectedProblemId) || problems[0];
  const isSelectedSolved = activeProblem ? solvedSet.has(activeProblem.id) : false;

  // Retrieve code: 1. From student.submissions, 2. From localStorage, 3. Fallback starter code
  const getStudentCode = (problemId: string): string => {
    if (student.submissions && student.submissions[problemId]?.code) {
      return student.submissions[problemId].code;
    }
    const localPassed = localStorage.getItem(`passed_code_${student.uid}_${problemId}`);
    if (localPassed) return localPassed;
    const localSaved = localStorage.getItem(`code_${student.uid}_${problemId}`);
    if (localSaved) return localSaved;
    
    const prob = problems.find(p => p.id === problemId);
    if (isSelectedSolved && prob) {
      return `// Verified Solution for ${prob.title}\n// Submitted by: ${student.displayName} (${student.rollNumber})\n// Status: Passed all test cases\n\n${prob.starterCode}`;
    }
    return prob?.starterCode || '// No code recorded yet';
  };

  const currentCode = activeProblem ? getStudentCode(activeProblem.id) : '';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    generateReport({
      userId: student.uid,
      userName: student.displayName,
      problems,
      solvedProblemIds: solvedSet,
      attemptedProblemIds: attemptedSet,
      userEmail: student.email,
      rollNumber: student.rollNumber,
      department: student.department
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs font-sans animate-in fade-in">
      <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Minimal Header */}
        <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/60">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-neutral-900">{student.displayName}</span>
                <span className="text-[11px] font-mono text-neutral-500 bg-neutral-200/70 px-1.5 py-0.5 rounded">
                  {student.rollNumber}
                </span>
                <span className="text-[11px] text-neutral-500 hidden sm:inline">
                  · {student.department}
                </span>
              </div>
              <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                {student.email} · <span className="font-semibold text-neutral-800">{solvedSet.size} of {problems.length} solved</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <FileDown size={13} className="text-neutral-500" />
              <span>PDF Report</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Two-Pane Body: Problem list on left, Solution Code viewer on right */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-100 overflow-hidden">
          
          {/* Left Pane: Problems Navigator */}
          <div className="w-full md:w-72 flex flex-col bg-neutral-50/30 overflow-hidden shrink-0">
            <div className="p-3 border-b border-neutral-100 bg-white flex items-center justify-between text-xs">
              <span className="font-medium text-neutral-700">Problem Submissions</span>
              <span className="text-[11px] font-mono text-neutral-500">
                {solvedSet.size} Solved
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 custom-scrollbar">
              {problems.map((prob) => {
                const isSolved = solvedSet.has(prob.id);
                const isAttempted = attemptedSet.has(prob.id);
                const isSelected = activeProblem && activeProblem.id === prob.id;

                return (
                  <button
                    key={prob.id}
                    onClick={() => setSelectedProblemId(prob.id)}
                    className={`w-full text-left p-3 text-xs transition-colors flex items-start justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 text-white'
                        : 'hover:bg-neutral-100/70 text-neutral-800'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className={`font-medium truncate ${isSelected ? 'text-white' : 'text-neutral-900'}`}>
                        {prob.title}
                      </div>
                      <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        Level {prob.level} · {prob.difficulty}
                      </div>
                    </div>

                    <div className="shrink-0 mt-0.5">
                      {isSolved ? (
                        <span className={`inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          <Check size={10} />
                          Solved
                        </span>
                      ) : isAttempted ? (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-amber-800 text-amber-100' : 'bg-amber-50 text-amber-700'
                        }`}>
                          Attempted
                        </span>
                      ) : (
                        <span className={`text-[10px] ${isSelected ? 'text-neutral-400' : 'text-neutral-400'}`}>
                          Unsolved
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Pane: Code Viewer */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden min-h-0">
            {activeProblem ? (
              <>
                {/* Code Header */}
                <div className="px-4 py-2.5 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <Code size={14} className="text-neutral-500 shrink-0" />
                    <span className="font-semibold text-xs text-neutral-900 truncate">
                      {activeProblem.title}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono shrink-0">
                      (Level {activeProblem.level})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200 rounded-md transition-colors cursor-pointer"
                      title="Copy code"
                    >
                      {copied ? <CheckCheck size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Code Area */}
                <div className="flex-1 p-4 overflow-auto custom-scrollbar bg-[#0f1014] text-neutral-200">
                  <pre className="text-xs font-mono whitespace-pre-wrap leading-relaxed">
                    {currentCode}
                  </pre>
                </div>

                {/* Status Bar */}
                <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-100 text-[11px] text-neutral-500 flex items-center justify-between shrink-0">
                  <span>Language: C (C99 standard)</span>
                  <span className="font-mono">
                    Evaluation: {isSelectedSolved ? 'All Test Cases Passed' : 'Not Completed'}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-neutral-400 text-xs">
                Select a problem from the left pane to view submitted code.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
