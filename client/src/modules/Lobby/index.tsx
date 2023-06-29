import Countdown from '@components/shared/Countdown';
import { useChallenge, useLobby } from '@hooks/data';
import { User } from '@hooks/data/models/types';
import { useMe } from '@hooks/data/useMe';
import { disconnectSocket, joinLobby, sendMessage } from '@services/lobby';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import Chat from '../../components/shared/Chat';
import Participants from './components/Participants';
import { Status } from '@models/enums';
import { DateTime } from 'luxon';
import Placement from '@components/shared/Placement';
import { MessageEntry } from '@models/types';
import { useMountedState } from 'react-use';
import Connection from '@components/shared/Connection';
import WinnerPopup from '@modules/Lobby/components/Congrats';

type LobbyProps = {
  discussion?: boolean;
};

const Lobby: FC<LobbyProps> = ({ discussion }) => {
  const router = useRouter();
  const mounted = useMountedState();
  const { challenge } = useChallenge(router.query.challenge as string);
  const { lobby } = useLobby(router.query.challenge as string);
  const { me } = useMe();

  const [activeParticipants, setActiveParticipants] = useState<User[]>([]);
  const [messages, setMessages] = useState<MessageEntry[]>([]);

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
      (user, message, timestamp) =>
        setMessages((messages) => [...messages, { user, message, timestamp }]),
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
    <div className="flex h-[calc(100vh-94px)] gap-4 pb-6">
      <div className="flex flex-1 gap-4 md:flex-col">
        <div className="flex flex-1 flex-col gap-4">
          {!discussion && <Participants activeParticipants={activeParticipants} />}
          <Chat
            className="h-full overflow-auto"
            messages={messages}
            sendMessage={(message) => sendMessage(me, lobbyId, message)}
          />
        </div>
        <div className="flex w-[320px] shrink-0 flex-col gap-4 md:hidden">
          <Countdown
            text={!discussion && 'Time to Challenge'}
            date={discussion ? countdownDate : challenge?.date}
          />
          {!discussion && (
            <>
              <Connection />
              {/* {mounted() && <Dino />} */}
            </>
          )}
          {discussion && (
            <>
              <Placement limit={60} />
              <WinnerPopup />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
