import { FC } from 'react';
import MonacoEditor from '@monaco-editor/react';
import Spinner from '@components/shared/Spinner';
import { MonacoController } from '@utils/monaco/monaco.service';

type EditorProps = {
  roomId?: string;
};

const Editor: FC<EditorProps> = ({ roomId }) => {
  return (
    <MonacoEditor
      className="flex flex-1 overflow-hidden rounded-xl border bg-white"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      onMount={async (editor, monaco) => {
        if (roomId) await MonacoController.init(monaco, editor, roomId);
      }}
      loading={
        <div className="flex h-full w-full items-center justify-center bg-white">
          <Spinner />
        </div>
      }
    />
  );
};

export default Editor;
