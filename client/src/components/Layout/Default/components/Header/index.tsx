import Avatar from '@components/ui/Avatar';
import Button from '@components/ui/Button';
import Dropdown from '@components/ui/Dropdown';
import Input from '@components/ui/Input';
import { useMe } from '@hooks/data/useMe';
import Link from 'next/link';
import Logo from '../Logo';
import { FiLogOut } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { ThemeContext } from '@contexts/ThemeContext';
import { useLogout } from '@hooks/data/useLogout';
import { useUsers } from '@hooks/data/useUsers';
import { useDebounce } from 'react-use';

const Header = () => {
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const { me } = useMe();
  const { users } = useUsers({ name: debouncedSearch, limit: 3, orderBy: 'points', order: 'desc' });
  const { logout } = useLogout();
  const { theme, toggleLightTheme, toggleDarkTheme } = useContext(ThemeContext);

  useDebounce(() => setDebouncedSearch(search), 500, [search]);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const userAvatars = useMemo(
    () =>
      users?.map((user) => ({
        key: user.id,
        label: (
          <Avatar
            id={user.id}
            name={user.name}
            avatar={user.avatar}
            points={user.points}
            truncate
          />
        ),
      })),
    [users],
  );

  const settings = [
    {
      key: 1,
      label: (
        <Link href={`/user/${me?.id}`} className="flex items-center p-2 text-sm">
          <BiUser />
          <div className="ml-2">Profile</div>
        </Link>
      ),
    },
    {
      key: 2,
      label: (
        <div
          className="flex items-center p-2 text-sm"
          onClick={theme == 'light' ? toggleDarkTheme : toggleLightTheme}
        >
          {theme == 'light' ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
          <div className="ml-2">Theme</div>
        </div>
      ),
    },
    {
      key: 4,
      label: (
        <div className="flex items-center p-2 text-sm">
          <FiLogOut />
          <div onClick={() => logout()} className="ml-2">
            Sign out
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="sticky top-0 z-50 flex h-header w-full items-center justify-between gap-5 border-b border-border bg-background-200 px-8 text-text md:px-4">
      <div className="flex items-center ">
        <Logo />
        <div className="w-[440px] lg:w-[300px] md:w-[260px] sm:hidden">
          <Dropdown items={userAvatars} bodyClassNames="w-[440px] lg:w-[300px] md:w-[260px]">
            <Input onChange={handleSearch} placeholder="Search..." />
          </Dropdown>
        </div>
      </div>
      <div className="flex items-center">
        {me ? (
          <Dropdown items={settings} bodyClassNames="w-[150px]">
            <Avatar id={me.id} name={me.name} avatar={me.avatar} points={me.points} disabled />
          </Dropdown>
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
