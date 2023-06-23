import Chat from '@components/shared/Chat';
import Countdown from '@components/shared/Countdown';
import Description from '@components/shared/Description';
import Submissions from '@components/shared/Submissions';
import TabsGroup from '@components/shared/TabsGroup';
import { useChallenge, useRoom } from '@hooks/data';
import { User } from '@hooks/data/models/types';
import { useDefaultCode } from '@hooks/data/useDefaultCode';
import { useMe } from '@hooks/data/useMe';
import { Language } from '@models/enums';
import { disconnectSocket } from '@services/lobby';
import { joinRoom, sendMessage } from '@services/room';
import { decodeBase64 } from '@utils/converter';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Submission from './components/Submission';
import Video from './components/Video';
import { Action } from './models/types';
import { MessageEntry } from '@models/types';

const Editor = dynamic(() => import('@components/shared/Editor'), { ssr: false });

const Room = () => {
  const { push, query, isReady } = useRouter();
  const [messages, setMessages] = useState<MessageEntry[]>([]);
  const [notes, setNotes] = useState<MessageEntry[]>([]);
  const [code, setCode] = useState<string>();
  const [action, setAction] = useState<Action>();
  const { me } = useMe();
  const { challenge } = useChallenge(query.challenge as string, isReady);
  const { room } = useRoom(query.challenge as string, isReady);
  const { defaultCode } = useDefaultCode(challenge?.problem.id, 3, !!challenge?.problem.id);

  const handleLobbyNavigation = () => push(`/lobby/${query.challenge}/discussion`);

  const handleCodeChange = (code?: string) => setCode(code);

  useEffect(() => {
    if (!room || !me) return;

    joinRoom(
      room.team.id,
      (user, message, timestamp) =>
        setMessages((messages) => [...messages, { user, message, timestamp }]),
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

  if (!me) return <></>;

  return (
    <div className="flex h-[calc(100vh-94px)] gap-4 pb-6">
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
      <div className="flex flex-1 flex-col gap-4">
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
      <div className="flex h-full w-[320px] shrink-0 flex-col gap-4 md:hidden">
        <Countdown date={countdownDate} onComplete={handleLobbyNavigation} />
        <TabsGroup tabs={['Video', 'Chat', 'Note']}>
          <Video />
          <Chat
            className="flex flex-1 overflow-auto rounded-none border-none"
            sendMessage={(message) => sendMessage(me, room?.team.id, message)}
            messages={messages}
          />
          <Chat
            className="flex flex-1 overflow-auto rounded-none border-none"
            sendMessage={(message) =>
              setNotes((notes) => [
                ...notes,
                { user: me as User, message, timestamp: DateTime.now().toISO() },
              ])
            }
            messages={notes}
          />
        </TabsGroup>
      </div>
    </div>
  );
};

export default Room;
