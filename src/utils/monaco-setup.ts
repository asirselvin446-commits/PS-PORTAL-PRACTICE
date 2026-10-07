// Monaco is bundled locally instead of being fetched from the jsdelivr CDN
// at runtime (the @monaco-editor/react default). The CDN fetch left the
// editor stuck on "Loading..." forever in any network that can't reach it,
// with no fallback and no error. With the local instance configured below,
// the editor never makes a network request.
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/editor/editor.worker?worker';

(self as any).MonacoEnvironment = {
  getWorker: () => new editorWorker(),
};

loader.config({ monaco });
