import Avatar from '@components/ui/Avatar';
import { User } from '@hooks/data/models/types';
import Image from 'next/image';
import { FC } from 'react';

type MessageProps = {
  user?: User;
  message: string;
};

const Message: FC<MessageProps> = ({ user, message }) => {
  const { name, avatar } = user || {};
  return (
    <div className="flex rounded-md bg-gray-50 p-2">
      {avatar && (
        <Image className="self-start rounded-md" alt="avatar" width={32} height={32} src={avatar} />
      )}
      <div className="relative ml-2 w-full">
        {name && (
          <div className="text-sm text-primary-500">
            <span className="font-semibold">{name}</span>
            <span className="ml-2 text-xs text-secondary-100">350 Points</span>
          </div>
        )}
        <div className="text-sm text-secondary-200 whitespace-normal break-all">{message}</div>
        <div className="absolute right-0 bottom-0 text-[10px] text-secondary-100">12.00</div>
      </div>
    </div>
  );
};

export default Message;
