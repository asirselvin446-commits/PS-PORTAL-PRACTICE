import React, { useState } from 'react';
import { TestResult, ExecutionResult } from '../utils/executor';
import { CheckCircle2, XCircle, Terminal, Loader2, AlertTriangle, Cpu, Clock, HardDrive, Info } from 'lucide-react';

interface ConsoleProps {
  results: TestResult[] | null;
  error: string | null;
  isRunning: boolean;
  isCustomRun: boolean;
  customOutput: ExecutionResult | null;
  customInput: string;
  setCustomInput: (val: string) => void;
}

export const Console: React.FC<ConsoleProps> = ({ results, error, isRunning, isCustomRun, customOutput, customInput, setCustomInput }) => {
  const renderExecutionDetails = (res: ExecutionResult) => {
    return (
      <div className="mt-4 border-t border-gray-800 pt-3 flex flex-wrap gap-4 text-xs">
        {res.time && (
          <div className="flex items-center gap-1.5 text-gray-400">
            <Clock size={14} className="text-blue-400" />
            Time: <span className="text-gray-300 font-medium">{res.time}s</span>
          </div>
        )}
        {res.memory !== undefined && (
          <div className="flex items-center gap-1.5 text-gray-400">
            <HardDrive size={14} className="text-blue-400" />
            Memory: <span className="text-gray-300 font-medium">{res.memory} KB</span>
          </div>
        )}
        {res.exit_code !== undefined && (
          <div className="flex items-center gap-1.5 text-gray-400">
            <Cpu size={14} className={res.exit_code === 0 ? "text-green-400" : "text-red-400"} />
            Exit Code: <span className={res.exit_code === 0 ? "text-green-400 font-medium" : "text-red-400 font-medium"}>{res.exit_code}</span>
          </div>
        )}
        {res.status && res.status !== 'Accepted' && (
          <div className="flex items-center gap-1.5 text-amber-400">
            <AlertTriangle size={14} />
            Status: <span className="font-medium">{res.status}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-t border-gray-800 text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-800 text-gray-300 text-xs font-semibold uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <Terminal size={14} />
          Console
        </div>
        <div className="text-gray-500 lowercase tracking-normal flex items-center gap-2">
          <span className="flex items-center gap-1"><Cpu size={12}/> GCC 9.2.0</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 font-mono text-gray-300 flex flex-col">
        {/* Custom Input Section */}
        {isCustomRun && (
          <div className="mb-4">
            <label className="block text-gray-500 mb-1 text-xs flex items-center justify-between">
              <span>Custom Input (stdin):</span>
            </label>
            <textarea
              className="w-full bg-[#0d0d0d] text-gray-300 border border-gray-700 rounded p-2 focus:outline-none focus:border-blue-500 min-h-[60px] text-xs resize-y"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Enter input here..."
            />
          </div>
        )}

        {isRunning ? (
          <div className="flex items-center gap-2 text-blue-400 py-4">
            <Loader2 size={16} className="animate-spin" />
            Executing code...
          </div>
        ) : error ? (
          <div className="text-red-400 whitespace-pre-wrap bg-red-950/20 p-3 rounded border border-red-900/50">{error}</div>
        ) : isCustomRun && customOutput ? (
          <div className="flex flex-col gap-3">
            {customOutput.compile_output && (
              <div>
                <span className="text-amber-500 text-xs mb-1 flex items-center gap-1"><Info size={12}/> Compiler Output:</span>
                <div className="bg-[#0d0d0d] p-3 rounded text-amber-200/80 whitespace-pre-wrap text-xs overflow-x-auto">
                  {customOutput.compile_output}
                </div>
              </div>
            )}
            
            {customOutput.stderr && (
              <div>
                <span className="text-red-500 text-xs mb-1 flex items-center gap-1"><AlertTriangle size={12}/> Standard Error (stderr):</span>
                <div className="bg-[#0d0d0d] p-3 rounded text-red-300 whitespace-pre-wrap text-xs overflow-x-auto">
                  {customOutput.stderr}
                </div>
              </div>
            )}

            <div>
              <span className="text-gray-500 text-xs mb-1 block">Standard Output (stdout):</span>
              <div className="bg-[#0d0d0d] p-3 rounded text-gray-300 whitespace-pre-wrap text-xs overflow-x-auto min-h-[40px]">
                {customOutput.output || <span className="text-gray-600 italic">No output</span>}
              </div>
            </div>

            {renderExecutionDetails(customOutput)}
          </div>
        ) : results ? (
          <div className="space-y-4">
            {results.map((result) => {
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
                    
                    {(result.time || result.memory !== undefined) && (
                      <div className="flex items-center gap-2 ml-2 text-xs text-gray-500">
                        {result.time && <span>{result.time}s</span>}
                        {result.memory !== undefined && <span>{result.memory} KB</span>}
                      </div>
                    )}

                    
                  </div>

                  {!result.hidden && (
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

                  {result.hidden && !result.passed && (
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
