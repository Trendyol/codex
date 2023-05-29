import Chat from '@components/shared/Chat';
import Description from '@components/shared/Description';
import Submissions from '@components/shared/Submissions';
import TabsGroup from '@components/shared/TabsGroup';
import { useMe, useProblem } from '@hooks/data';
import { useDefaultCode } from '@hooks/data/useDefaultCode';
import { Language } from '@models/enums';
import Submission from '@modules/Problem/components/Submission';
import { decodeBase64 } from '@utils/converter';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Editor = dynamic(() => import('@components/shared/Editor'), { ssr: false });

const Problem = () => {
  const [notes, setNotes] = useState<{ message: string }[]>([]);
  const [code, setCode] = useState<string>();

  const { query, isReady } = useRouter();
  const { problem } = useProblem(query.problem as string, isReady);
  const { defaultCode } = useDefaultCode(problem?.id, 3, !!problem?.id);

  const { me } = useMe();

  const handleCodeChange = (code?: string) => setCode(code);

  return (
    <div className="flex h-[calc(100vh-94px)] gap-6 pb-6">
      <div className="h-full w-[320px] overflow-auto">
        {problem && (
          <TabsGroup tabs={['Description', 'Submissions']} className="h-full">
            <Description
              title={problem.title}
              content={problem.content}
              difficulty={problem.difficulty}
            />
            <Submissions problemId={problem.id} />
          </TabsGroup>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-6">
        {defaultCode && (
          <Editor
            roomId={`${me?.id}-${problem?.id}`}
            onChange={handleCodeChange}
            defaultValue={decodeBase64(defaultCode)}
          />
        )}
        {problem && (
          <Submission problemId={problem.id} code={code} language={Language.javascript} />
        )}
      </div>
      <div className="flex h-full w-[320px] shrink-0 flex-col gap-6 md:hidden">
        <TabsGroup tabs={['Note']}>
          <Chat
            className="flex flex-1 overflow-auto rounded-none border-none"
            sendMessage={(message) => setNotes((notes) => [...notes, { user: me, message }])}
            messages={notes}
          />
        </TabsGroup>
      </div>
    </div>
  );
};

export default Problem;
