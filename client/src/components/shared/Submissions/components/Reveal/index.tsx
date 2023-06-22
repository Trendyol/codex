import Popup from '@components/ui/Popup';
import { Submission } from '@hooks/data/models/types';
import { SubmissionStatus } from '@models/enums';
import { cn } from '@utils/common';
import { decodeBase64 } from '@utils/converter';
import { DateTime } from 'luxon';
import { FC, useContext, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import MonacoEditor from '@monaco-editor/react';
import Spinner from '@components/shared/Spinner';
import { ThemeContext } from '@contexts/ThemeContext';
import { editor } from 'monaco-editor';

type RevealProps = {
  submission?: Submission;
  onHide: () => void;
};

const Reveal: FC<RevealProps> = ({ submission, onHide }) => {
  const { code, memory, date, runtime, status } = submission || {};
  const accepted = status == SubmissionStatus.Accepted;

  const decodedCode = decodeBase64(code);
  const { theme } = useContext(ThemeContext);

  const copyCode = () => {
    toast.success('Code copied to clipboard');

    navigator.clipboard.writeText(decodedCode);
  };

  const editorTheme = theme === 'light' ? 'vs' : 'dark';

  const darkTheme: editor.IStandaloneThemeData = {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#0E1116',
    },
  };
  return (
    <Popup
      title="Submission"
      show
      onHide={onHide}
      footer={
        <div>
          <div className={cn('text-md flex')}>
            <div className={cn(accepted ? 'text-success' : 'text-error')}>
              {accepted ? 'Accepted' : 'Wrong Answer'}
            </div>
            <div className={'ml-2 cursor-pointer hover:text-secondary-200'} onClick={copyCode}>
              <FaRegCopy size={18} />
            </div>
          </div>
          <div className="mt-0.5 text-xs text-secondary-200">
            {date && DateTime.fromISO(date).toFormat('dd LLL yyyy')} • {runtime} ms • {memory} KB
          </div>
        </div>
      }
    >
      <div className="relative whitespace-pre-wrap">
        <MonacoEditor
          className="flex flex-1 overflow-hidden rounded-lg border border-border bg-white"
          defaultLanguage="javascript"
          value={decodedCode}
          options={{
            readOnly: true,
          }}
          onMount={async (editor, monaco) => {
            monaco.editor.defineTheme('dark', darkTheme);
            monaco.editor.setTheme(editorTheme);
          }}
          height={300}
          loading={
            <div className="flex h-full w-full items-center justify-center bg-white">
              <Spinner />
            </div>
          }
        />
      </div>
    </Popup>
  );
};

export default Reveal;
