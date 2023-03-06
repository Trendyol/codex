import Button from '@components/ui/Button';
import { useParticipate } from '@hooks/data';
import { Status } from '@models/enums';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

type ParticipateProps = {
  id: string;
  status: Status;
  userParticipant: boolean;
  userActiveParticipant: boolean;
};

const Participate: FC<ParticipateProps> = ({
  id,
  userParticipant,
  userActiveParticipant,
  status,
}) => {
  const { participate } = useParticipate();
  const { push } = useRouter();

  if (status == Status.upcoming) {
    if (userParticipant)
      return <div className="mt-auto text-sm font-semibold text-green-400">Registered</div>;

    return (
      <Button
        onClick={(e) => {
          e.stopPropagation();
          participate(id);
        }}
        fluid={false}
        size={'small'}
        intent={'primary'}
      >
        Register
      </Button>
    );
  }

  if (status == Status.pending)
    return (
      <Link href={`/lobby/${id}`} onClick={(e) => e.stopPropagation()}>
        <Button fluid={false} size={'small'} intent={'primary'}>
          Join the lobby now
        </Button>
      </Link>
    );

  if (status == Status.ongoing && userActiveParticipant)
    return (
      <Link href={`/room/${id}`} onClick={(e) => e.stopPropagation()}>
        <Button fluid={false} size={'small'} intent={'primary'}>
          Join now
        </Button>
      </Link>
    );

  return null;
};

export default Participate;
