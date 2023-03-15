import useMutation from 'swr/mutation';
import axios from 'axios';
import { encodeBase64 } from '@utils/converter';
import { Language } from '@models/enums';

type RunParams = {
  testcaseId?: string;
  code?: string;
  language: Language;
  problemId: string;
};
export const useRun = (successCallback?: (data: any) => void) => {
  const { trigger, isMutating, data } = useMutation(
    'run',
    (_, { arg }: { arg: RunParams }) =>
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
