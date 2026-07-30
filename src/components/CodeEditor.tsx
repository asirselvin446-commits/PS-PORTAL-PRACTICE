import React from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { setupMonacoCFeatures } from '../utils/monaco-c-features';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, language = 'c' }) => {
  const monaco = useMonaco();
  
  React.useEffect(() => {
    if (monaco) {
      setupMonacoCFeatures(monaco as any);
    }
  }, [monaco]);

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-gray-800">
      <div className="flex items-center px-4 py-2 bg-[#2d2d2d] border-b border-gray-800 text-gray-300 text-xs font-semibold uppercase tracking-wider">
        main.c
      </div>
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={value}
          onChange={(val) => onChange(val || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: '"Fira Code", "JetBrains Mono", Consolas, monospace',
            scrollBeyondLastLine: false,
            padding: { top: 16 },
            formatOnPaste: true,
            tabSize: 4,
          }}
        />
      </div>
    </div>
  );
};
