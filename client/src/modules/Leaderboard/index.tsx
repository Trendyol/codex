import Community from '@components/shared/Community';
import Progression from '@components/shared/Progression';
import Suggestion from '@components/shared/Suggestion';
import Avatar from '@components/ui/Avatar';
import Card from '@components/ui/Card';
import { useUsers } from '@hooks/data/useUsers';

const Leaderboard = () => {
  const filter = {
    orderBy: 'points',
    order: 'desc',
    limit: 20,
  };
  const { users } = useUsers(filter);

  return (
    <>
      <div className="flex flex-1 gap-6">
        <Card className="h-fit min-h-[600px] overflow-x-auto rounded-lg">
          <div className="text-xl font-semibold text-primary-400">Leaderboard</div>
          <div className="mt-3 flex flex-col gap-4">
            {users?.map(({ id, name, avatar, points }) => (
              <Avatar id={id} key={id} name={name} avatar={avatar} points={points} />
            ))}
          </div>
        </Card>
        <div className="flex w-sidebar flex-shrink-0 flex-col gap-6 xl:w-[270px] md:hidden">
          <Progression />
          <Community />
          <Suggestion />
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
