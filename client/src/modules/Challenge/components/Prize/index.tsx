import Card from '@components/ui/Card';
import { useChallenge } from '@hooks/data';
import { prizes } from '@modules/Challenge/models/constants';

import { useRouter } from 'next/router';

const Prize = () => {
  const router = useRouter();
  const { challenge } = useChallenge(router.query.challenge as string);

  if (!challenge) return <></>;

  return (
    <Card className="h-fit min-h-[300px] overflow-hidden rounded-lg">
      <div className="text-2xl font-semibold">Prizes</div>
      <div className="mt-3 space-y-4 text-lg sm:text-sm">
        {prizes.map(({ id, name, points }) => (
          <div key={id}>
            <span className="mr-1 text-xl font-semibold xs:text-lg"> {name}: </span> {points} Points
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Prize;
