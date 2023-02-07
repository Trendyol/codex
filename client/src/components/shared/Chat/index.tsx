import Card from '@components/ui/Card';
import Input from '@components/ui/Input';
import { useLobby } from '@hooks/data';
import { User } from '@hooks/data/models/types';
import { useMe } from '@hooks/data/useMe';
import { cx } from 'class-variance-authority';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';
import Message from './Message';

type ChatProps = {
  messages: { user: User; message: string }[];
  sendMessage: (lobbyId: string, message: string) => void;
  className?: string;
};

const Chat: FC<ChatProps> = ({ messages, sendMessage, className }) => {
  const router = useRouter();
  const { me } = useMe();
  const { lobby } = useLobby(router.query.challenge as string);

  const [message, setMessage] = useState<string>('');
  const messagesRef = useRef<HTMLDivElement>(null);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!lobby || !me) return;

    if (e.key === 'Enter') {
      sendMessage(lobby?.id, message);
      setMessage('');
    }
  };

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className={cx('space-y-2 flex flex-col justify-between', className)}>
      <div className="overflow-scroll h-full mb-2 space-y-2" ref={messagesRef}>
        {messages.map(({ user, message }, index) => (
          <Message user={user} message={message} key={index} />
        ))}
      </div>
      <Input
        onKeyDown={handleKeyDown}
        onChange={handleMessageChange}
        value={message}
        placeholder="Type something..."
      />
    </Card>
  );
};

export default Chat;
