import { useRoom } from '@hooks/data';
import { useMe } from '@hooks/data/useMe';
import { joinRoom } from '@services/room';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Room = () => {
  const router = useRouter();
  const { room } = useRoom(router.query.challenge as string);
  const { me } = useMe();

  useEffect(() => {
    if (!room || !me) return;

    joinRoom(room.team.id, me.id);
  }, [room, me]);

  return (
    <div>
      <div>Room</div>
      <div>{room?.team.id}</div>
      <div>Teammates</div>
      {room?.team.participants.map(({ id, name }) => (
        <div
          style={{ background: '#333', color: 'white', padding: '30px' }}
          key={id}
        >
          <div>{name}</div>
        </div>
      ))}
    </div>
  );
};

export default Room;
