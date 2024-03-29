import Result from '@components/shared/Result';
import Testcases from '@components/shared/Testcases';
import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { useMe, useRoom } from '@hooks/data';
import { Testcase } from '@hooks/data/models/types';
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
import Link from 'next/link';

type SubmissionProps = {
  problemId: string;
  challengeId: string;
  teamId: string;
  language: Language;
  code?: string;
  action?: Action;
};

const Submission: FC<SubmissionProps> = ({
  problemId,
  challengeId,
  teamId,
  code,
  language,
  action,
}) => {
  const [selectedTestcase, setSelectedTestcase] = useState<Testcase>();
  const [activeTab, setActiveTab] = useState<SubmissionTabs>(SubmissionTabs.Testcase);
  const [result, setResult] = useState<SubmissionResult>();
  const [actionLoading, setActionLoading] = useState(false);

  const { me } = useMe();
  const { query, isReady } = useRouter();
  const { room } = useRoom(query.challenge as string, isReady);
  const { runTrigger, runLoading } = useRun((result) => setResult(result));
  const { submissionTrigger, submissionLoading } = useSubmission((result) => setResult(result));

  useEffect(() => {
    if (room?.team.id && me) sendAction(me, room?.team.id, ActionTypes.result, result);
  }, [result, room?.team.id, me]);

  const handleRun = () => {
    if (room?.team.id && me) sendAction(me, room?.team.id, ActionTypes.run);
    setActiveTab(SubmissionTabs.Result);
    runTrigger({ problemId, code, language, testcaseId: selectedTestcase?.id });
  };

  const handleSubmission = () => {
    if (room?.team.id && me) sendAction(me, room?.team.id, ActionTypes.submission);
    setActiveTab(SubmissionTabs.Result);
    submissionTrigger({ problemId, challengeId, teamId, code, language });
  };

  const handleActiveSubmissionTabChange = () => {
    setActiveTab((activeTab) =>
      activeTab == SubmissionTabs.Testcase ? SubmissionTabs.Result : SubmissionTabs.Testcase,
    );
  };

  useEffect(() => {
    switch (action?.key) {
      case ActionTypes.run:
      case ActionTypes.submission:
        setActiveTab(SubmissionTabs.Result);
        setActionLoading(true);
        break;
      case ActionTypes.result:
        setActionLoading(false);
        setResult(action.data);
    }
  }, [action?.key]);

  const loading = actionLoading || runLoading || submissionLoading;
  const accepted = result?.status == SubmissionStatus.Accepted;
  const isSubmission = result?.type == SubmissionTypes.Submission;
  const showResult = activeTab == SubmissionTabs.Result && result && !loading;
  const showTestcase = activeTab == SubmissionTabs.Testcase && !loading;
  const showComplete = accepted && isSubmission;

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
            onClick={handleActiveSubmissionTabChange}
            className={cx(
              'absolute right-6 top-6 ml-auto cursor-pointer whitespace-nowrap rounded-lg bg-background-200 bg-opacity-90 p-2 text-[10px] first-letter:cursor-pointer  hover:bg-background-100',
              loading ? 'cursor-not-allowed opacity-60' : '',
            )}
          >
            {activeTab == SubmissionTabs.Testcase ? 'Result' : 'Testcase'}
          </button>
        )}
        <div className="flex">
          {showComplete && (
            <Link href={`/lobby/${challengeId}/discussion`}>
              <Button size={'small'}>Complete ✓</Button>
            </Link>
          )}
          <Button
            className="ml-auto mr-2"
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
