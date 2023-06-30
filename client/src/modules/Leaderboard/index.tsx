import Community from '@components/shared/Community';
import ListingCard from '@components/shared/ListingCard';
import Progression from '@components/shared/Progression';
import Button from '@components/ui/Button';
import { useUsers } from '@hooks/data/useUsers';
import { getSeedAvatar, getSeedName } from '@utils/common';
import { Tooltip } from 'flowbite-react';
import Image from 'next/image';

const Leaderboard = () => {
  const filter = {
    orderBy: 'points',
    order: 'desc',
    limit: 20,
  };
  const { users } = useUsers(filter);

  const getUserLink = (id: string) => `/user/${id}`;

  return (
    <>
      <div className="flex flex-1 gap-4">
        <div className="flex flex-1 flex-col gap-4 ">
          {users?.map(({ id, name, avatar, points, bio, email }) => (
            <ListingCard
              key={id}
              href={getUserLink(id)}
              title={name || getSeedName(id)}
              subtitle={`${points} points`}
              content={bio}
              action={
                <Tooltip content="Available soon">
                  <Button disabled size={'small'}>
                    Follow
                  </Button>
                </Tooltip>
              }
              image={
                <Image
                  className="rounded-md object-cover"
                  alt="avatar"
                  width={50}
                  height={50}
                  src={avatar || getSeedAvatar(id)}
                />
              }
            />
          ))}
        </div>
        <div className="flex w-sidebar flex-shrink-0 flex-col gap-4 xl:w-[270px] md:hidden">
          <Progression />
          <Community />
          {/* <Suggestion /> */}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
