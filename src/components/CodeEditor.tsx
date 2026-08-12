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
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, language = 'c', onRun, onSubmit, markers = [] }) => {
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
    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter, () => {
      if (onRun) onRun();
    });
    
    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyMod.Shift | monacoInstance.KeyCode.Enter, () => {
      if (onSubmit) onSubmit();
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-gray-800">
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-800 text-gray-300 text-xs font-semibold uppercase tracking-wider">
        <span>main.c</span>
        <div className="flex items-center gap-4 text-[10px] text-gray-500 lowercase tracking-normal">
          <span>ctrl+enter: run</span>
          <span>ctrl+shift+enter: submit</span>
          <span>ctrl+/: comment</span>
        </div>
      </div>
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
            minimap: { enabled: true },
            fontSize: 14,
            fontFamily: '"Fira Code", "JetBrains Mono", Consolas, monospace',
            scrollBeyondLastLine: false,
            padding: { top: 16 },
            formatOnPaste: true,
            formatOnType: true,
            tabSize: 4,
            bracketPairColorization: { enabled: true },
            autoIndent: 'full',
            lineNumbers: 'on',
            folding: true,
            wordWrap: 'on',
            find: { addExtraSpaceOnTop: false }
          }}
        />
      </div>
    </div>
  );
};
