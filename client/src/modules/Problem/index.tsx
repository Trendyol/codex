import Chat from '@components/shared/Chat';
import Description from '@components/shared/Description';
import Editor from '@components/shared/Editor';
import Submission from '@components/shared/Submission';
import TabsGroup from '@components/shared/TabsGroup';
import { useProblem } from '@hooks/data';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Problem = () => {
  const router = useRouter();
  const [notes, setNotes] = useState<{ message: string }[]>([]);
  const { problem } = useProblem(router.query.problem as string);

  return (
    <div className="flex h-[calc(100vh-94px)] gap-6 pb-6">
      <div className="h-full w-[350px] overflow-auto">
        {problem && (
          <Description
            title={problem.title}
            content={problem.content}
            difficulty={problem.difficulty}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-6">
        <Editor />
        <Submission />
      </div>
      <div className="flex h-full w-[320px] shrink-0 flex-col gap-6 md:hidden">
        <TabsGroup tabs={['Note']}>
          <Chat
            className="flex flex-1 overflow-auto rounded-none border-none"
            sendMessage={(message) => setNotes((notes) => [...notes, { message }])}
            messages={notes}
          />
        </TabsGroup>
      </div>
    </div>
  );
};

export default Problem;
