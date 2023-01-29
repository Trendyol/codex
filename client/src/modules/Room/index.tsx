import { useRoom } from '@hooks/data';
import { useRouter } from 'next/router';

const Room = () => {
  const router = useRouter();
  const { challenge } = router.query;
  const { room } = useRoom(challenge as string);

  return (
    <div>
      <div>Room</div>
      <div>Teammates</div>
      {room?.team.participants.map(({ id, name }) => (
        <div style={{ background: '#333', color: 'white', padding: '30px' }} key={id}>
          <div>{name}</div>
        </div>
      ))}
    </div>
  );
};

export default Room;
