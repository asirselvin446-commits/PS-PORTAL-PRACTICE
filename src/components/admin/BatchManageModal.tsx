import React, { useState } from 'react';
import { Batch, StudentProfile } from '../../types/admin';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  Users, 
  FolderCheck,
  AlertCircle
} from 'lucide-react';
import { createBatch, renameBatch, deleteBatch } from '../../utils/adminStore';
import { ConfirmationModal } from './ConfirmationModal';

interface BatchManageModalProps {
  isOpen: boolean;
  batches: Batch[];
  students: StudentProfile[];
  onClose: () => void;
  onRefresh: () => void;
}

export const BatchManageModal: React.FC<BatchManageModalProps> = ({
  isOpen,
  batches,
  students,
  onClose,
  onRefresh
}) => {
  const [newBatchName, setNewBatchName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingBatchId, setEditingBatchId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Confirmation state for deleting a batch
  const [batchToDelete, setBatchToDelete] = useState<string | null>(null);

  if (!isOpen) return null;

  // Compute student count per batch
  const studentCountMap = new Map<string, number>();
  students.forEach(s => {
    if (s.batch) {
      studentCountMap.set(s.batch, (studentCountMap.get(s.batch) || 0) + 1);
    }
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatchName.trim()) return;
    setError(null);
    setIsSubmitting(true);
    try {
      await createBatch(newBatchName.trim());
      setNewBatchName('');
      onRefresh();
    } catch (err: any) {
      setError(err?.message || 'Failed to create batch');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartRename = (batch: Batch) => {
    setEditingBatchId(batch.id);
    setEditingName(batch.name);
    setError(null);
  };

  const handleSaveRename = async (oldName: string) => {
    if (!editingName.trim() || editingName.trim() === oldName) {
      setEditingBatchId(null);
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await renameBatch(oldName, editingName.trim());
      setEditingBatchId(null);
      onRefresh();
    } catch (err: any) {
      setError(err?.message || 'Failed to rename batch');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!batchToDelete) return;
    setIsSubmitting(true);
    try {
      await deleteBatch(batchToDelete);
      setBatchToDelete(null);
      onRefresh();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete batch');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-sans animate-in fade-in">
        <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
          
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-neutral-100 text-neutral-700">
                <FolderCheck size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-neutral-900">Academic Batches & Sections</h3>
                <p className="text-[11px] text-neutral-500">Organize student rosters into cohorts for filtering and reporting</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Form to Create */}
          <form onSubmit={handleCreate} className="p-4 border-b border-neutral-100 bg-neutral-50/30 flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. Batch 2024-2028 or CSE Section A"
              value={newBatchName}
              onChange={(e) => setNewBatchName(e.target.value)}
              disabled={isSubmitting}
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 placeholder-neutral-400"
            />
            <button
              type="submit"
              disabled={!newBatchName.trim() || isSubmitting}
              className="px-3 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus size={13} />
              <span>Add Batch</span>
            </button>
          </form>

          {error && (
            <div className="mx-4 mt-3 p-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Batches List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-neutral-100 custom-scrollbar">
            {batches.length === 0 ? (
              <div className="text-center py-8 text-neutral-400 text-xs">
                No batches created yet. Add one above.
              </div>
            ) : (
              batches.map(batch => {
                const count = studentCountMap.get(batch.name) || 0;
                const isEditing = editingBatchId === batch.id;

                return (
                  <div key={batch.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    {isEditing ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="flex-1 px-2.5 py-1 text-xs bg-white border border-neutral-300 rounded-md focus:outline-none focus:border-neutral-900"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveRename(batch.name)}
                          disabled={isSubmitting}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md cursor-pointer"
                          title="Save changes"
                        >
                          <Check size={14} />
                        </button>
                        <button
                          onClick={() => setEditingBatchId(null)}
                          className="p-1.5 text-neutral-400 hover:bg-neutral-100 rounded-md cursor-pointer"
                          title="Cancel"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="min-w-0">
                          <div className="font-medium text-neutral-900 truncate">{batch.name}</div>
                          <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 mt-0.5 font-mono">
                            <Users size={11} className="text-neutral-400" />
                            <span>{count} enrolled students</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleStartRename(batch)}
                            className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
                            title="Rename batch"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => setBatchToDelete(batch.name)}
                            className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                            title="Delete batch"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-neutral-100 bg-neutral-50/50 flex justify-end">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>

      {/* Delete Batch Confirmation */}
      <ConfirmationModal
        isOpen={Boolean(batchToDelete)}
        title="Delete Academic Batch"
        message={
          <div>
            Are you sure you want to delete <span className="font-semibold text-neutral-900">"{batchToDelete}"</span>?
            <p className="mt-1 text-neutral-500">
              Students currently assigned to this batch will remain registered but marked as unassigned.
            </p>
          </div>
        }
        confirmText="Delete Batch"
        confirmVariant="danger"
        isProcessing={isSubmitting}
        onConfirm={handleConfirmDelete}
        onClose={() => setBatchToDelete(null)}
      />
    </>
  );
};
