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
};

const MenuItem: FC<MenuItemProps> = ({ path, title, Icon }) => {
  const router = useRouter();

  const isActive = router.pathname === path;
  return (
    <Link href={path} key={title} title={title}>
      <div
        className={cx(
          'flex items-center gap-4 p-3 rounded-lg  transition-colors w-[250px] xl:w-[220px] lg:w-full lg:gap-0',
          isActive ? 'bg-primary-300 text-white' : 'text-primary-300 hover:bg-gray-100',
        )}
      >
        <div className={cx(isActive ? 'text-white' : 'text-primary-50')}>{<Icon size={18} />}</div>
        <div className={cx('lg:hidden', isActive ? 'text-white' : 'text-primary-500')}>{title}</div>
      </div>
    </Link>
  );
};

export default MenuItem;
