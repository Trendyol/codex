import Card from '@components/ui/Card';
import { Status } from '@models/enums';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { BsFillTrophyFill } from 'react-icons/bs';
import { DateTime } from 'luxon';
import { Challenge } from '@hooks/data/models/types';
import Participate from '@components/shared/Participate';

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
  const { push } = useRouter();

  const formattedDate = useMemo(() => DateTime.fromISO(date).toFormat('dd LLL yyyy'), [date]);
  const challengePath = `/challenge/${id}`;

  return (
    <Card className="min-w-[260px]" onClick={() => push(challengePath)}>
      <div className="mb-4 text-xl font-semibold text-primary-400">{name}</div>
      <div className="flex">
        <div className="mr-6 flex h-12 w-12 items-center justify-center rounded-md bg-[#9694ff] lg:hidden">
          <BsFillTrophyFill color="white" size={28} />
        </div>
        <div className="flex flex-1 flex-col ">
          <div className="h-[48px] whitespace-pre-wrap text-secondary-200 line-clamp-2">
            {description}
          </div>
          <div className="flex h-[36px] justify-between font-semibold text-secondary-200 lg:text-sm">
            <div className="mt-auto capitalize text-sm">
              {formattedDate} - {Status[status]}
            </div>
            <Participate
              id={id}
              userParticipant={userParticipant}
              userActiveParticipant={userActiveParticipant}
              status={status}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Challenge;
