import Avatar from '@components/ui/Avatar';
import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { mockLeaderboard } from './models/constants';

const Leaderboard = () => {
  return (
    <Card className="flex flex-col items-center gap-2 overflow-hidden">
      <div className="text-primary-400 text-lg font-semibold">Leaderboard</div>
      {mockLeaderboard.map(({ id, avatar, name, points }) => (
        <Avatar id={id} key={id} name={name} avatar={avatar} points={points} />
      ))}
      <Button intent={'secondary'} fluid>
        See All
      </Button>
    </Card>
  );
};

export default Leaderboard;
