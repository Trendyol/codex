import useMutation from 'swr/mutation';
import axios from 'axios';
import { encodeBase64 } from '@utils/converter';

export const useRun = (successCallback?: (data: any) => void) => {
  const { trigger, isMutating, data } = useMutation(
    'run',
    (_, { arg }) =>
      axios.post(`/submission/${arg.testcaseId}/run`, {
        code: encodeBase64(arg.code),
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
