import Avatar from '@components/ui/Avatar';
import Card from '@components/ui/Card';
import { useChallenge } from '@hooks/data';
import { usePlacements } from '@hooks/data/usePlacements';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import Reveal from '../Submissions/components/Reveal';
import { Submission } from '@hooks/data/models/types';
import { FaRegFileCode } from 'react-icons/fa';

type PlacementProps = {
  limit?: number;
};

const Placement: FC<PlacementProps> = ({ limit = 3 }) => {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const { query, isReady } = useRouter();
  const { challenge } = useChallenge(query.challenge as string);
  const { placements } = usePlacements(query.challenge as string, isReady);
  if (!challenge || !placements || !placements.length) return <></>;

  const handleSelectSubmission = (submission: Submission) => () =>
    setSelectedSubmission(submission);

  const handleUnselectSubmission = () => setSelectedSubmission(null);

  return (
    <Card className=" h-full min-h-[400px] overflow-scroll rounded-lg">
      <div className="text-2xl font-semibold">
        <span>Placements</span>
      </div>
      <div className="mt-3 space-y-4 overflow-auto ">
        {placements.slice(0, limit).map(({ teamId, participants, date, submission }, index) => {
          const finishTime = DateTime.fromISO(date)
            .diff(DateTime.fromISO(challenge.date))
            .toFormat('hh:mm:ss');
          return (
            <div key={teamId}>
              <div className="mb-1 flex items-center font-semibold text-primary-400">
                <div className="mr-2">Team #{index + 1}</div>
                <FaRegFileCode
                  onClick={handleSelectSubmission(submission)}
                  fontSize={14}
                  className="cursor-pointer hover:text-secondary-200"
                />
              </div>
              <div className="mb-2 text-xs text-secondary-200">Time: {finishTime}</div>
              <div className="flex flex-wrap gap-4">
                {participants.map(({ id, name, avatar, points }) => (
                  <Avatar
                    className="w-52 gap-4"
                    key={id}
                    id={id}
                    name={name}
                    avatar={avatar}
                    points={points}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {selectedSubmission && (
        <Reveal submission={selectedSubmission} onHide={handleUnselectSubmission} />
      )}
    </Card>
  );
};

export default Placement;
