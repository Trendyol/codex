import useSWR from 'swr';

export const useDefaultCode = (id?: string, language?: number, isReady = true) => {
  const { data, error, isLoading, mutate } = useSWR<string>(
    isReady ? `/problem/${id}/default-code/${language}` : null,
  );

  return {
    error,
    isLoading,
    defaultCode: data,
    mutateDefaultCode: mutate,
  };
};
