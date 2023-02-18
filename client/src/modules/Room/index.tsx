import Chat from '@components/shared/Chat';
import Countdown from '@components/shared/Countdown';
import Description from '@components/shared/Description';
import Editor from '@components/shared/Editor';
import Submission from '@components/shared/Submission';
import TabsGroup from '@components/shared/TabsGroup';
import { useChallenge, useRoom } from '@hooks/data';
import { User } from '@hooks/data/models/types';
import { useMe } from '@hooks/data/useMe';
import { joinRoom, sendMessage } from '@services/room';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Room = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<{ user: User; message: string }[]>([]);
  const [notes, setNotes] = useState<{ user: User; message: string }[]>([]);
  const { challenge } = useChallenge(router.query.challenge as string);
  const { room } = useRoom(router.query.challenge as string);
  const { me } = useMe();

  useEffect(() => {
    if (!room || !me) return;

    joinRoom(room.team.id, (user, message) =>
      setMessages((messages) => [...messages, { user, message }]),
    );
  }, [room, me]);

  return (
    <div className="flex h-[calc(100vh-94px)] gap-6 pb-6">
      <div className="h-full w-[350px] overflow-auto">
        {challenge?.problem && (
          <Description
            title={challenge?.problem.title}
            content={challenge?.problem.content}
            difficulty={challenge?.problem.difficulty}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-6">
        <Editor />
        <Submission />
      </div>
      <div className="flex h-full w-[320px] shrink-0 flex-col gap-6 md:hidden">
        <Countdown date={challenge?.date} />

        <TabsGroup tabs={['Video', 'Chat', 'Note']}>
          <div>Video</div>

          <Chat
            className="flex flex-1 overflow-auto rounded-none border-none"
            sendMessage={(message) => sendMessage(room?.team.id, message)}
            messages={messages}
          />
          <Chat
            className="flex flex-1 overflow-auto rounded-none border-none"
            sendMessage={(message) =>
              setNotes((notes) => [...notes, { user: me as User, message }])
            }
            messages={notes}
          />
        </TabsGroup>
      </div>
    </div>
  );
};

export default Room;
