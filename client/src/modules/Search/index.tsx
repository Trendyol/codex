import Avatar from '@components/ui/Avatar';
import Input from '@components/ui/Input';
import { useSearch } from '@hooks/data/useSearch';
import { useState } from 'react';
import { useDebounce } from 'react-use';

const Search = () => {
  const [search, setSearch] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState('');
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
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex items-center">
        <Input
          className="w-[440px] lg:w-[300px] md:w-[260px]"
          placeholder="Search..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center flex-col gap-4 w-[440px] lg:w-[300px] md:w-[260px] mt-2">
          {users?.map((user: any) => (
            <Avatar
              key={user.id}
              id={user.id}
              name={user.name}
              avatar={user.avatar}
              points={user.points}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
