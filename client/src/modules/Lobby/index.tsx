import { useLobby } from '@hooks/data';
import { useRouter } from 'next/router';

const Lobby = () => {
  const router = useRouter();
  const { challenge } = router.query;
  const { lobby } = useLobby(challenge as string);

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
