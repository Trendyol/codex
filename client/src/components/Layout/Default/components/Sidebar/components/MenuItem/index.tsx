import Link from 'next/link';
import { useRouter } from 'next/router';
import { cx } from 'class-variance-authority';
import { FC } from 'react';
import { IconType } from 'react-icons';

type MenuItemProps = {
  path: string;
  title: string;
  Icon: IconType;
  disabled?: boolean;
  collapse?: boolean;
  target?: string;
};

const MenuItem: FC<MenuItemProps> = ({ path, title, Icon, disabled, collapse, target }) => {
  const router = useRouter();

  const isActive = router.pathname === path;
  return (
    <Link
      href={disabled ? '#' : path}
      key={title}
      title={title}
      onClick={(e) => e.stopPropagation()}
      target={target}
    >
      <div
        className={cx(
          'flex h-[48px] items-center gap-4 rounded-lg  p-3 transition-colors ',
          isActive ? 'bg-primary-300 text-white' : 'text-primary-300 hover:bg-background-50',
          disabled ? 'cursor-not-allowed' : '',
          collapse ? 'w-full gap-0 xl:w-full' : 'w-[250px] xl:w-[180px] lg:w-full lg:gap-0',
        )}
      >
        <div className={cx(isActive ? 'text-white' : 'text-primary-50')}>{<Icon size={18} />}</div>
        <div
          className={cx(
            'lg:hidden',
            isActive ? 'text-white' : 'text-primary-500 ',
            collapse ? 'hidden' : '',
          )}
        >
          {title}
        </div>
      </div>
    </Link>
  );
};

export default MenuItem;
