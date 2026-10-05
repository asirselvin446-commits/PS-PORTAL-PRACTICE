import React, { useState } from 'react';
import { Batch } from '../../types/admin';
import { X, UserPlus, AlertCircle } from 'lucide-react';
import { addManualStudent, validateCollegeEmail } from '../../utils/adminStore';

interface AddStudentModalProps {
  isOpen: boolean;
  batches: Batch[];
  onClose: () => void;
  onSuccess: () => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  batches,
  onClose,
  onSuccess
}) => {
  const [displayName, setDisplayName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [batch, setBatch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError('Institutional email address is required.');
      return;
    }
    if (!validateCollegeEmail(cleanEmail)) {
      setError('Email must belong to Francis Xavier Engineering College (@francisxavier.ac.in).');
      return;
    }
    if (!displayName.trim() || !rollNumber.trim()) {
      setError('Student Name and Roll Number are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addManualStudent({
        displayName: displayName.trim(),
        rollNumber: rollNumber.trim().toUpperCase(),
        email: cleanEmail,
        department,
        batch: batch.trim() || undefined
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to add student');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-sans animate-in fade-in">
      <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-neutral-100 text-neutral-700">
              <UserPlus size={16} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-neutral-900">Add Single Student</h3>
              <p className="text-[11px] text-neutral-500">Register individual student profile to Firestore</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="font-medium text-neutral-700 block mb-1">Full Student Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Vignesh Sundar"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-neutral-900 placeholder-neutral-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-neutral-700 block mb-1">Roll Number *</label>
              <input
                type="text"
                required
                placeholder="e.g. 22CS110"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full px-3 py-1.5 font-mono uppercase bg-white border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-neutral-900 placeholder-neutral-400"
              />
            </div>

            <div>
              <label className="font-medium text-neutral-700 block mb-1">Batch / Cohort</label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-neutral-900 cursor-pointer"
              >
                <option value="">Unassigned</option>
                {batches.map(b => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="font-medium text-neutral-700 block mb-1">Institutional Email *</label>
            <input
              type="email"
              required
              placeholder="student.name@francisxavier.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1.5 font-mono bg-white border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-neutral-900 placeholder-neutral-400"
            />
            <span className="text-[10px] text-neutral-400 mt-1 block">
              Must end with @francisxavier.ac.in
            </span>
          </div>

          <div>
            <label className="font-medium text-neutral-700 block mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-neutral-900 cursor-pointer"
            >
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
              <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
              <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
            </select>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3.5 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:opacity-40 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {isSubmitting && <div className="w-3 h-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />}
              <span>Save to Firestore</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
