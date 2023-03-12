import Card from '@components/ui/Card';
import { useChallenge } from '@hooks/data';
import { mockPrizes } from '@modules/Challenge/models/constants';

import { useRouter } from 'next/router';

const Prize = () => {
  const router = useRouter();
  const { challenge } = useChallenge(router.query.challenge as string);

  if (!challenge) return <></>;

  return (
    <Card className="rounded-lg overflow-hidden h-fit min-h-[300px]">
      <div className="text-2xl font-semibold">Prizes</div>
      <div className="space-y-4 text-lg mt-3 sm:text-sm">
        {mockPrizes.map(({ id, name, points, extra }) => (
          <div key={id}>
            <span className="font-semibold text-xl mr-1 xs:text-lg"> {name}: </span> {points} Points
            {extra && <span className="text xs:text-sm"> - {extra}</span>}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Prize;
