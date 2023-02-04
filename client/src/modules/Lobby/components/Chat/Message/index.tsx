import Avatar from '@components/ui/Avatar';
import { User } from '@hooks/data/models/types';
import Image from 'next/image';
import { FC } from 'react';

type MessageProps = {
  user: User;
  message: string;
};

const Message: FC<MessageProps> = ({ user, message }) => {
  const { name, avatar } = user;
  return (
    <div className="flex bg-gray-50 p-2 rounded-md">
      <Image className="rounded-md self-start" alt="avatar" width={32} height={32} src={avatar} />
      <div className="ml-2 relative w-full">
        <div className="text-primary-500 text-sm">
          <span className="font-semibold">{name}</span>
          <span className="ml-2 text-secondary-100 text-xs">350 Points</span>
        </div>
        <div className="text-secondary-200 text-sm">{message}</div>
        <div className="text-xs text-secondary-100 absolute right-0 bottom-0">12.00</div>
      </div>
    </div>
  );
};

export default Message;
