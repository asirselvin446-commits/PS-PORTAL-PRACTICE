import React, { useState } from 'react';
import { StudentProfile, UserRole, StudentSubmission } from '../../types/admin';
import { Problem } from '../../data/problems';
import { 
  X, 
  Check, 
  FileDown, 
  Code, 
  Copy, 
  CheckCheck,
  Building2,
  Calendar,
  Clock,
  RotateCcw,
  Unlock,
  Lock,
  UserX,
  UserCheck,
  History,
  ListFilter,
  ShieldAlert
} from 'lucide-react';
import { generateReport } from '../../utils/report';
import { 
  resetStudentProgress, 
  toggleStudentLevelUnlock, 
  toggleStudentSuspension 
} from '../../utils/adminStore';
import { ConfirmationModal } from './ConfirmationModal';

interface StudentProfileModalProps {
  student: StudentProfile;
  problems: Problem[];
  operatorRole?: UserRole;
  onClose: () => void;
  onRefresh: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  problems,
  operatorRole,
  onClose,
  onRefresh
}) => {
  const solvedSet = new Set<string>(student.solvedProblems || []);
  const attemptedSet = new Set<string>(student.attemptedProblems || []);
  
  const solvedProblemsList = problems.filter(p => solvedSet.has(p.id));
  
  const [selectedProblemId, setSelectedProblemId] = useState<string>(
    solvedProblemsList.length > 0 ? solvedProblemsList[0].id : (problems[0]?.id || '')
  );

  const [activeLeftTab, setActiveLeftTab] = useState<'problems' | 'timeline'>('problems');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Confirmation dialog states
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [resetLevelChoice, setResetLevelChoice] = useState<'all' | 1 | 2 | 3>('all');
  const [confirmSuspendOpen, setConfirmSuspendOpen] = useState(false);
  const [confirmUnlockOpen, setConfirmUnlockOpen] = useState<number | null>(null);

  const activeProblem = problems.find(p => p.id === selectedProblemId) || problems[0];
  const isSelectedSolved = activeProblem ? solvedSet.has(activeProblem.id) : false;

  // Level statistics calculation
  const l1Total = problems.filter(p => p.level === 1).length;
  const l1Solved = problems.filter(p => p.level === 1 && solvedSet.has(p.id)).length;
  const l1Pct = l1Total > 0 ? Math.round((l1Solved / l1Total) * 100) : 0;

  const l2Total = problems.filter(p => p.level === 2).length;
  const l2Solved = problems.filter(p => p.level === 2 && solvedSet.has(p.id)).length;
  const l2Pct = l2Total > 0 ? Math.round((l2Solved / l2Total) * 100) : 0;

  const l3Total = problems.filter(p => p.level === 3).length;
  const l3Solved = problems.filter(p => p.level === 3 && solvedSet.has(p.id)).length;
  const l3Pct = l3Total > 0 ? Math.round((l3Solved / l3Total) * 100) : 0;

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

  const handleConfirmReset = async () => {
    setIsProcessing(true);
    try {
      if (resetLevelChoice === 'all') {
        await resetStudentProgress(student.uid);
      } else {
        await resetStudentProgress(student.uid, resetLevelChoice, problems);
      }
      setConfirmResetOpen(false);
      onRefresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmSuspend = async () => {
    setIsProcessing(true);
    try {
      await toggleStudentSuspension(student.uid, !student.isSuspended);
      setConfirmSuspendOpen(false);
      onRefresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmUnlock = async (level: number) => {
    setIsProcessing(true);
    try {
      await toggleStudentLevelUnlock(student.uid, level);
      setConfirmUnlockOpen(null);
      onRefresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  // Build submission timeline entries sorted descending by date
  const timelineEntries = Object.entries(student.submissions || {})
    .filter(([_, sub]) => Boolean(sub && (sub as StudentSubmission).code))
    .map(([pid, rawSub]) => {
      const sub = rawSub as StudentSubmission;
      const prob = problems.find(p => p.id === pid);
      return {
        problemId: pid,
        problemTitle: prob?.title || pid,
        level: prob?.level || 1,
        passedAt: sub.passedAt || student.lastActive,
        passedCount: sub.passedCount || 4,
        totalCount: sub.totalCount || 4,
        code: sub.code
      };
    })
    .sort((a, b) => new Date(b.passedAt).getTime() - new Date(a.passedAt).getTime());

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs font-sans animate-in fade-in">
        <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-neutral-100 bg-neutral-50/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-base text-neutral-900">{student.displayName}</span>
                  <span className="text-[11px] font-mono text-neutral-600 bg-neutral-200/80 px-1.5 py-0.5 rounded font-bold">
                    {student.rollNumber}
                  </span>
                  <span className="text-xs text-neutral-500 hidden sm:inline">
                    · {student.department}
                  </span>
                  {student.batch && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                      {student.batch}
                    </span>
                  )}
                  {student.isSuspended && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold flex items-center gap-1">
                      <UserX size={11} /> Suspended
                    </span>
                  )}
                  {student.unlockedLevels && student.unlockedLevels.length > 0 && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium flex items-center gap-1">
                      <Unlock size={11} /> Manual Unlock: L{student.unlockedLevels.join(', L')}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-neutral-500 font-mono mt-1">
                  <span>{student.email}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-neutral-600 font-medium">
                    <Clock size={11} className="text-neutral-400" />
                    Last Active: {new Date(student.lastActive).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={handleDownloadReport}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  title="Download Individual Performance PDF"
                >
                  <FileDown size={13} className="text-neutral-500" />
                  <span>PDF Report</span>
                </button>

                {/* Level Unlock Toggle Button */}
                <div className="relative group">
                  <button
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  >
                    <Unlock size={12} className="text-emerald-600" />
                    <span>Level Unlock</span>
                  </button>
                  <div className="hidden group-hover:block absolute right-0 top-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg p-1.5 z-20 w-44 space-y-1">
                    <div className="text-[10px] text-neutral-400 px-2 py-0.5 font-medium">Toggle Level Lock Override:</div>
                    {[2, 3].map(lvl => {
                      const isUnlocked = student.unlockedLevels?.includes(lvl);
                      return (
                        <button
                          key={lvl}
                          onClick={() => setConfirmUnlockOpen(lvl)}
                          className={`w-full text-left px-2 py-1 text-xs rounded flex items-center justify-between cursor-pointer ${
                            isUnlocked ? 'bg-emerald-50 text-emerald-800' : 'hover:bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          <span>Level {lvl}</span>
                          <span className="text-[10px] font-mono">{isUnlocked ? 'Unlocked' : 'Locked'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Reset Progress Button */}
                <button
                  onClick={() => setConfirmResetOpen(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors cursor-pointer"
                  title="Reset student test progress"
                >
                  <RotateCcw size={12} />
                  <span>Reset Progress</span>
                </button>

                {/* Suspend / Reactivate */}
                <button
                  onClick={() => setConfirmSuspendOpen(true)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    student.isSuspended
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  {student.isSuspended ? <UserCheck size={12} /> : <UserX size={12} />}
                  <span>{student.isSuspended ? 'Reactivate' : 'Suspend'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer ml-1"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Per-Level Progress Breakdown Strip */}
            <div className="mt-3 pt-3 border-t border-neutral-200/80 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-neutral-200/80">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-neutral-500 font-medium">Overall Solved</span>
                  <span className="font-mono font-bold text-neutral-900">{solvedProblemsList.length} / {problems.length}</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-neutral-900 rounded-full" style={{ width: `${Math.round((solvedProblemsList.length / problems.length) * 100)}%` }} />
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-neutral-200/80">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-neutral-500 font-medium">Level 1 (Loops)</span>
                  <span className="font-mono font-bold text-neutral-900">{l1Solved} / {l1Total} ({l1Pct}%)</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${l1Pct}%` }} />
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-neutral-200/80">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-neutral-500 font-medium">Level 2 (Patterns)</span>
                  <span className="font-mono font-bold text-neutral-900">{l2Solved} / {l2Total} ({l2Pct}%)</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${l2Pct}%` }} />
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-neutral-200/80">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-neutral-500 font-medium">Level 3 (Arrays)</span>
                  <span className="font-mono font-bold text-neutral-900">{l3Solved} / {l3Total} ({l3Pct}%)</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${l3Pct}%` }} />
                </div>
              </div>
            </div>

          </div>

          {/* Two-Pane Body */}
          <div className="flex-1 min-h-0 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-100 overflow-hidden">
            
            {/* Left Pane */}
            <div className="w-full md:w-80 flex flex-col bg-neutral-50/40 overflow-hidden shrink-0">
              
              {/* Tab Selector */}
              <div className="p-2 border-b border-neutral-100 bg-white flex items-center gap-1 text-xs">
                <button
                  onClick={() => setActiveLeftTab('problems')}
                  className={`flex-1 py-1 px-2 rounded-md font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeLeftTab === 'problems'
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <ListFilter size={12} />
                  <span>Problem Set</span>
                </button>
                <button
                  onClick={() => setActiveLeftTab('timeline')}
                  className={`flex-1 py-1 px-2 rounded-md font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeLeftTab === 'timeline'
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <History size={12} />
                  <span>Timeline ({timelineEntries.length})</span>
                </button>
              </div>

              {/* Problem List or Timeline */}
              <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 custom-scrollbar">
                {activeLeftTab === 'problems' ? (
                  problems.map((prob) => {
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
                  })
                ) : (
                  timelineEntries.length === 0 ? (
                    <div className="p-6 text-center text-neutral-400 text-xs">
                      No submission timeline entries recorded yet.
                    </div>
                  ) : (
                    timelineEntries.map((item, idx) => {
                      const isSelected = activeProblem && activeProblem.id === item.problemId;
                      return (
                        <button
                          key={`${item.problemId}_${idx}`}
                          onClick={() => setSelectedProblemId(item.problemId)}
                          className={`w-full text-left p-3 text-xs transition-colors flex items-start justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-neutral-900 text-white'
                              : 'hover:bg-neutral-100/70 text-neutral-800'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className={`font-medium truncate ${isSelected ? 'text-white' : 'text-neutral-900'}`}>
                              {item.problemTitle}
                            </div>
                            <div className={`text-[10px] font-mono mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                              Level {item.level} · {new Date(item.passedAt).toLocaleString()}
                            </div>
                          </div>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-50 text-emerald-700 font-semibold'
                          }`}>
                            {item.passedCount}/{item.totalCount} passed
                          </span>
                        </button>
                      );
                    })
                  )
                )}
              </div>
            </div>

            {/* Right Pane: Code Viewer */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden min-h-0">
              {activeProblem ? (
                <>
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

                  <div className="flex-1 p-4 overflow-auto custom-scrollbar bg-[#0f1014] text-neutral-200">
                    <pre className="text-xs font-mono whitespace-pre-wrap leading-relaxed">
                      {currentCode}
                    </pre>
                  </div>

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

      {/* Confirmation: Reset Progress */}
      <ConfirmationModal
        isOpen={confirmResetOpen}
        title="Reset Student Progress"
        message={
          <div className="space-y-3">
            <p>
              Choose scope to reset for <span className="font-semibold text-neutral-900">{student.displayName}</span>:
            </p>
            <div className="space-y-1.5 pt-1">
              <label className="flex items-center gap-2 cursor-pointer bg-neutral-50 p-2 rounded-lg border border-neutral-200">
                <input
                  type="radio"
                  name="resetLevelChoice"
                  checked={resetLevelChoice === 'all'}
                  onChange={() => setResetLevelChoice('all')}
                  className="accent-neutral-900"
                />
                <span className="font-medium text-neutral-900">All Levels (Full Progress Reset)</span>
              </label>
              {[1, 2, 3].map(lvl => (
                <label key={lvl} className="flex items-center gap-2 cursor-pointer bg-neutral-50 p-2 rounded-lg border border-neutral-200">
                  <input
                    type="radio"
                    name="resetLevelChoice"
                    checked={resetLevelChoice === lvl}
                    onChange={() => setResetLevelChoice(lvl as 1 | 2 | 3)}
                    className="accent-neutral-900"
                  />
                  <span>Only Level {lvl} Problems & Submissions</span>
                </label>
              ))}
            </div>
            <p className="text-[11px] text-rose-600 font-medium">
              This will erase test results and clear saved solutions for the selected level(s).
            </p>
          </div>
        }
        confirmText="Confirm Reset"
        confirmVariant="danger"
        isProcessing={isProcessing}
        onConfirm={handleConfirmReset}
        onClose={() => setConfirmResetOpen(false)}
      />

      {/* Confirmation: Suspend / Reactivate */}
      <ConfirmationModal
        isOpen={confirmSuspendOpen}
        title={student.isSuspended ? 'Reactivate Student Access' : 'Suspend Student Account'}
        message={
          student.isSuspended ? (
            <div>
              Reactivating <span className="font-semibold text-neutral-900">{student.displayName}</span> will immediately restore their problem solving access.
            </div>
          ) : (
            <div>
              Temporarily suspend <span className="font-semibold text-neutral-900">{student.displayName}</span>?
              <p className="mt-1 text-neutral-500">
                The student's data and submissions will be preserved, but they will be blocked from accessing coding challenges upon sign in.
              </p>
            </div>
          )
        }
        confirmText={student.isSuspended ? 'Reactivate Student' : 'Suspend Student'}
        confirmVariant={student.isSuspended ? 'primary' : 'danger'}
        isProcessing={isProcessing}
        onConfirm={handleConfirmSuspend}
        onClose={() => setConfirmSuspendOpen(false)}
      />

      {/* Confirmation: Manual Level Unlock */}
      <ConfirmationModal
        isOpen={confirmUnlockOpen !== null}
        title={`Toggle Level ${confirmUnlockOpen} Unlock Override`}
        message={
          <div>
            Do you want to toggle the manual lock override for <span className="font-semibold text-neutral-900">Level {confirmUnlockOpen}</span> for {student.displayName}?
            <p className="mt-1 text-neutral-500">
              When manually unlocked, the student can access this level regardless of normal progressive unlock thresholds.
            </p>
          </div>
        }
        confirmText="Update Level Unlock"
        confirmVariant="primary"
        isProcessing={isProcessing}
        onConfirm={() => confirmUnlockOpen !== null && handleConfirmUnlock(confirmUnlockOpen)}
        onClose={() => setConfirmUnlockOpen(null)}
      />
    </>
  );
};
