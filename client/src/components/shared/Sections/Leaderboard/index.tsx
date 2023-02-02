import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import Image from 'next/image';

const leaderboard = [
  {
    id: 0,
    avatar: 'https://i.pravatar.cc/300?img=1',
    name: 'John Doe',
    points: 100,
  },
  {
    id: 1,
    avatar: 'https://i.pravatar.cc/300?img=2',
    name: 'John Doe',
    points: 100,
  },
  {
    id: 2,
    avatar: 'https://i.pravatar.cc/300?img=4',
    name: 'John Doe',
    points: 100,
  },
];

const Leaderboard = () => {
  return (
    <Card className="flex flex-col items-center gap-4 overflow-hidden">
      <div className="text-primary-400 text-lg font-semibold">Leaderboard</div>
      {leaderboard.map(({ id, avatar, name, points }) => (
        <div key={id} className="flex items-center gap-4 w-full">
          <Image alt="avatar" className="rounded-md" width={40} height={40} src={avatar} />
          <div className="flex flex-col">
            <div className="text-sm font-semibold whitespace-nowrap">{name}</div>
            <div className="text-xs text-secondary-100">{points} points</div>
          </div>
        </div>
      ))}
      <Button intent={'secondary'} fluid>
        See All
      </Button>
    </Card>
  );
};

export default Leaderboard;
