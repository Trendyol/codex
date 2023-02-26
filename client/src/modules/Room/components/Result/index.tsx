import { SubmissionTypes, SubmissionStatus } from '@models/enums';
import { decodeBase64 } from '@utils/converter';
import { cx } from 'class-variance-authority';
import { FC } from 'react';

type ResultProps = {
  created_at: string;
  expected_output: string;
  stdin: string;
  language: number;
  memory: number;
  code: string;
  status: number;
  runtime: number;
  stdout: string;
  totalTestcases?: number;
  passedTestcases?: number;
  type: SubmissionTypes;
};

const Result: FC<ResultProps> = ({
  status,
  runtime,
  memory,
  stdin,
  stdout,
  expected_output,
  type,
  passedTestcases,
  totalTestcases,
}) => {
  const accepted = status == SubmissionStatus.Accepted;
  const isRun = type == SubmissionTypes.Run;
  const isSubmission = type == SubmissionTypes.Submission;

  const showValues = (accepted && !isSubmission) || !accepted;
  const showCongrats = accepted && isSubmission;

  return (
    <div>
      <div className={cx('h-[32px] text-lg', accepted ? 'text-green-400' : 'text-red-600')}>
        <span>{accepted ? 'Accepted' : 'Wrong Answer'}</span>
        <span className="ml-1 text-xs">{isRun && '(Testcase)'}</span>
        <span className="ml-2 text-xs text-gray-500">
          <span className="text-gray-800">{runtime}</span> seconds
        </span>
        <span className="ml-2 text-xs text-gray-500">
          <span className="text-gray-800">{memory}</span> kb
        </span>
        <span className="ml-2 text-xs text-gray-500">
          <span className="mr-1 text-gray-800">
            {passedTestcases}/{totalTestcases}
          </span>
          testcases passed
        </span>
      </div>
      <span>
        {showCongrats && (
          <div className="whitespace-pre-wrap text-sm text-green-400">
            <div>Congratulations, your submission has successfully saved.</div>
            <div>You can complete the challenge now or find another solution.</div>
          </div>
        )}
      </span>
      {showValues && (
        <div className="mt-3 h-[100px] overflow-auto">
          <div>
            <div className="mb-1 text-xs text-black">Input</div>
            <div className="rounded-md bg-gray-50 px-2 py-1 text-sm">{decodeBase64(stdin)}</div>
          </div>
          <div className="mt-2">
            <div className="mb-1 text-xs text-black">Output</div>
            <div className="rounded-md bg-gray-50 px-2 py-1 text-sm">{decodeBase64(stdout)}</div>
          </div>
          <div className="mt-2">
            <div className="mb-1 text-xs text-black">Expected Output</div>
            <div className="rounded-md bg-gray-50 px-2 py-1 text-sm">
              {decodeBase64(expected_output)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
