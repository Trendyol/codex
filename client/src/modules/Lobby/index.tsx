import Countdown from '@components/shared/Countdown';
import { useChallenge, useLobby } from '@hooks/data';
import { User } from '@hooks/data/models/types';
import { useMe } from '@hooks/data/useMe';
import { disconnectSocket, joinLobby, sendMessage } from '@services/lobby';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import Chat from '../../components/shared/Chat';
import Dino from './components/Dino';
import Participants from './components/Participants';
import { Status } from '@models/enums';
import { DateTime } from 'luxon';
import Placement from '@components/shared/Placement';

type LobbyProps = {
  discussion?: boolean;
};

const Lobby: FC<LobbyProps> = ({ discussion }) => {
  const router = useRouter();
  const { challenge } = useChallenge(router.query.challenge as string);
  const { lobby } = useLobby(router.query.challenge as string);
  const { me } = useMe();

  const [activeParticipants, setActiveParticipants] = useState<User[]>([]);
  const [messages, setMessages] = useState<{ user: User; message: string; time: string }[]>([]);

  const lobbyId = discussion ? `${lobby?.id}/discussion` : lobby?.id;

  const handleNavigation = (status: Status) => {
    if (status === Status.ongoing && !discussion) router.push(`/room/${router.query.challenge}`);
  };

  useEffect(() => {
    if (challenge?.status === Status.ongoing && !discussion)
      router.push(`/room/${router.query.challenge}`);
  }, [challenge]);

  useEffect(() => {
    if (!lobby || !lobby.id || !me || !lobbyId) return;
    joinLobby(
      lobbyId,
      me.id,
      (activeParticipants) => setActiveParticipants(activeParticipants),
      (user, message, time) => setMessages((messages) => [...messages, { user, message, time }]),
      (status) => handleNavigation(status),
    );
  }, [lobby, me]);

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
    <div className="flex h-[calc(100vh-94px)] gap-6 pb-6">
      <div className="flex flex-1 gap-6 md:flex-col">
        <div className="flex flex-1 flex-col gap-6">
          {!discussion && <Participants activeParticipants={activeParticipants} />}
          <Chat
            className="h-full overflow-auto"
            messages={messages}
            sendMessage={(message) => sendMessage(me, lobbyId, message)}
          />
        </div>
        <div className="flex w-[320px] shrink-0 flex-col gap-6 md:hidden">
          <Countdown
            text={!discussion && 'Time to Challenge'}
            date={discussion ? countdownDate : challenge?.date}
          />
          {!discussion && <Dino />}
          {discussion && <Placement />}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
