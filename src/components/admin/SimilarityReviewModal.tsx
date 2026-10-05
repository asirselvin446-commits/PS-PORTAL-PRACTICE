import React, { useState, useMemo } from 'react';
import { Problem } from '../../data/problems';
import { StudentProfile, CodeSimilarityPair } from '../../types/admin';
import { 
  X, 
  ShieldAlert, 
  Search, 
  Sliders, 
  ExternalLink, 
  FileCode, 
  Check, 
  Copy,
  Users,
  AlertTriangle
} from 'lucide-react';
import { computeCodeSimilarity } from '../../utils/adminStore';

interface SimilarityReviewModalProps {
  isOpen: boolean;
  problems: Problem[];
  students: StudentProfile[];
  onClose: () => void;
}

export const SimilarityReviewModal: React.FC<SimilarityReviewModalProps> = ({
  isOpen,
  problems,
  students,
  onClose
}) => {
  const [threshold, setThreshold] = useState<number>(75);
  const [search, setSearch] = useState('');
  const [selectedPair, setSelectedPair] = useState<CodeSimilarityPair | null>(null);

  // Compute flagged pairs memoized on threshold
  const flaggedPairs = useMemo(() => {
    return computeCodeSimilarity(problems, students, threshold);
  }, [problems, students, threshold]);

  const filteredPairs = useMemo(() => {
    if (!search.trim()) return flaggedPairs;
    const q = search.toLowerCase();
    return flaggedPairs.filter(p => 
      p.problemTitle.toLowerCase().includes(q) ||
      p.studentA.name.toLowerCase().includes(q) ||
      p.studentA.roll.toLowerCase().includes(q) ||
      p.studentB.name.toLowerCase().includes(q) ||
      p.studentB.roll.toLowerCase().includes(q)
    );
  }, [flaggedPairs, search]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-sans animate-in fade-in">
        <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                <ShieldAlert size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-neutral-900">Academic Integrity & Code Similarity Audit</h3>
                <p className="text-[11px] text-neutral-500">
                  Cross-student code comparison algorithm identifying near-identical solutions for the same problem
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Controls Bar */}
          <div className="p-3.5 border-b border-neutral-100 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
            <div className="relative flex-1 max-w-sm">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Filter by student name, roll, or problem..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-neutral-600">
                <Sliders size={13} className="text-neutral-400" />
                <span className="text-[11px]">Threshold:</span>
                <select
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="bg-neutral-50 border border-neutral-200 rounded-lg px-2 py-1 text-xs text-neutral-800 font-mono focus:outline-none cursor-pointer"
                >
                  <option value={60}>≥ 60% Match</option>
                  <option value={70}>≥ 70% Match</option>
                  <option value={75}>≥ 75% Match (Standard)</option>
                  <option value={85}>≥ 85% Match (Strict)</option>
                  <option value={95}>≥ 95% Match (Exact / Near-Exact)</option>
                </select>
              </div>

              <span className="text-[11px] font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                {filteredPairs.length} flagged pairs
              </span>
            </div>
          </div>

          {/* Table / List */}
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 custom-scrollbar text-xs">
            {filteredPairs.length === 0 ? (
              <div className="py-16 text-center text-neutral-400 text-xs">
                <ShieldAlert size={32} className="mx-auto mb-2 text-neutral-300" />
                No similarity flags detected at the current {threshold}% threshold.
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-neutral-50 text-neutral-500 font-medium border-b border-neutral-200/80 text-[11px]">
                  <tr>
                    <th className="py-2.5 px-4">Problem</th>
                    <th className="py-2.5 px-4">Student A</th>
                    <th className="py-2.5 px-4">Student B</th>
                    <th className="py-2.5 px-4 text-center font-mono">Similarity</th>
                    <th className="py-2.5 px-4 text-right">Review Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-mono">
                  {filteredPairs.map((pair, idx) => (
                    <tr key={`${pair.problemId}_${pair.studentA.uid}_${pair.studentB.uid}_${idx}`} className="hover:bg-neutral-50/60 transition-colors">
                      
                      <td className="py-3 px-4 font-sans">
                        <div className="font-semibold text-neutral-900 text-xs truncate max-w-xs">
                          {pair.problemTitle}
                        </div>
                        <span className="text-[10px] text-neutral-500 font-mono">
                          Level {pair.problemLevel} · {pair.problemId}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-sans">
                        <div className="font-medium text-neutral-900">{pair.studentA.name}</div>
                        <div className="text-[10px] text-neutral-500 font-mono">{pair.studentA.roll}</div>
                        {pair.studentA.submittedAt && (
                          <div className="text-[9px] text-neutral-400 font-mono">
                            {new Date(pair.studentA.submittedAt).toLocaleDateString()}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 font-sans">
                        <div className="font-medium text-neutral-900">{pair.studentB.name}</div>
                        <div className="text-[10px] text-neutral-500 font-mono">{pair.studentB.roll}</div>
                        {pair.studentB.submittedAt && (
                          <div className="text-[9px] text-neutral-400 font-mono">
                            {new Date(pair.studentB.submittedAt).toLocaleDateString()}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                          pair.similarityScore >= 90
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : pair.similarityScore >= 80
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                        }`}>
                          {pair.similarityScore}% Match
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right font-sans">
                        <button
                          onClick={() => setSelectedPair(pair)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors cursor-pointer"
                        >
                          <FileCode size={12} className="text-neutral-600" />
                          <span>Compare Submissions</span>
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between text-xs text-neutral-500">
            <span>
              Evaluation matches C syntax patterns, variable structuring, and structural tokens.
            </span>
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              Close Audit
            </button>
          </div>

        </div>
      </div>

      {/* Side-by-Side Comparison Modal */}
      {selectedPair && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs font-sans animate-in fade-in">
          <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-5xl shadow-2xl flex flex-col h-[90vh] overflow-hidden">
            
            {/* Header */}
            <div className="px-5 py-3 border-b border-neutral-100 bg-neutral-50 flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-neutral-900">{selectedPair.problemTitle}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    selectedPair.similarityScore >= 90
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedPair.similarityScore}% Code Similarity
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  Side-by-side inspection between {selectedPair.studentA.name} and {selectedPair.studentB.name}
                </div>
              </div>

              <button
                onClick={() => setSelectedPair(null)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Side-by-side code editors */}
            <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 overflow-hidden">
              
              {/* Left: Student A */}
              <div className="flex flex-col bg-white overflow-hidden min-h-0">
                <div className="px-4 py-2 bg-neutral-100/70 border-b border-neutral-200 flex items-center justify-between shrink-0 text-xs">
                  <div>
                    <span className="font-semibold text-neutral-900">{selectedPair.studentA.name}</span>
                    <span className="text-[11px] text-neutral-500 font-mono ml-1.5">({selectedPair.studentA.roll})</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {selectedPair.studentA.submittedAt ? new Date(selectedPair.studentA.submittedAt).toLocaleString() : 'Submitted'}
                  </span>
                </div>
                <div className="flex-1 p-4 bg-[#0d0e12] overflow-auto custom-scrollbar">
                  <pre className="text-xs font-mono text-neutral-200 whitespace-pre-wrap leading-relaxed">
                    {selectedPair.studentA.code}
                  </pre>
                </div>
              </div>

              {/* Right: Student B */}
              <div className="flex flex-col bg-white overflow-hidden min-h-0">
                <div className="px-4 py-2 bg-neutral-100/70 border-b border-neutral-200 flex items-center justify-between shrink-0 text-xs">
                  <div>
                    <span className="font-semibold text-neutral-900">{selectedPair.studentB.name}</span>
                    <span className="text-[11px] text-neutral-500 font-mono ml-1.5">({selectedPair.studentB.roll})</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {selectedPair.studentB.submittedAt ? new Date(selectedPair.studentB.submittedAt).toLocaleString() : 'Submitted'}
                  </span>
                </div>
                <div className="flex-1 p-4 bg-[#0d0e12] overflow-auto custom-scrollbar">
                  <pre className="text-xs font-mono text-neutral-200 whitespace-pre-wrap leading-relaxed">
                    {selectedPair.studentB.code}
                  </pre>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between shrink-0 text-xs">
              <span className="text-neutral-500 text-[11px]">
                Language: C (C99 standard) · Evaluated against identical standard compiler options
              </span>
              <button
                onClick={() => setSelectedPair(null)}
                className="px-3 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100 border border-neutral-200 rounded-md transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
