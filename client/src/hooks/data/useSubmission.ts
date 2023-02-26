import useMutation from 'swr/mutation';
import axios from 'axios';

export const useSubmission = () => {
  const code = 'Y29uc29sZS5sb2coIkhpIGFsbCIpOw==';
  const { trigger, isMutating, data } = useMutation(
    'submission',
    (_, { arg }) => {
      let url = `/submission/${arg.problemId}`;
      if (arg.challengeId && arg.teamId) {
        url += `?challengeId=${arg.challengeId}&teamId=${arg.teamId}`;
      }

      return axios.post(url, {
        code:  code || arg.code,
        language: arg.language,
        team: arg.team,
      });
    },
    {},
  );

  return {
    submissionTrigger: trigger,
    submissionLoading: isMutating,
    submission: data,
  };
};
