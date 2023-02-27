import useSWR from 'swr';
import { Testcase } from './models/types';

export const useTestcases = (problemId: string) => {
  const { data, error, isLoading, mutate } = useSWR<Testcase[]>(`/testcase?problemId=${problemId}`);

  return {
    error,
    isLoading,
    testcases: data,
    mutateTestcases: mutate,
  };
};
