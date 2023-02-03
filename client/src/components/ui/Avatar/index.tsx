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
        'flex items-center gap-4 w-full hover:bg-gray-100 p-2 cursor-pointer rounded-md',
        className,
      )}
    >
      <Image alt="avatar" className="rounded-md" width={40} height={40} src={avatar} />
      <div className="flex flex-col">
        <div
          className={cx(
            'text-sm font-semibold whitespace-nowrap ',
            truncate ? 'truncate xs:w-[90px]' : '',
          )}
        >
          {name}
        </div>
        <div className="text-xs text-secondary-100 truncate">{points} points</div>
      </div>
    </div>
  );
};

export default Avatar;
