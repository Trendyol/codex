import { useChallenge, useLobby } from '@hooks/data';
import { User } from '@hooks/data/models/types';
import { useMe } from '@hooks/data/useMe';
import { joinLobby, sendMessage } from '@services/lobby';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Chat from '../../components/shared/Chat';
import Countdown from './components/Countdown';
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
    <div>
      <div className="text-2xl text-primary-400 mb-6">{challenge?.name || 'Challenge'}</div>
      <div className="flex gap-6 flex-1">
        <div className="w-full space-y-6">
          <Participants activeParticipants={activeParticipants} />
          <div className='h-[432px] flex flex-1'>
            <Chat messages={messages} sendMessage={sendMessage} />
          </div>
        </div>
        <div className="flex flex-col gap-6 flex-shrink-0 w-sidebar xl:w-[270px] md:hidden">
          <Countdown />
          <Dino />
        </div>
      </div>
    </div>
  );
};

export default Lobby;
