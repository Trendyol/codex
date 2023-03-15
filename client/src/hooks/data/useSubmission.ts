import useMutation from 'swr/mutation';
import axios from 'axios';
import { encodeBase64 } from '@utils/converter';
import { Language } from '@models/enums';
type SubmissionParams = {
  problemId: string;
  code?: string;
  challengeId?: string;
  teamId?: string;
  language: Language;
  team?: string;
};
export const useSubmission = (successCallback?: (data: any) => void) => {
  const { trigger, isMutating, data } = useMutation(
    'submission',
    (_, { arg }: { arg: SubmissionParams }) => {
      let url = `/submission/${arg.problemId}`;
      if (arg.challengeId && arg.teamId) {
        url += `?challengeId=${arg.challengeId}&teamId=${arg.teamId}`;
      }

      return axios.post(url, {
        code: encodeBase64(arg.code),
        language: arg.language,
        team: arg.team,
      });
    },
    {
      onSuccess: ({ data }) => successCallback?.(data),
    },
  );

  return {
    submissionTrigger: trigger,
    submissionLoading: isMutating,
    submission: data,
  };
};
