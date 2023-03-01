import useMutation from 'swr/mutation';
import axios from 'axios';

export const useRun = (successCallback?: (data: any) => void) => {
  const { trigger, isMutating, data } = useMutation(
    'run',
    (_, { arg }) =>
      axios.post(`/submission/${arg.testcaseId}/run`, {
        code: 'Y29uc29sZS5sb2coIkhpIGFsbCIpOw==' || arg.code,
        language: arg.language,
        problemId: arg.problemId,
      }),
    {
      onSuccess: ({ data }) => successCallback?.(data),
    },
  );

  return {
    runTrigger: trigger,
    runLoading: isMutating,
    run: data,
  };
};