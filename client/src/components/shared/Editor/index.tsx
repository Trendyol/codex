import { FC } from 'react';
import MonacoEditor from '@monaco-editor/react';
import Spinner from '../Spinner';

type EditorProps = {};

const Editor: FC<EditorProps> = () => {
  return (
    <MonacoEditor
      className="flex flex-1 overflow-hidden rounded-xl border bg-white"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      loading={
        <div className="bg-white h-full w-full flex items-center justify-center">
          <Spinner />
        </div>
      }
    />
  );
};

export default Editor;
