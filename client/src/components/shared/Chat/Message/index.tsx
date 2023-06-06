import { User } from '@hooks/data/models/types';
import { getSeedAvatar, getSeedName } from '@utils/common';
import { DateTime } from 'luxon';
import Image from 'next/image';
import { FC } from 'react';

type MessageProps = {
  user?: User;
  message: string;
  timestamp: string;
};

const Message: FC<MessageProps> = ({ user, message, timestamp }) => {
  const { id, name, avatar, points } = user || {};
  const formattedTimestamp = DateTime.fromISO(timestamp).toFormat('HH:mm');

  return (
    <div className="flex rounded-md bg-background-50 p-2">
      <Image
        className="self-start rounded-md"
        alt="avatar"
        width={32}
        height={32}
        src={avatar || getSeedAvatar(id)}
      />
      <div className="relative ml-2 w-full">
        <div className="text-sm text-primary-500">
          <span className="font-semibold">{name || getSeedName(id)}</span>
          <span className="ml-2 text-xs text-secondary-100">{points || 0} Points</span>
        </div>
        <div className="whitespace-normal break-all text-sm text-secondary-200">{message}</div>
        <div className="absolute bottom-0 right-0 text-[10px] text-secondary-100">{formattedTimestamp}</div>
      </div>
    </div>
  );
};

export default Message;
