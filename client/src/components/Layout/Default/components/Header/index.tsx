import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Dropdown from '@components/ui/Dropdown';
import { useMe } from '@hooks/data/useMe';
import Link from 'next/link';
import Logo from '../Logo';
import { useState } from 'react';
import Avatar from './Avatar';
import ThemeToggle from './ThemeToggle';
import { fetcher } from '@utils/fetcher';

const Header = () => {
  const { me } = useMe();
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleLogout = async () => {
    await fetcher('/auth/logout');
    window.location.href = '/';
  };

  return (
    <div className="sticky top-0 z-50 flex h-header w-full items-center justify-between gap-5 border-b border-border bg-background-200 px-8 text-text md:px-4">
      <div className="flex items-center ">
        <Logo />
        <div className="w-[440px] lg:w-[300px] md:w-[260px] sm:w-[140px] xs:w-[90px]">
          <Input placeholder="Search..." />
        </div>
      </div>
      <div className="flex items-center">
        <ThemeToggle />
        {me ? (
          <div className="relative">
            <button onClick={handleShow}>
              <Avatar name={me.name} avatar={me.avatar} points={me.points} truncate />
            </button>
            <Dropdown show={show} onHide={() => setShow(false)}>
              <div className="p-4"> Hello {me.name}</div>
              <Button className="w-full bg-white" onClick={() => handleLogout()}>
                Log out
              </Button>
            </Dropdown>
          </div>
        ) : (
          <>
            <Link href={'/login'}>
              <Button className="mr-4 md:hidden">Log in</Button>
            </Link>
            <Button intent={'secondary'}>
              Create<span className="sm:hidden"> account</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
