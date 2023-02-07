import Button from '@components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cx } from 'class-variance-authority';
import { FC, ReactNode } from 'react';
import { IconType } from 'react-icons';

type MenuItemProps = {
  path: string;
  title: string;
  Icon: IconType;
  disabled?: boolean;
  collapse?: boolean;
};

const MenuItem: FC<MenuItemProps> = ({ path, title, Icon, disabled, collapse }) => {
  const router = useRouter();

  const isActive = router.pathname === path;
  return (
    <Link href={disabled ? '#' : path} key={title} title={title} onClick={(e) => e.stopPropagation()}>
      <div
        className={cx(
          'flex items-center gap-4 p-3 rounded-lg  transition-colors h-[48px]',
          isActive ? 'bg-primary-300 text-white' : 'text-primary-300 hover:bg-gray-100',
          disabled ? 'cursor-not-allowed' : '',
          collapse ? 'w-full xl:w-full gap-0' : 'w-[250px] xl:w-[180px] lg:w-full lg:gap-0',
        )}
      >
        <div className={cx(isActive ? 'text-white' : 'text-primary-50')}>{<Icon size={18} />}</div>
        <div
          className={cx(
            'lg:hidden',
            isActive ? 'text-white' : 'text-primary-500',
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
