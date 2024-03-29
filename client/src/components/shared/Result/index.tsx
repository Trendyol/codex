import { SubmissionTypes, SubmissionStatus } from '@models/enums';
import { SubmissionResult } from '@models/types';
import { decodeBase64 } from '@utils/converter';
import { cx } from 'class-variance-authority';
import { FC } from 'react';

type ResultProps = {
  result: SubmissionResult;
};

const Result: FC<ResultProps> = ({ result }) => {
  const {
    status,
    runtime,
    memory,
    stdin,
    stderr,
    stdout,
    expected_output,
    type,
    passedTestcases,
    totalTestcases,
  } = result;

  const accepted = status == SubmissionStatus.Accepted;
  const isRun = type == SubmissionTypes.Run;
  const isSubmission = type == SubmissionTypes.Submission;
  const showValues = (accepted && !isSubmission) || !accepted;
  const showCongrats = accepted && isSubmission;

  const renderValues = (title: string, content?: string) => (
    <div className="mt-1">
      <div className="mb-1 text-xs">{title}</div>
      <div className="whitespace-pre-line rounded-md bg-background-50 px-2 py-1 text-sm">
        {decodeBase64(content)}
      </div>
    </div>
  );

  return (
    <div>
      <div className={cx('h-[32px] text-lg', accepted ? 'text-success' : 'text-error')}>
        <span>{SubmissionStatus[status]}</span>
        <span className="ml-1 text-xs">{isRun && '(Testcase)'}</span>
        <span className="ml-2 text-xs text-secondary-100">
          <span className="text-secondary-200">{runtime}</span> seconds
        </span>
        <span className="ml-2 text-xs text-secondary-100">
          <span className="text-secondary-200">{memory}</span> kb
        </span>
        <span className="ml-2 text-xs text-secondary-100">
          <span className="mr-1 text-secondary-200">
            {passedTestcases}/{totalTestcases}
          </span>
          testcases passed
        </span>
      </div>
      <span>
        {showCongrats && (
          <div className="whitespace-pre-wrap text-sm text-green-400">
            <div>Congratulations, your submission has successfully saved.</div>
            <div>You can complete the problem now or find another solution.</div>
          </div>
        )}
      </span>
      {showValues && (
        <div className="mt-3 h-[100px] overflow-auto">
          {stderr && renderValues('Error', stderr)}
          {renderValues('Input', stdin)}
          {renderValues('Output', stdout)}
          {renderValues('Expected Output', expected_output)}
        </div>
      )}
    </div>
  );
};

export default Result;
