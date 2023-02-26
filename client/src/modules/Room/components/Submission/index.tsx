import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { useRoom } from '@hooks/data';
import { useRun } from '@hooks/data/useRun';
import { useSubmission } from '@hooks/data/useSubmission';
import { Language, SubmissionStatus, SubmissionTabs, SubmissionTypes } from '@models/enums';
import { SubmissionResult } from '@models/types';
import { ActionTypes } from '@modules/Room/models/enum';
import { Action } from '@modules/Room/models/types';
import { sendAction } from '@services/room';
import { cx } from 'class-variance-authority';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import Spinner from '../../../../components/shared/Spinner';
import Result from '../Result';
import Testcase from '../Testcase';

type SubmissionProps = {
  problemId: string;
  challengeId: string;
  teamId: string;
  code: string;
  language: Language;
  action: Action;
};

const Submission: FC<SubmissionProps> = ({
  problemId,
  challengeId,
  teamId,
  code,
  language,
  action,
}) => {
  const { query } = useRouter();
  const { room } = useRoom(query.challenge as string);
  const [selectedTestcase, setSelectedTestcase] = useState<Testcase>();
  const [activeSubmissionTab, setActiveSubmissionTab] = useState<SubmissionTabs>(
    SubmissionTabs.Testcase,
  );
  const [result, setResult] = useState<SubmissionResult>();
  const { runTrigger, run, runLoading } = useRun();
  const { submissionTrigger, submission, submissionLoading } = useSubmission();
  const [actionLoading, setActionLoading] = useState(false);

  const handleRun = () => {
    if (room?.team.id) sendAction(room?.team.id, ActionTypes.run);
    setActiveSubmissionTab(SubmissionTabs.Result);
    runTrigger({ problemId, code, language, testcaseId: selectedTestcase?.id });
  };

  const handleSubmission = () => {
    if (room?.team.id) sendAction(room?.team.id, ActionTypes.submission);
    setActiveSubmissionTab(SubmissionTabs.Result);
    submissionTrigger({ problemId, challengeId, teamId, code, language });
  };

  useEffect(() => {
    if (room?.team.id) sendAction(room?.team.id, ActionTypes.runResult, run?.data);
    setResult(run?.data);
  }, [run, room?.team.id]);

  useEffect(() => {
    if (room?.team.id) sendAction(room?.team.id, ActionTypes.submissionResult, submission?.data);
    setResult(submission?.data);
  }, [submission, room?.team.id]);

  const handleActiveSubmissionTabChange = () => {
    setActiveSubmissionTab((activeSubmissionTab) =>
      activeSubmissionTab == SubmissionTabs.Testcase
        ? SubmissionTabs.Result
        : SubmissionTabs.Testcase,
    );
  };

  useEffect(() => {
    console.log('action', action);
    switch (action?.key) {
      case ActionTypes.run:
      case ActionTypes.submission:
        setActiveSubmissionTab(SubmissionTabs.Result);
        setActionLoading(true);
        break;
      case ActionTypes.runResult:
      case ActionTypes.submissionResult:
        setActionLoading(false);
        setResult(action.data);
    }
  }, [action]);

  const loading = actionLoading || runLoading || submissionLoading;
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
