import React, { useState } from 'react';
import { Problem } from '../../data/problems';
import { X, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

interface RequestDeveloperModalProps {
  problem: Problem;
  onClose: () => void;
  onSubmitted: (message: string) => void;
}

export const RequestDeveloperModal: React.FC<RequestDeveloperModalProps> = ({
  problem,
  onClose,
  onSubmitted
}) => {
  const [requestType, setRequestType] = useState('add_hidden_tests');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const publicCount = problem.testCases.filter(t => !t.hidden).length;
  const hiddenCount = problem.testCases.filter(t => t.hidden).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const existingReqs = JSON.parse(localStorage.getItem('fxec_developer_requests') || '[]');
      const newReq = {
        id: `req_${Date.now()}`,
        problemId: problem.id,
        problemTitle: problem.title,
        problemLevel: problem.level,
        requestType,
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      existingReqs.push(newReq);
      localStorage.setItem('fxec_developer_requests', JSON.stringify(existingReqs));

      onSubmitted(`Request sent to developer for "${problem.title}".`);
      onClose();
    } catch {
      onSubmitted(`Request noted for "${problem.title}".`);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-sans">
      <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 bg-neutral-50/60">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">
              Request Developer to Update Test Cases
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Level {problem.level} · {problem.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {/* Current Test Case Status */}
          <div className="bg-neutral-50 border border-neutral-200/80 rounded-lg p-3 flex items-center justify-between text-xs">
            <span className="text-neutral-600">Current Test Case Suite:</span>
            <span className="font-mono text-neutral-900 font-medium">
              {publicCount} Public · {hiddenCount} Hidden ({problem.testCases.length} total)
            </span>
          </div>

          {/* Request Type Selector */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              What update do you need from the developer?
            </label>
            <div className="space-y-2">
              {[
                { id: 'add_hidden_tests', label: 'Add 2–3 more hidden test cases (for lab evaluation integrity)' },
                { id: 'edge_cases', label: 'Add boundary & edge cases (zero, negative, large array size)' },
                { id: 'strict_formatting', label: 'Adjust expected output whitespace / newline formatting' },
                { id: 'new_problem_spec', label: 'Revise problem constraints or function signature' }
              ].map(opt => (
                <label
                  key={opt.id}
                  onClick={() => setRequestType(opt.id)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                    requestType === opt.id
                      ? 'border-neutral-900 bg-neutral-50 font-medium text-neutral-900'
                      : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="requestType"
                    checked={requestType === opt.id}
                    onChange={() => setRequestType(opt.id)}
                    className="accent-neutral-900"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional details */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              Faculty Instructions / Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Include test cases with large numbers (n=1000) or check if student uses loops correctly."
              className="w-full px-3 py-2 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 font-sans resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium transition-colors shadow-2xs cursor-pointer disabled:opacity-60"
            >
              <Send size={12} />
              <span>{isSubmitting ? 'Submitting...' : 'Send Request to Developer'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
