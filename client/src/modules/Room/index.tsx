import Chat from '@components/shared/Chat';
import Countdown from '@components/shared/Countdown';
import Description from '@components/shared/Description';
import TabsGroup from '@components/shared/TabsGroup';
import { useChallenge, useRoom } from '@hooks/data';
import { User } from '@hooks/data/models/types';
import { useMe } from '@hooks/data/useMe';
import { Language } from '@models/enums';
import { joinRoom, sendMessage } from '@services/room';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Submission from './components/Submission';
import Video from './components/Video';
import { Action } from './models/types';
import { DateTime } from 'luxon';
import { disconnectSocket } from '@services/lobby';
import { useDefaultCode } from '@hooks/data/useDefaultCode';
import { decodeBase64 } from '@utils/converter';
import Editor from '@components/shared/Editor';
import Submissions from '@components/shared/Submissions';

const Room = () => {
  const { push, query, isReady } = useRouter();
  const [messages, setMessages] = useState<{ user: User; message: string }[]>([]);
  const [notes, setNotes] = useState<{ user: User; message: string }[]>([]);
  const { challenge } = useChallenge(query.challenge as string, isReady);
  const { room } = useRoom(query.challenge as string, isReady);
  const { defaultCode } = useDefaultCode(challenge?.problem.id, 3, !!challenge?.problem.id);
  const { me } = useMe();
  const [action, setAction] = useState<Action>();
  const [code, setCode] = useState<string>();

  const handleDashboardNavigation = () => {
    push('/');
  };

  const handleCodeChange = (code?: string) => {
    setCode(code);
  };

  useEffect(() => {
    if (!room || !me) return;

    joinRoom(
      room.team.id,
      (user, message) => setMessages((messages) => [...messages, { user, message }]),
      (_, key, data) => setAction({ key, data }),
    );
  }, [room, me]);

  useEffect(() => {
    return () => disconnectSocket();
  }, []);

  const countdownDate = useMemo(
    () =>
      challenge?.date &&
      DateTime.fromISO(challenge.date).plus({ minutes: challenge.duration }).toString(),
    [challenge?.date, challenge?.duration],
  );

  return (
    <div className="flex h-[calc(100vh-94px)] gap-6 pb-6">
      <div className="h-full w-[320px] overflow-auto">
        {challenge?.problem && room?.team && (
          <TabsGroup tabs={['Description', 'Submissions']} className="h-full">
            <Description
              title={challenge?.problem.title}
              content={challenge?.problem.content}
              difficulty={challenge?.problem.difficulty}
            />
            <Submissions problemId={challenge?.problem.id} teamId={room?.team.id} />
          </TabsGroup>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-6">
        {room?.team.id && defaultCode && (
          <Editor
            roomId={room?.team.id}
            onChange={handleCodeChange}
            defaultValue={decodeBase64(defaultCode)}
          />
        )}
        {challenge?.problem && room?.team && (
          <Submission
            action={action}
            problemId={challenge?.problem.id}
            challengeId={challenge?.id}
            teamId={room?.team.id}
            code={code}
            language={Language.javascript}
          />
        )}
      </div>
      <div className="flex h-full w-[320px] shrink-0 flex-col gap-6 md:hidden">
        <Countdown date={countdownDate} onComplete={handleDashboardNavigation} />
        <TabsGroup tabs={['Video', 'Chat', 'Note']}>
          <Video />
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
