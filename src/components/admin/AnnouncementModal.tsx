import React, { useState, useEffect } from 'react';
import { Announcement, StudentProfile, Batch } from '../../types/admin';
import { 
  X, 
  Megaphone, 
  Trash2, 
  Send, 
  Users, 
  CheckCircle2, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { createAnnouncement, deleteAnnouncement } from '../../utils/adminStore';

interface AnnouncementModalProps {
  isOpen: boolean;
  announcements: Announcement[];
  students: StudentProfile[];
  batches: Batch[];
  initialTargetUids?: string[];
  currentUserEmail?: string;
  onClose: () => void;
  onRefresh: () => void;
}

export const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  isOpen,
  announcements,
  students,
  batches,
  initialTargetUids,
  currentUserEmail,
  onClose,
  onRefresh
}) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetType, setTargetType] = useState<'all' | 'selected' | 'batch'>(
    initialTargetUids && initialTargetUids.length > 0 ? 'selected' : 'all'
  );
  const [selectedBatch, setSelectedBatch] = useState<string>(batches[0]?.name || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // The modal stays mounted while closed, so re-sync the audience every time it
  // opens — otherwise a Broadcast Notice to selected students would silently go
  // to everyone (stale 'all' target from a previous open).
  useEffect(() => {
    if (isOpen) {
      setTargetType(initialTargetUids && initialTargetUids.length > 0 ? 'selected' : 'all');
      setError(null);
    }
  }, [isOpen, initialTargetUids]);

  if (!isOpen) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      setError('Please provide both an announcement title and message.');
      return;
    }

    let targets: string[] | undefined = undefined;
    if (targetType === 'selected') {
      targets = initialTargetUids;
    } else if (targetType === 'batch') {
      targets = students.filter(s => s.batch === selectedBatch).map(s => s.uid);
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await createAnnouncement(title.trim(), message.trim(), targets, currentUserEmail);
      setTitle('');
      setMessage('');
      onRefresh();
    } catch (err: any) {
      setError(err?.message || 'Failed to publish announcement');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAnnouncement(id);
      onRefresh();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete announcement');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-sans animate-in fade-in">
      <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-neutral-100 text-neutral-700">
              <Megaphone size={16} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-neutral-900">Broadcast Announcements</h3>
              <p className="text-[11px] text-neutral-500">Publish notices to student dashboards across devices</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar text-xs">
          
          {/* Create Form */}
          <form onSubmit={handleCreate} className="space-y-3 bg-neutral-50/50 p-4 border border-neutral-200/80 rounded-xl">
            <div className="font-semibold text-xs text-neutral-900 flex items-center gap-1.5">
              <span>Compose Announcement</span>
            </div>

            {error && (
              <div className="p-2 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="font-medium text-neutral-700 block mb-1">Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mandatory Lab Practice Session Tomorrow"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 placeholder-neutral-400"
              />
            </div>

            <div>
              <label className="font-medium text-neutral-700 block mb-1">Message Content *</label>
              <textarea
                rows={3}
                required
                placeholder="Enter details of announcement displayed to students in dismissible banner..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 placeholder-neutral-400 text-xs"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="font-medium text-neutral-700 block mb-1.5">Audience Target</label>
              <div className="flex flex-wrap items-center gap-2">
                <label className="flex items-center gap-1.5 cursor-pointer bg-white px-2.5 py-1 rounded-md border border-neutral-200">
                  <input
                    type="radio"
                    name="targetType"
                    checked={targetType === 'all'}
                    onChange={() => setTargetType('all')}
                    className="accent-neutral-900"
                  />
                  <span>All Students</span>
                </label>

                {initialTargetUids && initialTargetUids.length > 0 && (
                  <label className="flex items-center gap-1.5 cursor-pointer bg-white px-2.5 py-1 rounded-md border border-neutral-200">
                    <input
                      type="radio"
                      name="targetType"
                      checked={targetType === 'selected'}
                      onChange={() => setTargetType('selected')}
                      className="accent-neutral-900"
                    />
                    <span>Selected ({initialTargetUids.length} students)</span>
                  </label>
                )}

                {batches.length > 0 && (
                  <label className="flex items-center gap-1.5 cursor-pointer bg-white px-2.5 py-1 rounded-md border border-neutral-200">
                    <input
                      type="radio"
                      name="targetType"
                      checked={targetType === 'batch'}
                      onChange={() => setTargetType('batch')}
                      className="accent-neutral-900"
                    />
                    <span>Target Batch:</span>
                    <select
                      value={selectedBatch}
                      onChange={(e) => {
                        setSelectedBatch(e.target.value);
                        setTargetType('batch');
                      }}
                      className="text-xs bg-transparent border-0 focus:outline-none font-medium cursor-pointer"
                    >
                      {batches.map(b => (
                        <option key={b.id} value={b.name}>{b.name}</option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !title.trim() || !message.trim()}
                className="px-3.5 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:opacity-40 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <div className="w-3 h-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                ) : (
                  <Send size={12} />
                )}
                <span>Broadcast Notice</span>
              </button>
            </div>
          </form>

          {/* Active Announcements List */}
          <div>
            <div className="font-semibold text-xs text-neutral-900 mb-2 flex items-center justify-between">
              <span>Published Announcements ({announcements.length})</span>
            </div>

            {announcements.length === 0 ? (
              <div className="text-center py-6 text-neutral-400 bg-neutral-50/50 rounded-lg border border-dashed border-neutral-200 text-xs">
                No active announcements published. Compose one above.
              </div>
            ) : (
              <div className="space-y-2.5">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-3 bg-white border border-neutral-200 rounded-lg space-y-1 relative group">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-neutral-900 text-xs">{ann.title}</div>
                      <button
                        onClick={() => handleDelete(ann.id)}
                        className="p-1 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer shrink-0"
                        title="Delete announcement"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <p className="text-xs text-neutral-600 whitespace-pre-wrap leading-relaxed">
                      {ann.message}
                    </p>

                    <div className="pt-1.5 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                      <span>
                        Audience: {ann.targetUids ? `${ann.targetUids.length} specific students` : 'All Students'}
                      </span>
                      <span>{new Date(ann.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

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
  );
};
