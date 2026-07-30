import React, { useState } from 'react';
import { TestResult } from '../utils/executor';
import { CheckCircle2, XCircle, EyeOff, Eye, Terminal, Loader2 } from 'lucide-react';

interface ConsoleProps {
  results: TestResult[] | null;
  error: string | null;
  isRunning: boolean;
  isCustomRun: boolean;
  customOutput: string | null;
  customInput: string;
  setCustomInput: (val: string) => void;
}

export const Console: React.FC<ConsoleProps> = ({ results, error, isRunning, isCustomRun, customOutput, customInput, setCustomInput }) => {
  const [revealedTests, setRevealedTests] = useState<Set<number>>(new Set());

  const toggleReveal = (index: number) => {
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

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-t border-gray-800 text-sm">
      <div className="flex items-center px-4 py-2 bg-[#2d2d2d] border-b border-gray-800 text-gray-300 text-xs font-semibold uppercase tracking-wider gap-2">
        <Terminal size={14} />
        Console
      </div>
      
      <div className="flex-1 overflow-auto p-4 font-mono text-gray-300 flex flex-col">
        {/* Custom Input Section */}
        {isCustomRun && (
          <div className="mb-4">
            <label className="block text-gray-500 mb-1 text-xs">Custom Input (stdin):</label>
            <textarea
              className="w-full bg-[#0d0d0d] text-gray-300 border border-gray-700 rounded p-2 focus:outline-none focus:border-blue-500 min-h-[80px]"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Enter input here..."
            />
          </div>
        )}

        {isRunning ? (
          <div className="flex items-center gap-2 text-blue-400">
            <Loader2 size={16} className="animate-spin" />
            Executing code...
          </div>
        ) : error ? (
          <div className="text-red-400 whitespace-pre-wrap">{error}</div>
        ) : isCustomRun && customOutput !== null ? (
          <div>
             <span className="text-gray-500 text-xs mb-1 block">Output:</span>
             <div className="bg-[#0d0d0d] p-3 rounded text-gray-300 whitespace-pre-wrap">
               {customOutput || <span className="text-gray-600 italic">No output</span>}
             </div>
          </div>
        ) : results ? (
          <div className="space-y-4">
            {results.map((result) => {
              const isRevealed = revealedTests.has(result.index);
              
              return (
                <div
                  key={result.index}
                  className={`p-3 rounded border ${
                    result.passed ? 'bg-green-950/20 border-green-900/50' : 'bg-red-950/20 border-red-900/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {result.passed ? (
                      <CheckCircle2 size={16} className="text-green-500" />
                    ) : (
                      <XCircle size={16} className="text-red-500" />
                    )}
                    <span className={`font-semibold ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                      Test Case {result.index + 1}
                    </span>
                    {result.hidden && (
                      <button 
                        onClick={() => toggleReveal(result.index)}
                        className="flex items-center gap-1 text-xs text-gray-400 bg-gray-800 hover:bg-gray-700 transition-colors px-2 py-0.5 rounded-full ml-auto cursor-pointer"
                        title={isRevealed ? "Hide test case" : "Reveal test case"}
                      >
                        {isRevealed ? <Eye size={12} /> : <EyeOff size={12} />}
                        {isRevealed ? 'Revealed' : 'Hidden Test'}
                      </button>
                    )}
                  </div>

                  {(!result.hidden || isRevealed) && (
                    <div className="space-y-2 text-xs mt-3">
                      <div>
                        <span className="text-gray-500">Input:</span>
                        <div className="bg-[#0d0d0d] p-1.5 rounded mt-0.5 whitespace-pre-wrap text-gray-300">
                          {result.input}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Expected Output:</span>
                        <div className="bg-[#0d0d0d] p-1.5 rounded mt-0.5 text-green-300 whitespace-pre-wrap">
                          {result.expected}
                        </div>
                      </div>
                      {!result.passed && (
                        <div>
                          <span className="text-gray-500">Actual Output:</span>
                          <div className="bg-[#0d0d0d] p-1.5 rounded mt-0.5 text-red-300 whitespace-pre-wrap">
                            {result.error ? <span className="text-red-500">{result.error}</span> : result.actual}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {result.hidden && !isRevealed && !result.passed && (
                    <div className="mt-2 text-xs text-red-400 bg-[#0d0d0d] p-1.5 rounded">
                      Hidden test case failed. Check your logic.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-500 italic">Run your code to see the test results here.</div>
        )}
      </div>
    </div>
  );
};
