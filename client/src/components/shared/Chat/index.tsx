import Card from '@components/ui/Card';
import Input from '@components/ui/Input';
import { User } from '@hooks/data/models/types';
import { cx } from 'class-variance-authority';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import Message from './Message';

type ChatProps = {
  messages: { user?: User; message: string }[];
  sendMessage: (message: string) => void;
  className?: string;
};

const Chat: FC<ChatProps> = ({ messages, sendMessage, className }) => {
  const [message, setMessage] = useState<string>('');
  const messagesRef = useRef<HTMLDivElement>(null);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && message) {
      sendMessage(message);
      setMessage('');
    }
  };

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // ! This is a workaround to prevent duplicate messages from being displayed
  // ! https://github.com/Trendyol/codex/issues/210

  const uniqueMessages = useMemo(
    () =>
      messages.filter(
        ({ message, user }, index) =>
          messages.findIndex((m) => m.message === message && m.user?.id === user?.id) === index,
      ),
    [messages],
  );

  return (
    <Card className={cx('flex flex-col justify-between space-y-2', className)}>
      <div className="mb-2 h-full space-y-2 overflow-scroll" ref={messagesRef}>
        {uniqueMessages.map(({ user, message }, index) => (
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
