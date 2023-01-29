import { useLobby } from '@hooks/data';
import { User } from '@hooks/data/models/types';
import { useMe } from '@hooks/data/useMe';
import { joinLobby } from '@services/lobby';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Lobby = () => {
  const router = useRouter();
  const { challenge } = router.query;
  const { lobby } = useLobby(challenge as string);
  const { me } = useMe();
  const [activeParticipants, setActiveParticipants] = useState<User[]>([]);

  useEffect(() => {
    if (!lobby || !lobby.id || !me) return;

    joinLobby(lobby.id, me.id, (activeParticipants) =>
      setActiveParticipants(activeParticipants),
    );
  }, [lobby, me]);

  return (
    <div>
      <div>Lobby</div>
      {activeParticipants.map(({ id, name }) => (
        <div
          style={{ background: '#333', color: 'white', padding: '30px' }}
          key={id}
        >
          <div>{name} {id}</div>
        </div>
      ))}
    </div>
  );
};

export default Lobby;
