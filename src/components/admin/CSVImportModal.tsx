import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle, 
  Download,
  Check,
  FileText
} from 'lucide-react';
import { importStudentsFromCSV, validateCollegeEmail } from '../../utils/adminStore';

interface CSVImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CSVImportModal: React.FC<CSVImportModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [csvContent, setCsvContent] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    successCount: number;
    errors: string[];
  } | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvContent(text || '');
    };
    reader.readAsText(file);
  };

  const handleDownloadSample = () => {
    const sample = `Name,Roll Number,Email,Department,Batch
Aravind S,22CS001,aravind.s@francisxavier.ac.in,Computer Science & Engineering,Batch 2022-2026
Pooja K,22IT014,pooja.k@francisxavier.ac.in,Information Technology,Batch 2022-2026
Muthu Vignesh,23AI005,muthu.vignesh@francisxavier.ac.in,Artificial Intelligence & Data Science,Batch 2023-2027`;
    const blob = new Blob([sample], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fxec_students_sample_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = async () => {
    if (!csvContent.trim()) return;
    setIsProcessing(true);
    setResult(null);

    try {
      const res = await importStudentsFromCSV(csvContent);
      setResult({
        successCount: res.successCount,
        errors: res.errors
      });
      if (res.successCount > 0) {
        onSuccess();
      }
    } catch (err: any) {
      setResult({
        successCount: 0,
        errors: [err?.message || 'Failed to process CSV file']
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-sans animate-in fade-in">
      <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-neutral-100 text-neutral-700">
              <FileSpreadsheet size={16} />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-neutral-900">Import Students from CSV</h3>
              <p className="text-[11px] text-neutral-500">Bulk register students with institutional email validation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 custom-scrollbar text-xs">
          
          {/* Sample template banner */}
          <div className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200/80 rounded-lg">
            <div>
              <div className="font-medium text-neutral-900">Required CSV Columns</div>
              <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                Name, Roll Number, Email, Department, Batch
              </div>
            </div>
            <button
              onClick={handleDownloadSample}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-md transition-colors cursor-pointer"
            >
              <Download size={12} />
              <span>Sample CSV</span>
            </button>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-neutral-200 hover:border-neutral-300 rounded-xl p-5 text-center bg-neutral-50/40 transition-colors">
            <input
              type="file"
              id="csvFileInput"
              accept=".csv,text/csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="csvFileInput" className="cursor-pointer flex flex-col items-center gap-2">
              <Upload size={22} className="text-neutral-400" />
              <div>
                <span className="font-semibold text-neutral-900">Click to select CSV</span>
                <span className="text-neutral-500 text-[11px] block mt-0.5">
                  {fileName ? `Selected: ${fileName}` : 'Supports UTF-8 CSV exports from Google Sheets or Excel'}
                </span>
              </div>
            </label>
          </div>

          {/* Or Paste Area */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-medium text-neutral-700">Or Paste CSV Data Directly</label>
              {csvContent && (
                <span className="text-[11px] text-neutral-500 font-mono">
                  {csvContent.split('\n').filter(Boolean).length} lines
                </span>
              )}
            </div>
            <textarea
              rows={4}
              value={csvContent}
              onChange={(e) => {
                setCsvContent(e.target.value);
                setResult(null);
              }}
              placeholder={`Name,Roll Number,Email,Department,Batch\nJohn Doe,22CS099,john.doe@francisxavier.ac.in,Computer Science & Engineering,Batch 2022-2026`}
              className="w-full p-2.5 font-mono text-[11px] bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 placeholder-neutral-400"
            />
          </div>

          {/* Result Summary */}
          {result && (
            <div className={`p-3.5 rounded-lg border text-xs space-y-2 ${
              result.successCount > 0 ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <div className="flex items-center gap-2 font-semibold">
                {result.successCount > 0 ? <CheckCircle2 size={15} className="text-emerald-600" /> : <AlertTriangle size={15} className="text-rose-600" />}
                <span>Import Completed: {result.successCount} student(s) added successfully</span>
              </div>

              {result.errors.length > 0 && (
                <div className="mt-2 pt-2 border-t border-neutral-200/60 text-[11px] space-y-1">
                  <div className="font-semibold text-neutral-700">Exceptions / Warnings ({result.errors.length}):</div>
                  <ul className="list-disc pl-4 space-y-0.5 max-h-32 overflow-y-auto custom-scrollbar font-mono text-neutral-600">
                    {result.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
          <div className="text-[11px] text-neutral-500 font-mono">
            College domain: @francisxavier.ac.in
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              {result && result.successCount > 0 ? 'Done' : 'Cancel'}
            </button>
            <button
              onClick={handleImport}
              disabled={!csvContent.trim() || isProcessing}
              className="px-3.5 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 disabled:opacity-40 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {isProcessing && <div className="w-3 h-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />}
              <span>Import Students</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
