import { FC } from 'react';
import MonacoEditor from '@monaco-editor/react';
import Spinner from '@components/shared/Spinner';
import { MonacoController } from '@utils/monaco/monaco.service';
import { editor } from 'monaco-editor';

type EditorProps = {
  roomId: string;
  onChange?: (value?: string) => void;
  defaultValue?: string;
};

const Editor: FC<EditorProps> = ({ roomId, onChange, defaultValue }) => {
  const initializeEditor = (editor: editor.IStandaloneCodeEditor) => {
    const editorValue = editor.getValue();
    if (!editorValue && defaultValue) editor.setValue(defaultValue);
  };

  return (
    <MonacoEditor
      className="flex flex-1 overflow-hidden rounded-xl border bg-white"
      defaultLanguage="javascript"
      onChange={onChange}
      onMount={async (editor, monaco) =>
        await MonacoController.init(monaco, editor, roomId, () => initializeEditor(editor))
      }
      loading={
        <div className="flex h-full w-full items-center justify-center bg-white">
          <Spinner />
        </div>
      }
    />
  );
};

export default Editor;
