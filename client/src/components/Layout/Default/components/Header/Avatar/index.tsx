import { cx } from 'class-variance-authority';
import Image from 'next/image';
import { FC } from 'react';

type AvatarProps = {
  name: string;
  points: number;
  avatar: string;
  className?: string;
  truncate?: boolean;
};

const Avatar: FC<AvatarProps> = ({ name, avatar, points, truncate, className }) => {
  return (
    <div
      className={cx(
        'flex w-full cursor-pointer items-center gap-4 overflow-hidden text-ellipsis rounded-md p-2 hover:bg-gray-100',
        className,
      )}
    >
      <Image alt="avatar" className="rounded-md" width={40} height={40} src={avatar} />
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
    </div>
  );
};

export default Avatar;
