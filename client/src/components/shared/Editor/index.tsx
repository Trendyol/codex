import { FC, useContext, useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import Spinner from '@components/shared/Spinner';
import { MonacoController } from '@utils/monaco/monaco.service';
import { editor } from 'monaco-editor';
import { ThemeContext } from '@contexts/ThemeContext';
import Reset from '../Reset';

type EditorProps = {
  roomId: string;
  onChange?: (value?: string) => void;
  defaultValue?: string;
};

const Editor: FC<EditorProps> = ({ roomId, onChange, defaultValue }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const { theme } = useContext(ThemeContext);

  const initializeEditor = (editor: editor.IStandaloneCodeEditor) => {
    const editorValue = editor.getValue();
    if (!editorValue && defaultValue) editor.setValue(defaultValue);
  };

  useEffect(() => {
    return () => MonacoController.dispose();
  }, []);

  const editorTheme = theme === 'light' ? 'vs' : 'dark';

  const darkTheme: editor.IStandaloneThemeData = {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#0E1116',
    },
  };

  const reset = () => {
    editorRef.current?.setValue(defaultValue || '');
    onChange?.(defaultValue || '');
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>{/*TODO: Language Select*/}</div>
        <Reset onReset={reset} />
      </div>
      <MonacoEditor
        className="flex flex-1 overflow-hidden rounded-lg border border-border bg-white"
        defaultLanguage="javascript"
        theme={editorTheme}
        onChange={onChange}
        onMount={async (editor, monaco) => {
          monaco.editor.defineTheme('dark', darkTheme);
          monaco.editor.setTheme(editorTheme);
          await MonacoController.init(monaco, editor, roomId, () => initializeEditor(editor));
          editorRef.current = editor;
        }}
        loading={
          <div className="flex h-full w-full items-center justify-center bg-white">
            <Spinner />
          </div>
        }
      />
    </>
  );
};

export default Editor;
