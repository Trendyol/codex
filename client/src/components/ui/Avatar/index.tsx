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
  hideText?: boolean;
};

const Avatar: FC<AvatarProps> = ({ id, name, avatar, points, hideText, className }) => {
  return (
    <Link
      href={`/user/${id}`}
      className={cx(
        'flex w-full cursor-pointer items-center gap-4 overflow-hidden text-ellipsis rounded-md p-2 hover:bg-gray-100',
        className,
      )}
    >
      <Image alt="avatar" className="rounded-md" width={40} height={40} src={avatar} />
      <div className={cx('flex flex-col', hideText ? 'sm:hidden' : '')}>
        <div className="whitespace-nowrap text-sm font-semibold">{name}</div>
        <div className="truncate text-xs text-secondary-100">{points} points</div>
      </div>
    </Link>
  );
};

export default Avatar;
