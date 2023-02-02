import Card from '@components/ui/Card';
import { useChallenge } from '@hooks/data';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { mockPlacements } from '../../models/constants';

const Placement = () => {
  const router = useRouter();
  const { challenge } = useChallenge(router.query.challenge as string);

  if (!challenge) return <></>;

  return (
    <Card className="p-0 rounded-xl overflow-hidden h-fit min-h-[400px]">
      <div className="p-8">
        <div className="text-2xl font-semibold">Placements</div>
        <div className="text-secondary-200 mt-3 space-y-4">
          {mockPlacements.map(({ id, participants }, index) => {
            return (
              <div key={id}>
                <div className="font-semibold mb-1 text-primary-400">Team {index + 1} </div>
                <div className="text-xs mb-2">Time: 13:49・Score: 759 </div>
                <div className="flex flex-wrap gap-8">
                  {participants.map(({ id, name, avatar, points }) => (
                    <div key={id} className="flex items-center gap-4 w-36">
                      <Image
                        alt="avatar"
                        className="rounded-md"
                        width={40}
                        height={40}
                        src={avatar}
                      />
                      <div className="flex flex-col">
                        <div className="text-sm font-semibold whitespace-nowrap">{name}</div>
                        <div className="text-xs text-secondary-100">{points} points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default Placement;
