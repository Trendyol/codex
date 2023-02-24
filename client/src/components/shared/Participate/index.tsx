import Button from '@components/ui/Button';
import { useParticipate } from '@hooks/data';
import { Status } from '@models/enums';
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
    if (userParticipant) return <div className="text-sm font-semibold mt-auto text-green-400">Registered</div>;

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
      <Button onClick={() => push(`/lobby/${id}`)} fluid={false} size={'small'} intent={'primary'}>
        Join the lobby now
      </Button>
    );

  if (Status.ongoing && userActiveParticipant)
    return (
      <Button onClick={() => push(`/room/${id}`)} fluid={false} size={'small'} intent={'primary'}>
        Join now
      </Button>
    );

  return null;
};

export default Participate;
