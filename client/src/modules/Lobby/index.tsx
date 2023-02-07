import Countdown from '@components/shared/Countdown';
import Card from '@components/ui/Card';
import { useChallenge, useLobby } from '@hooks/data';
import { User } from '@hooks/data/models/types';
import { useMe } from '@hooks/data/useMe';
import { joinLobby, sendMessage } from '@services/lobby';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Chat from '../../components/shared/Chat';
import Dino from './components/Dino';
import Participants from './components/Participants';

const Lobby = () => {
  const router = useRouter();
  const { challenge } = useChallenge(router.query.challenge as string);
  const { lobby } = useLobby(router.query.challenge as string);
  const { me } = useMe();

  const [activeParticipants, setActiveParticipants] = useState<User[]>([]);
  const [messages, setMessages] = useState<{ user: User; message: string }[]>([]);

  const handleRoomNavigation = () => {
    router.push(`/room/${router.query.challenge}`);
  };

  useEffect(() => {
    if (!lobby || !lobby.id || !me) return;

    joinLobby(
      lobby.id,
      me.id,
      (activeParticipants) => setActiveParticipants(activeParticipants),
      (user, message) => setMessages((messages) => [...messages, { user, message }]),
      () => handleRoomNavigation(),
    );
  }, [lobby, me]);

  return (
    <div className="flex h-[calc(100vh-94px)] gap-6 pb-6">
      <div className="flex flex-1 gap-6 md:flex-col">
        <div className="flex flex-1 flex-col gap-6">
          <Participants activeParticipants={activeParticipants} />
          <Chat className="flex-1" messages={messages} sendMessage={sendMessage} />
        </div>
        <div className="flex w-[320px] shrink-0 flex-col gap-6 md:hidden">
          <Countdown text={'Time to Challenge'} date={challenge?.date} />
          <Dino />
        </div>
      </div>
    </div>
  );
};

export default Lobby;
