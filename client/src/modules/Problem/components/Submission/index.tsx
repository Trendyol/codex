import Result from '@components/shared/Result';
import Testcases from '@components/shared/Testcases';
import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { Testcase } from '@hooks/data/models/types';
import { useRun } from '@hooks/data/useRun';
import { useSubmission } from '@hooks/data/useSubmission';
import { Language, SubmissionStatus, SubmissionTabs, SubmissionTypes } from '@models/enums';
import { SubmissionResult } from '@models/types';
import { cx } from 'class-variance-authority';
import { FC, useState } from 'react';
import Spinner from '../../../../components/shared/Spinner';

type SubmissionProps = {
  problemId: string;
  code?: string;
  language: Language;
};

const Submission: FC<SubmissionProps> = ({ problemId, code, language }) => {
  const [activeTab, setActiveTab] = useState<SubmissionTabs>(SubmissionTabs.Testcase);
  const [selectedTestcase, setSelectedTestcase] = useState<Testcase>();

  const [result, setResult] = useState<SubmissionResult>();
  const { runTrigger, runLoading } = useRun((result) => setResult(result));
  const { submissionTrigger, submissionLoading } = useSubmission((result) => setResult(result));

  const handleRun = () => {
    setActiveTab(SubmissionTabs.Result);
    runTrigger({ problemId, code, language, testcaseId: selectedTestcase?.id });
  };

  const handleSubmission = () => {
    setActiveTab(SubmissionTabs.Result);
    submissionTrigger({ problemId, code, language });
  };

  const handleActiveTabChange = () => {
    setActiveTab((activeTab) =>
      activeTab == SubmissionTabs.Testcase ? SubmissionTabs.Result : SubmissionTabs.Testcase,
    );
  };

  const loading = runLoading || submissionLoading;
  const showResult = activeTab == SubmissionTabs.Result && result && !loading;
  const showTestcase = activeTab == SubmissionTabs.Testcase && !loading;

  return (
    <Card className="relative">
      <div className="flex h-48 flex-col justify-between">
        {loading && <Spinner />}
        {showTestcase && (
          <Testcases
            selectedTestcase={selectedTestcase}
            onSelectedTestcaseChange={setSelectedTestcase}
            problemId={problemId}
          />
        )}
        {showResult && <Result result={result} />}
        {result && (
          <button
            disabled={loading}
            onClick={handleActiveTabChange}
            className={cx(
              'absolute top-6 right-6 ml-auto cursor-pointer whitespace-nowrap rounded-lg bg-background-200 bg-opacity-90 p-2 text-[10px] first-letter:cursor-pointer  hover:bg-background-100',
              loading ? 'cursor-not-allowed opacity-60' : '',
            )}
          >
            {activeTab == SubmissionTabs.Testcase ? SubmissionTabs.Result : SubmissionTabs.Testcase}
          </button>
        )}
        <div className="flex">
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
