import Card from '@components/ui/Card';
import { Status } from '@models/enums';
import { FC, useMemo } from 'react';
import { BsFillTrophyFill } from 'react-icons/bs';
import { DateTime } from 'luxon';
import { Challenge } from '@hooks/data/models/types';
import Participate from '@components/shared/Participate';
import Link from 'next/link';
import { useChallenge } from '@hooks/data';

type ChallengeProps = {} & Challenge;

const Challenge: FC<ChallengeProps> = ({
  id,
  name,
  status,
  teamSize,
  date,
  description,
  userParticipant,
  userActiveParticipant,
}) => {
  const formattedDate = useMemo(() => DateTime.fromISO(date).toFormat('dd LLL yyyy'), [date]);
  const challengePath = `/challenge/${id}`;
  const { challenge } = useChallenge(id);

  return (
    <Link href={challengePath}>
      <Card className="min-w-[260px]">
        <div className="mb-4 text-xl font-semibold text-primary-400">{name}</div>
        <div className="flex">
          <div className="mr-6 flex h-12 w-12 items-center justify-center rounded-md bg-[#9694ff] lg:hidden">
            <BsFillTrophyFill color="white" size={28} />
          </div>
          <div className="flex flex-1 flex-col ">
            <div className="mb-1 line-clamp-3 h-[72px] whitespace-pre-wrap text-secondary-200">
              {description}
            </div>
            <div className="flex h-[36px] justify-between font-semibold text-secondary-200 lg:text-sm">
              <div className="mt-auto text-sm capitalize">
                {formattedDate} - {Status[status]}
              </div>
              {challenge && (
                <Participate
                  id={id}
                  userParticipant={userParticipant}
                  userActiveParticipant={userActiveParticipant}
                  status={status}
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default Challenge;
