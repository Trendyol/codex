import Badge from '@components/shared/Badge';
import Card from '@components/ui/Card';
import { useChallenge } from '@hooks/data';
import { useRouter } from 'next/router';
import randomGradient from 'random-gradient';
import { BsFillTrophyFill } from 'react-icons/bs';
import { DateTime } from 'luxon';
import { Difficulty, Status } from '@models/enums';
import Participate from '@components/shared/Participate';

const Lore = () => {
  const router = useRouter();
  const { challenge } = useChallenge(router.query.challenge as string);

  if (!challenge) return <></>;
  const { id, name, description, date, status, problem, userParticipant, userActiveParticipant } =
    challenge;
  const formattedDate = DateTime.fromISO(date).toFormat('dd LLL yyyy');

  return (
    <Card className="h-fit min-h-[500px] overflow-hidden rounded-xl p-0" space={false}>
      <div
        className="relative h-48 w-full bg-white"
        style={{ background: randomGradient(challenge.id) }}
      >
        <div className="absolute -bottom-[50px] left-8 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#9694ff] ring-4 ring-white">
          <BsFillTrophyFill color="white" size={60} />
        </div>
        <div className="absolute top-[220px] right-8">
          <Participate
            id={id}
            userParticipant={userParticipant}
            userActiveParticipant={userActiveParticipant}
            status={status}
          />
        </div>
      </div>
      <div className="mt-12 p-6">
        <div className="flex items-center gap-3 text-2xl font-semibold">
          <span>{name}</span>
          {problem && (
            <Badge className="capitalize" intent={problem.difficulty} size={'small'}>
              {Difficulty[problem.difficulty]}
            </Badge>
          )}
        </div>
        <div className="mt-2 text-sm capitalize text-secondary-100">
          {formattedDate} - {Status[status]}
        </div>
        <div className="mt-3 whitespace-pre-wrap text-secondary-200">{description}</div>
      </div>
    </Card>
  );
};

export default Lore;
