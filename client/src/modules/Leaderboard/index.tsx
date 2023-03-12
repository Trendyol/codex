import Community from '@components/shared/Community';
import Suggestion from '@components/shared/Suggestion';
import Avatar from '@components/ui/Avatar';
import Card from '@components/ui/Card';
import { User } from '@hooks/data/models/types';
import { useUsers } from '@hooks/data/useUsers';

const Leaderboard = () => {
  const filter = {
    orderBy: 'points',
    order: 'desc',
    limit: '20',
  };
  const { users } = useUsers(filter);

  return (
    <>
      <div className="flex flex-1 gap-6">
        <Card className="h-fit min-h-[600px] overflow-x-auto rounded-lg">
          <div className="text-xl font-semibold text-primary-400">Leaderboard</div>
          <div className="mt-3 flex flex-col gap-4">
            {users.map((user: User) => (
              <Avatar
                id={user.id}
                key={user.id}
                name={user.name}
                avatar={user.avatar}
                points={user.points}
              />
            ))}
          </div>
        </Card>
        <div className="flex flex-col gap-6 flex-shrink-0 w-sidebar xl:w-[270px] md:hidden">
          <Community />
          <Suggestion />
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
