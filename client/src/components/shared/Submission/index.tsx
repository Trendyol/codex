import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { useRun } from '@hooks/data/useRun';
import { useSubmission } from '@hooks/data/useSubmission';
import { Language } from '@models/enums';
import { cx } from 'class-variance-authority';
import { FC, useEffect, useState } from 'react';
import Spinner from '../Spinner';
import Result from './components/Result';
import Testcase from './components/Testcase';
import { SubmissionStatus, SubmissionTabs, SubmissionTypes } from './models/enums';
import { SubmissionResult } from './models/types';

type SubmissionProps = {
  problemId: string;
  code: string;
  language: Language;
};

const Submission: FC<SubmissionProps> = ({ problemId, code, language }) => {
  const [selectedTestcase, setSelectedTestcase] = useState<Testcase>();
  const [activeSubmissionTab, setActiveSubmissionTab] = useState<SubmissionTabs>(
    SubmissionTabs.Testcase,
  );
  const [result, setResult] = useState<SubmissionResult>();
  const { runTrigger, run, runLoading } = useRun();
  const { submissionTrigger, submission, submissionLoading } = useSubmission();

  const handleRun = () => {
    setActiveSubmissionTab(SubmissionTabs.Result);
    runTrigger({ problemId, code, language, testcaseId: selectedTestcase?.id });
  };

  const handleSubmission = () => {
    setActiveSubmissionTab(SubmissionTabs.Result);
    submissionTrigger({ problemId, code, language });
  };

  useEffect(() => {
    setResult(run?.data);
  }, [run]);

  useEffect(() => {
    setResult(submission?.data);
  }, [submission]);

  const handleActiveSubmissionTabChange = () => {
    setActiveSubmissionTab((activeSubmissionTab) =>
      activeSubmissionTab == SubmissionTabs.Testcase
        ? SubmissionTabs.Result
        : SubmissionTabs.Testcase,
    );
  };

  const loading = runLoading || submissionLoading;
  const accepted = result?.status == SubmissionStatus.Accepted;
  const isSubmission = result?.type == SubmissionTypes.Submission;
  const showResult = activeSubmissionTab == SubmissionTabs.Result && result && !loading;
  const showTestcase = activeSubmissionTab == SubmissionTabs.Testcase && !loading;
  const showComplete = accepted && isSubmission;

  return (
    <Card className="relative">
      <div className="flex h-48 flex-col justify-between">
        {loading && <Spinner />}
        {showTestcase && (
          <Testcase
            selectedTestcase={selectedTestcase}
            onSelectedTestcaseChange={setSelectedTestcase}
            problemId={problemId}
          />
        )}
        {showResult && <Result {...result} />}
        {result && (
          <button
            disabled={loading}
            onClick={handleActiveSubmissionTabChange}
            className={cx(
              'absolute top-6 right-6 ml-auto cursor-pointer whitespace-nowrap rounded-xl bg-gray-50 bg-opacity-90 p-2 text-[10px] first-letter:cursor-pointer  hover:bg-gray-200',
              loading ? 'cursor-not-allowed opacity-60' : '',
            )}
          >
            {activeSubmissionTab == SubmissionTabs.Testcase ? 'Result' : 'Testcase'}
          </button>
        )}
        <div className="flex">
          {showComplete && <Button size={'small'}>Complete ✓</Button>}
          <Button
            className="mr-2 ml-auto"
            intent={'secondary'}
            size={'small'}
            onClick={handleRun}
            disabled={loading}
          >
            Run
          </Button>
          <Button size={'small'} onClick={handleSubmission} disabled={loading}>
            Submit
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Submission;
