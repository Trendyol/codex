import Avatar from '@components/ui/Avatar';
import Card from '@components/ui/Card';
import { useChallenge } from '@hooks/data';
import { usePlacements } from '@hooks/data/usePlacements';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';

const Placement = () => {
  const { query, isReady } = useRouter();
  const { challenge } = useChallenge(query.challenge as string);
  const { placements } = usePlacements(query.challenge as string, isReady);
  if (!challenge || !placements || !placements.length) return <></>;

  return (
    <Card className="h-fit min-h-[400px] overflow-hidden rounded-lg">
      <div className="text-2xl font-semibold">
        <span>Placements</span>
      </div>
      <div className="mt-3 space-y-4">
        {placements.slice(0, 3).map(({ teamId, participants, date }, index) => {
          const finishTime = DateTime.fromISO(date)
            .diff(DateTime.fromISO(challenge.date))
            .toFormat('hh:mm:ss');
          return (
            <div key={teamId}>
              <div className="mb-1 font-semibold text-primary-400">Team {index + 1} </div>
              <div className="mb-2 text-xs text-secondary-200">Time: {finishTime}</div>
              <div className="flex flex-wrap gap-4">
                {participants.map(({ id, name, avatar, points }) => (
                  <Avatar
                    className="w-52 gap-4"
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
