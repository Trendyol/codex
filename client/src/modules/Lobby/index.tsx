import { useLobby } from '@hooks/data';
import { User } from '@hooks/data/models/types';
import { useMe } from '@hooks/data/useMe';
import { joinLobby, sendMessage } from '@services/lobby';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Lobby = () => {
  const router = useRouter();
  const { challenge } = router.query;
  const { lobby } = useLobby(challenge as string);
  const { me } = useMe();
  const [activeParticipants, setActiveParticipants] = useState<User[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');

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
    <div>
      <div>Lobby</div>
      {activeParticipants.map(({ id, name }) => (
        <div
          style={{ background: '#333', color: 'white', padding: '30px' }}
          key={id}
        >
          <div>
            {name} {id}
          </div>
        </div>
      ))}

      <div>
        <div>Lobby chat</div>
        <div>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <div
          onClick={() => {
            if (!lobby) return;
            sendMessage(lobby?.id, message);
            setMessage('');
          }}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default Lobby;
