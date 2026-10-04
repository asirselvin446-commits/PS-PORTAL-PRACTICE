import React from 'react';
import Editor, { useMonaco, OnMount } from '@monaco-editor/react';
import { setupMonacoCFeatures } from '../utils/monaco-c-features';

export interface EditorMarker {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
  message: string;
  severity: number;
}

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  markers?: EditorMarker[];
  onRun?: () => void;
  onSubmit?: () => void;
  disableCopyPaste?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  value, 
  onChange, 
  language = 'c', 
  onRun, 
  onSubmit, 
  markers = [],
  disableCopyPaste = false
}) => {
  const monaco = useMonaco();
  
  React.useEffect(() => {
    if (monaco) {
      setupMonacoCFeatures(monaco as any);
    }
  }, [monaco]);
  
  React.useEffect(() => {
    if (monaco) {
      const model = monaco.editor.getModels()[0];
      if (model) {
        monaco.editor.setModelMarkers(model, 'compiler', markers as any);
      }
    }
  }, [monaco, markers, value]);

  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    if (disableCopyPaste) {
      editor.onKeyDown((e) => {
        if ((e.ctrlKey || e.metaKey) && e.keyCode === monacoInstance.KeyCode.KeyV) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    }

    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter, () => {
      if (onRun) onRun();
    });
    
    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyMod.Shift | monacoInstance.KeyCode.Enter, () => {
      if (onSubmit) onSubmit();
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#111216]">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#17181f] border-b border-neutral-800/80 text-xs shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-neutral-200 font-medium">main.c</span>
          <span className="text-[11px] text-neutral-500 font-mono">· C99 Standard</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-neutral-500 font-mono">
          <span>Ctrl+Enter to Run</span>
          <span>·</span>
          <span>Ctrl+Shift+Enter to Submit</span>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={value}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          options={{
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 13.5,
            lineHeight: 22,
            fontFamily: '"JetBrains Mono", Consolas, Menlo, monospace',
            scrollBeyondLastLine: false,
            padding: { top: 14, bottom: 14 },
            formatOnPaste: true,
            formatOnType: true,
            tabSize: 4,
            bracketPairColorization: { enabled: true },
            autoIndent: 'full',
            lineNumbers: 'on',
            folding: true,
            wordWrap: 'on',
            cursorBlinking: 'smooth',
            renderLineHighlight: 'all',
            find: { addExtraSpaceOnTop: false }
          }}
        />
      </div>
    </div>
  );
};
