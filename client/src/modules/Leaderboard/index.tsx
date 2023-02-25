import Avatar from '@components/ui/Avatar';
import { User } from '@hooks/data/models/types';
import { useUsers } from '@hooks/data/useUsers';

const Leaderboard = () => {
  const filter = {
    orderBy: 'points',
    order: 'desc',
    limit: '20',
  }
  const { users } = useUsers(filter);

  return (
    <div className="rounded-lg bg-white p-4 shadow-lg">
      <div className="mb-4 text-lg font-semibold">Leaderboard</div>
      <div className="flex flex-col gap-4">
        {users.map((user: User) => (
          <Avatar id={user.id} key={user.id} name={user.name} avatar={user.avatar} points={user.points} />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;