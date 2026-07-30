import { Monaco } from '@monaco-editor/react';

export const setupMonacoCFeatures = (monaco: Monaco) => {
  const languageId = 'c';

  // Bracket Matching, Auto Closing Pairs, Surrounding Pairs
  monaco.languages.setLanguageConfiguration(languageId, {
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"', notIn: ['string'] },
      { open: '\'', close: '\'', notIn: ['string', 'comment'] },
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: '\'', close: '\'' },
    ],
    folding: {
      markers: {
        start: new RegExp('^\\s*#pragma\\s+region\\b'),
        end: new RegExp('^\\s*#pragma\\s+endregion\\b')
      }
    }
  });

  // Completion Provider
  monaco.languages.registerCompletionItemProvider(languageId, {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      
      const suggestions = [
        {
          label: 'printf',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'printf',
          detail: 'Print formatted data to stdout',
          range
        },
        {
          label: 'scanf',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'scanf',
          detail: 'Read formatted data from stdin',
          range
        },
        {
          label: '#include <stdio.h>',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: '#include <stdio.h>\n',
          detail: 'Standard input/output library',
          range
        },
        {
          label: 'main',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'int main(int argc, char *argv[]) {\n\t${1}\n\treturn 0;\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: 'Main function',
          range
        }
      ];
      return { suggestions } as any;
    }
  });

  // Hover Provider
  monaco.languages.registerHoverProvider(languageId, {
    provideHover: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (word && word.word === 'printf') {
        return {
          range: new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn),
          contents: [
            { value: '**printf**' },
            { value: '`int printf(const char *format, ...)`\n\nPrints formatted output to the standard output stream.' }
          ]
        };
      }
      return null;
    }
  });

  // Signature Help Provider
  monaco.languages.registerSignatureHelpProvider(languageId, {
    signatureHelpTriggerCharacters: ['(', ','],
    provideSignatureHelp: (model, position) => {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      });

      if (textUntilPosition.includes('printf(')) {
        return {
          value: {
            activeParameter: textUntilPosition.split(',').length - 1,
            activeSignature: 0,
            signatures: [{
              label: 'int printf(const char *format, ...)',
              documentation: 'Prints formatted output to stdout.',
              parameters: [
                { label: 'const char *format', documentation: 'Format string' },
                { label: '...', documentation: 'Additional arguments' }
              ]
            }]
          },
          dispose: () => {}
        };
      }
      return null;
    }
  });

  // Inline Completion Provider (Stub)
  monaco.languages.registerInlineCompletionsProvider(languageId, {
    provideInlineCompletions: (model, position) => {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      });
      
      if (textUntilPosition.endsWith('for (int i = 0; ')) {
        return {
          items: [{
            insertText: 'i < count; i++) {\n\n}'
          }]
        };
      }
      return { items: [] };
    },
    freeInlineCompletions: () => {}
  });

  // Code Action Provider
  monaco.languages.registerCodeActionProvider(languageId, {
    provideCodeActions: (model, range, context) => {
      const actions = [];
      if (context.markers.length > 0) {
        actions.push({
          title: 'Fix issue',
          diagnostics: context.markers,
          kind: 'quickfix',
          edit: {
            edits: [{
              resource: model.uri,
              textEdit: {
                range: context.markers[0],
                text: '// fixed'
              },
              versionId: model.getVersionId()
            }]
          }
        });
      }
      return { actions, dispose: () => {} } as any;
    }
  });

  // Formatting Provider
  monaco.languages.registerDocumentFormattingEditProvider(languageId, {
    provideDocumentFormattingEdits: (model) => {
      // Very basic formatting stub
      const text = model.getValue();
      const formatted = text.replace(/{\s+/g, '{\n    ').replace(/;\s+/g, ';\n');
      return [{
        range: model.getFullModelRange(),
        text: formatted
      }];
    }
  });

  // Semantic Tokens Provider
  const legend = {
    tokenTypes: ['type', 'function', 'variable'],
    tokenModifiers: ['declaration', 'documentation']
  };
  monaco.languages.registerDocumentSemanticTokensProvider(languageId, {
    getLegend: () => legend,
    provideDocumentSemanticTokens: (model) => {
      const data: number[] = [];
      const lines = model.getLinesContent();
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(/\b(int|char|void)\b/g);
        if (match) {
          let startIndex = 0;
          for (const m of match) {
            const index = line.indexOf(m, startIndex);
            // deltaLine, deltaStart, length, tokenType, tokenModifiers
            data.push(i, index, m.length, 0, 0); 
            startIndex = index + m.length;
          }
        }
      }
      return { data: new Uint32Array(data) };
    },
    releaseDocumentSemanticTokens: () => {}
  });

  // Document Symbols Provider
  monaco.languages.registerDocumentSymbolProvider(languageId, {
    provideDocumentSymbols: (model) => {
      const symbols = [];
      const lines = model.getLinesContent();
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(/(int|void|char)\s+([a-zA-Z0-9_]+)\s*\(/);
        if (match) {
          symbols.push({
            name: match[2],
            detail: match[1],
            kind: monaco.languages.SymbolKind.Function,
            range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
            selectionRange: new monaco.Range(i + 1, match.index! + match[1].length + 1, i + 1, match.index! + match[1].length + 1 + match[2].length),
            tags: []
          });
        }
      }
      return symbols as any;
    }
  });

  // Folding Range Provider
  monaco.languages.registerFoldingRangeProvider(languageId, {
    provideFoldingRanges: (model) => {
      const ranges = [];
      const lines = model.getLinesContent();
      const stack = [];
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('{')) stack.push(i + 1);
        if (lines[i].includes('}') && stack.length > 0) {
          const start = stack.pop()!;
          if (i + 1 > start) {
            ranges.push({ start: start, end: i + 1, kind: monaco.languages.FoldingRangeKind.Region });
          }
        }
      }
      return ranges as any;
    }
  });
};
