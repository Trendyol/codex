import Avatar from '@components/ui/Avatar';
import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { useUsers } from '@hooks/data/useUsers';
import Link from 'next/link';

const Leaderboard = () => {
  const filter = {
    orderBy: 'points',
    order: 'desc',
    limit: 3,
  };
  const { users } = useUsers(filter);

  return (
    <Card className="flex h-[324px] flex-col items-center gap-2 overflow-hidden ">
      <div className="text-lg font-semibold text-primary-400">Leaderboard</div>
      {users ? (
        <div className="h-full h-max w-full">
          {users?.map(({ id, name, avatar, points }) => (
            <Avatar id={id} key={id} name={name} avatar={avatar} points={points} />
          ))}
        </div>
      ) : (
        <></>
      )}
      <Link href="/leaderboard" className="mt-auto w-full">
        <Button intent={'secondary'} fluid>
          View All
        </Button>
      </Link>
    </Card>
  );
};

export default Leaderboard;
