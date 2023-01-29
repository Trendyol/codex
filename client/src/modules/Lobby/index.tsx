import { useLobby } from '@hooks/data';
import { useMe } from '@hooks/data/useMe';
import { joinRoom } from '@services/room';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Lobby = () => {
  const router = useRouter();
  const { challenge } = router.query;
  const { lobby } = useLobby(challenge as string);
  const { me } = useMe();

  useEffect(() => {
    if (!lobby || !me) return;

    joinRoom(lobby.id, me.id, (user) => console.log('user', user));
    console.log('Lobby ');
  }, [lobby, me]);

  return (
    <div>
      <div>Lobby</div>
      {lobby?.participants.map(({ id, name }) => (
        <div style={{ background: '#333', color: 'white', padding: '30px' }} key={id}>
          <div>{name}</div>
        </div>
      ))}
    </div>
  );
};

export default Lobby;
