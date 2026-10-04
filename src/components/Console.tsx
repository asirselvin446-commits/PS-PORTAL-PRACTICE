import React, { useState } from 'react';
import { TestResult, ExecutionResult } from '../utils/executor';
import { CheckCircle2, XCircle, Eye, EyeOff, Terminal, Loader2, AlertCircle, Lock } from 'lucide-react';
import { HiddenTestVisibilityMode } from '../types/admin';

interface ConsoleProps {
  results: TestResult[] | null;
  error: string | null;
  isRunning: boolean;
  isCustomRun: boolean;
  customOutput: ExecutionResult | null;
  customInput: string;
  setCustomInput: (val: string) => void;
  hiddenTestVisibility?: HiddenTestVisibilityMode;
}

export const Console: React.FC<ConsoleProps> = ({ 
  results, 
  error, 
  isRunning, 
  isCustomRun, 
  customOutput, 
  customInput, 
  setCustomInput,
  hiddenTestVisibility = 'allow_reveal'
}) => {
  const [revealedTests, setRevealedTests] = useState<Set<number>>(new Set());

  const toggleReveal = (index: number) => {
    if (hiddenTestVisibility === 'strictly_hidden') return;
    setRevealedTests((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const renderExecutionDetails = (res: ExecutionResult) => {
    return (
      <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex items-center gap-3 text-xs text-neutral-400 font-mono">
        {res.time && <span>Time: {res.time}s</span>}
        {res.memory !== undefined && <span>· Memory: {res.memory} KB</span>}
        {res.exit_code !== undefined && (
          <span className={res.exit_code === 0 ? "text-emerald-400" : "text-rose-400"}>
            · Exit: {res.exit_code}
          </span>
        )}
        {res.status && res.status !== 'Accepted' && (
          <span className="text-amber-400">· {res.status}</span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#111216] border-t border-neutral-800/80 text-sm">
      {/* Console Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#17181f] border-b border-neutral-800/70 text-xs shrink-0">
        <div className="flex items-center gap-2 text-neutral-300 font-medium">
          <Terminal size={13} className="text-neutral-400" />
          <span>Console & Evaluation</span>
        </div>
        <div className="text-[11px] text-neutral-400 font-mono">
          GCC 9.2.0 · C99
        </div>
      </div>
      
      {/* Console Body */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar text-neutral-300 font-mono text-xs">
        {/* Custom Input View */}
        {isCustomRun && (
          <div className="mb-4">
            <label className="block text-neutral-400 text-xs mb-1 font-sans">
              Custom Stdin Input:
            </label>
            <textarea
              className="w-full bg-[#0c0d11] text-neutral-200 border border-neutral-800 rounded-lg p-2.5 focus:outline-none focus:border-neutral-600 min-h-[56px] text-xs resize-y"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Enter custom standard input..."
            />
          </div>
        )}

        {isRunning ? (
          <div className="flex items-center gap-2.5 text-neutral-400 py-6 justify-center">
            <Loader2 size={16} className="animate-spin text-neutral-300" />
            <span className="font-sans text-xs">Compiling & executing code...</span>
          </div>
        ) : error ? (
          <div className="text-rose-300 whitespace-pre-wrap bg-rose-950/20 p-3 rounded-lg border border-rose-900/40 text-xs leading-relaxed">
            {error}
          </div>
        ) : isCustomRun && customOutput ? (
          <div className="space-y-3">
            {customOutput.compile_output && (
              <div>
                <span className="text-amber-400 text-[11px] block mb-1 font-sans">Compiler Output:</span>
                <div className="bg-[#0c0d11] p-3 rounded-lg text-amber-200/90 whitespace-pre-wrap border border-amber-900/30 overflow-x-auto">
                  {customOutput.compile_output}
                </div>
              </div>
            )}
            
            {customOutput.stderr && (
              <div>
                <span className="text-rose-400 text-[11px] block mb-1 font-sans">Standard Error:</span>
                <div className="bg-[#0c0d11] p-3 rounded-lg text-rose-300 whitespace-pre-wrap border border-rose-900/30 overflow-x-auto">
                  {customOutput.stderr}
                </div>
              </div>
            )}

            <div>
              <span className="text-neutral-400 text-[11px] block mb-1 font-sans">Program Output (stdout):</span>
              <div className="bg-[#0c0d11] p-3 rounded-lg text-neutral-200 whitespace-pre-wrap border border-neutral-800/80 overflow-x-auto min-h-[44px]">
                {customOutput.output || <span className="text-neutral-600 italic">No output</span>}
              </div>
            </div>

            {renderExecutionDetails(customOutput)}
          </div>
        ) : results ? (
          <div className="space-y-2.5">
            {results.map((result) => {
              const isRevealed = revealedTests.has(result.index);
              
              return (
                <div
                  key={result.index}
                  className={`p-3 rounded-lg border transition-colors ${
                    result.passed 
                      ? 'bg-emerald-950/10 border-emerald-900/30' 
                      : 'bg-rose-950/10 border-rose-900/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {result.passed ? (
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle size={15} className="text-rose-400 shrink-0" />
                      )}
                      <span className={`font-semibold text-xs font-sans ${result.passed ? 'text-emerald-300' : 'text-rose-300'}`}>
                        Test Case {result.index + 1}
                      </span>
                      
                      <span className="text-[11px] text-neutral-500 font-mono">
                        {result.passed ? 'Passed' : 'Failed'}
                        {result.time && ` · ${result.time}s`}
                      </span>
                    </div>

                    {result.hidden && (
                      hiddenTestVisibility === 'strictly_hidden' ? (
                        <span className="flex items-center gap-1 text-[11px] text-neutral-400 font-mono px-2 py-0.5 rounded border border-neutral-800 bg-neutral-900/50">
                          <Lock size={10} className="text-amber-400" />
                          <span>Concealed</span>
                        </span>
                      ) : hiddenTestVisibility === 'always_visible' ? (
                        <span className="text-[11px] text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-900/50 bg-emerald-950/30">
                          Disclosed
                        </span>
                      ) : (
                        <button 
                          onClick={() => toggleReveal(result.index)}
                          className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer px-2 py-0.5 rounded border border-neutral-700/60 bg-neutral-800/40"
                        >
                          {isRevealed ? <EyeOff size={11} /> : <Eye size={11} />}
                          <span>{isRevealed ? 'Hide' : 'Reveal'}</span>
                        </button>
                      )
                    )}
                  </div>

                  {(!result.hidden || hiddenTestVisibility === 'always_visible' || (hiddenTestVisibility === 'allow_reveal' && isRevealed)) && (
                    <div className="space-y-2 text-[11px] mt-2.5 pt-2 border-t border-neutral-800/40">
                      <div>
                        <span className="text-neutral-500">Input:</span>
                        <div className="bg-[#0c0d11] p-2 rounded mt-0.5 whitespace-pre-wrap text-neutral-300 border border-neutral-800/60">
                          {result.input}
                        </div>
                      </div>
                      <div>
                        <span className="text-neutral-500">Expected Output:</span>
                        <div className="bg-[#0c0d11] p-2 rounded mt-0.5 text-emerald-300 whitespace-pre-wrap border border-neutral-800/60">
                          {result.expected}
                        </div>
                      </div>
                      {!result.passed && (
                        <div>
                          <span className="text-neutral-500">Actual Output:</span>
                          <div className="bg-[#0c0d11] p-2 rounded mt-0.5 text-rose-300 whitespace-pre-wrap border border-rose-950/60">
                            {result.error ? result.error : result.actual}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {result.hidden && hiddenTestVisibility !== 'always_visible' && (!isRevealed || hiddenTestVisibility === 'strictly_hidden') && !result.passed && (
                    <div className="mt-2 text-[11px] text-neutral-400 italic">
                      {hiddenTestVisibility === 'strictly_hidden'
                        ? 'Hidden test case failed. Details are kept secret during this session.'
                        : 'Hidden test case failed. Verify edge cases and loops.'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-neutral-500 text-xs py-8 text-center font-sans">
            Ready to evaluate. Click "Run" to test with custom input or "Submit" to run against all test cases.
          </div>
        )}
      </div>
    </div>
  );
};
