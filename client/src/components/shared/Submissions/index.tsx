import { useSubmissions } from '@hooks/data/useSubmissions';
import { SubmissionStatus } from '@models/enums';
import { cx } from 'class-variance-authority';
import { DateTime } from 'luxon';
import { FC, useState } from 'react';
import Reveal from './components/Reveal';
import { Submission } from '@hooks/data/models/types';

type SubmissionsProps = {
  problemId: string;
  teamId?: string;
};

const Submissions: FC<SubmissionsProps> = ({ problemId, teamId }) => {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const { submissions } = useSubmissions(problemId, teamId);

  const handleUnselectSubmission = () => setSelectedSubmission(null);
  const handleSelectSubmission = (submission: Submission) => () =>
    setSelectedSubmission(submission);

  return (
    <div className="flex flex-1 flex-col">
      {submissions?.map((submission) => {
        const { id, status, date, runtime, memory } = submission;
        const accepted = status == SubmissionStatus.Accepted;
        return (
          <div
            onClick={handleSelectSubmission(submission)}
            className="w-full border-b border-border px-6 py-2 hover:bg-background-50 cursor-pointer"
            key={id}
          >
            <div className={cx('text-md flex', accepted ? 'text-success' : 'text-error')}>
              {accepted ? 'Accepted' : 'Wrong Answer'}
            </div>
            <div className="mt-0.5 text-xs text-secondary-200">
              {DateTime.fromISO(date).toFormat('dd LLL yyyy')} • {runtime} ms • {memory} KB
            </div>
          </div>
        );
      })}
      {selectedSubmission && (
        <Reveal submission={selectedSubmission} onHide={handleUnselectSubmission} />
      )}
    </div>
  );
};

export default Submissions;
