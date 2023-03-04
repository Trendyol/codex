import Avatar from '@components/ui/Avatar';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import { useMe } from '@hooks/data/useMe';
import Link from 'next/link';
import Logo from '../Logo';
import { User } from '@hooks/data/models/types';
import { useSearch } from '@hooks/data/useSearch';
import { useState } from 'react';
import { useDebounce } from 'react-use';

const Header = () => {
  const [search, setSearch] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const { me } = useMe();
  const { users } = useSearch(debouncedValue);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(search);
    },
    1000,
    [search],
  );

  return (
    <div className="sticky top-0 z-50 flex h-header w-full items-center justify-between gap-5 border-b bg-white px-8 md:px-4">
      <div className="flex items-center ">
        <Logo />
        <div className="relative">
          <div className="w-[440px] lg:w-[300px] md:w-[260px] sm:w-[140px] xs:w-[90px]">
            <Input
              placeholder="Search..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}
            />
          </div>
          {users?.length > 0 && (
            <div className="absolute mt-1 flex w-[440px] flex-col rounded border shadow-lg lg:w-[300px] md:w-[260px] sm:w-[140px] xs:w-[90px]">
              {users?.map((user: User) => (
                <Avatar
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  avatar={user.avatar}
                  points={user.points}
                  truncate
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {/* <ThemeToggle /> */}
        {me ? (
          <Avatar id={me.id} name={me.name} avatar={me.avatar} points={me.points} truncate />
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
