import { FC } from 'react';
import MonacoEditor from '@monaco-editor/react';
import Spinner from '@components/shared/Spinner';

type EditorProps = {};

const Editor: FC<EditorProps> = () => {
  return (
    <MonacoEditor
      className="flex flex-1 overflow-hidden rounded-xl border bg-white"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      loading={
        <div className="flex h-full w-full items-center justify-center bg-white">
          <Spinner />
        </div>
      }
    />
  );
};

export default Editor;
