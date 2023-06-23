import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { useProgression } from '@hooks/data/useProgression';
import Link from 'next/link';
import { FC } from 'react';
import { useMe } from '@hooks/data';

type ProgressionProps = {};

const Progression: FC<ProgressionProps> = () => {
  const { me } = useMe();
  const { progression } = useProgression(!!me);

  if (!me) return null;

  return (
    <Card className="flex flex-col items-center gap-4 overflow-hidden">
      <div className="text-lg font-semibold text-primary-400">Progression</div>
      <div className="min-h-36 flex h-36 w-full flex-col items-center justify-center gap-4">
        {progression ? (
          <>
            <div className="rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 p-[3px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background-200 font-semibold">
                {`${progression?.solvedAll} / ${progression?.totalAll}`}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="text-green-800">Easy</div>
                <div>{`${progression?.solvedEasy} / ${progression?.totalEasy}`}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-yellow-800">Medium</div>
                <div>{`${progression?.solvedMedium} / ${progression?.totalMedium}`}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-red-800">Hard</div>
                <div>{`${progression?.solvedHard} / ${progression?.totalHard}`}</div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <Link href="/practice" className="mt-1 w-full">
        <Button intent={'secondary'} fluid>
          Practice
        </Button>
      </Link>
    </Card>
  );
};

export default Progression;
