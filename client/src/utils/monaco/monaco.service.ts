import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from './compiled/y-monaco';
import { editor } from 'monaco-editor';
import { Monaco } from '@monaco-editor/react';

export class MonacoController {
  yDoc: Y.Doc;
  provider: WebsocketProvider;
  monacoBinding!: import('y-monaco').MonacoBinding;
  private constructor(
    public monaco: Monaco,
    public editor: editor.IStandaloneCodeEditor,
    public roomId: string
  ) {
    this.yDoc = new Y.Doc();
    this.provider = new WebsocketProvider(
      'ws://localhost:3004',
      this.roomId,
      this.yDoc
    );

    this.monacoBinding = new MonacoBinding(
      this.monaco,
      this.yDoc.getText('monaco'),
      this.editor.getModel()!,
      new Set([this.editor]),
      this.provider.awareness
    );

    this.provider.shouldConnect && this.provider.connect();
  }

  private static instance: MonacoController;
  static async init(
    monaco: Monaco,
    editorDiv: editor.IStandaloneCodeEditor,
    roomId: string
  ) {
    if (MonacoController.instance) return;
    if (!window.MonacoEnvironment) window.MonacoEnvironment = {};
    window.MonacoEnvironment.getWorkerUrl = (
      _moduleId: string,
      label: string
    ) => {
      if (label === 'json') return '/_next/static/json.worker.js';
      if (label === 'css') return '/_next/static/css.worker.js';
      if (label === 'html') return '/_next/static/html.worker.js';
      if (label === 'typescript' || label === 'javascript')
        return '/_next/static/ts.worker.js';
      return '/_next/static/editor.worker.js';
    };
    MonacoController.instance = new MonacoController(monaco, editorDiv, roomId);
  }
  static getInstance() {
    if (MonacoController.instance) {
      return MonacoController.instance;
    }
    throw new Error('Cannot get uninitialized MonacoController!');
  }
}
