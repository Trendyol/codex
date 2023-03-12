import Avatar from '@components/ui/Avatar';
import Card from '@components/ui/Card';
import { useChallenge } from '@hooks/data';
import { useRouter } from 'next/router';
import { mockPlacements } from '../../models/constants';

const Placement = () => {
  const router = useRouter();
  const { challenge } = useChallenge(router.query.challenge as string);

  if (!challenge) return <></>;

  return (
    <Card className="rounded-lg overflow-hidden h-fit min-h-[400px]">
      <div className="text-2xl font-semibold">Placements</div>
      <div className="mt-3 space-y-4">
        {mockPlacements.map(({ id, participants }, index) => {
          return (
            <div key={id}>
              <div className="font-semibold mb-1 text-primary-400">Team {index + 1} </div>
              <div className="text-xs mb-2 text-secondary-200">Time: 13:49・Score: 759 </div>
              <div className="flex flex-wrap gap-4">
                {participants.map(({ id, name, avatar, points }) => (
                  <Avatar
                    className="gap-4 w-52"
                    key={id}
                    id={id}
                    name={name}
                    avatar={avatar}
                    points={points}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Placement;
