import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string | React.ReactNode;
  confirmText?: string;
  confirmVariant?: 'danger' | 'warning' | 'primary';
  requireTextMatch?: string; // Optional confirmation phrase user must type (e.g., "DELETE")
  isProcessing?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  confirmVariant = 'danger',
  requireTextMatch,
  isProcessing = false,
  onConfirm,
  onClose
}) => {
  const [typedInput, setTypedInput] = useState('');
  const [internalProcessing, setInternalProcessing] = useState(false);

  // The modal stays mounted across confirmation sessions, so clear the typed
  // confirmation phrase every time it opens — otherwise a previously typed
  // "DELETE" would pre-enable the confirm button on the next use.
  useEffect(() => {
    if (isOpen) {
      setTypedInput('');
      setInternalProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const busy = isProcessing || internalProcessing;
  const isConfirmDisabled = requireTextMatch ? typedInput.trim() !== requireTextMatch : false;

  const handleConfirm = async () => {
    if (isConfirmDisabled || busy) return;
    setInternalProcessing(true);
    try {
      await onConfirm();
    } catch (err) {
      console.error('Confirmation action error:', err);
    } finally {
      setInternalProcessing(false);
    }
  };

  const getConfirmButtonClasses = () => {
    if (confirmVariant === 'danger') {
      return 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs';
    }
    if (confirmVariant === 'warning') {
      return 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs';
    }
    return 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs';
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-sans animate-in fade-in">
      <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg ${
              confirmVariant === 'danger' ? 'bg-rose-50 text-rose-600' :
              confirmVariant === 'warning' ? 'bg-amber-50 text-amber-600' :
              'bg-neutral-100 text-neutral-700'
            }`}>
              <AlertTriangle size={16} />
            </div>
            <h3 className="font-semibold text-sm text-neutral-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 cursor-pointer disabled:opacity-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3 text-xs leading-relaxed text-neutral-600">
          <div>{message}</div>

          {requireTextMatch && (
            <div className="mt-3 pt-3 border-t border-neutral-100 space-y-1.5">
              <label className="text-[11px] font-medium text-neutral-700 block">
                Type <span className="font-mono font-bold text-rose-600 select-all">{requireTextMatch}</span> to confirm:
              </label>
              <input
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder={requireTextMatch}
                disabled={busy}
                className="w-full px-3 py-1.5 text-xs font-mono bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            disabled={busy}
            className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirmDisabled || busy}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 ${getConfirmButtonClasses()}`}
          >
            {busy && <div className="w-3 h-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />}
            <span>{confirmText}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
