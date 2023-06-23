import Card from '@components/ui/Card';
import { Status } from '@models/enums';
import { FC, useMemo } from 'react';
import { BsFillTrophyFill } from 'react-icons/bs';
import { DateTime } from 'luxon';
import { Challenge } from '@hooks/data/models/types';
import Participate from '@components/shared/Participate';
import Link from 'next/link';
import { useChallenge } from '@hooks/data';
import ListingCard from '@components/shared/ListingCard';

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
    <ListingCard
      title={name}
      subtitle={`${formattedDate} - ${Status[status]}`}
      content={description}
      image={<BsFillTrophyFill color="white" size={28} />}
      action={
        challenge && (
          <Participate
            id={id}
            userParticipant={userParticipant}
            userActiveParticipant={userActiveParticipant}
            status={status}
          />
        )
      }
      href={challengePath}
    />
  );
};

export default Challenge;
