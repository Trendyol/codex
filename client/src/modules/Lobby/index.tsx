import { useChallenge, useLobby } from '@hooks/data';
import { User } from '@hooks/data/models/types';
import { useMe } from '@hooks/data/useMe';
import { joinLobby } from '@services/lobby';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Chat from './components/Chat';
import Countdown from './components/Countdown';
import Dino from './components/Dino';
import Participants from './components/Participants';

const Lobby = () => {
  const router = useRouter();
  const { challenge } = useChallenge(router.query.challenge as string);

  const { lobby } = useLobby(router.query.challenge as string);
  const { me } = useMe();
  const [activeParticipants, setActiveParticipants] = useState<User[]>([]);

  useEffect(() => {
    if (!lobby || !lobby.id || !me) return;

    joinLobby(
      lobby.id,
      me.id,
      (activeParticipants) => setActiveParticipants(activeParticipants),
      (user, message) => console.log(user, message),
    );
  }, [lobby, me]);

  return (
    <div className="">
      <div className="text-2xl text-primary-400 mb-6">Dashboard</div>
      <div className="flex gap-6 flex-1">
        <div className="w-full space-y-4">
          <Participants
            activeParticipants={[
              ...activeParticipants,
            ]}
          />
          <Chat />
        </div>
        <div className="flex flex-col gap-4 flex-shrink-0 w-sidebar xl:w-[270px] md:hidden">
          <Countdown />
          <Dino />
        </div>
      </div>
    </div>
  );
};

export default Lobby;
