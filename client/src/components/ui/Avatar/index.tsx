import { getHashAvatar } from '@utils/common';
import { cx } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type AvatarProps = {
  id: string;
  name: string;
  points: number;
  avatar: string;
  className?: string;
  truncate?: boolean;
};

const Avatar: FC<AvatarProps> = ({ id, name, avatar, points, truncate, className }) => {
  return (
    <Link
      href={`/user/${id}`}
      className={cx(
        'flex w-full cursor-pointer select-none items-center gap-4 overflow-hidden text-ellipsis rounded-md p-2 hover:bg-background-50',
        className,
      )}
    >
      <div className="h-[40px] w-[40px] overflow-hidden rounded-md">
        <Image
          className="object-cover"
          alt="avatar"
          width={40}
          height={40}
          src={avatar || getHashAvatar(id)}
        />
      </div>
      <div className="flex flex-col">
        <div
          className={cx(
            'whitespace-nowrap text-sm font-semibold',
            truncate ? 'truncate xs:w-[90px]' : '',
          )}
        >
          {name}
        </div>
        <div className="truncate text-xs text-secondary-100">{points} points</div>
      </div>
    </Link>
  );
};

export default Avatar;
