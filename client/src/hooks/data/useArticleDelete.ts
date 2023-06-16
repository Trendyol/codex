import useMutation from 'swr/mutation';
import axios from 'axios';

export const useArticleDelete = (articleId: string, successCallback?: (data: any) => void) => {
  const { trigger, isMutating, data } = useMutation(
    'article',
    (_) => {
      return axios.delete(`/publication/articles/${articleId}`);
    },
    { onSuccess: ({ data }) => successCallback?.(data) },
  );

  return {
    articleTrigger: trigger,
    articleLoading: isMutating,
    article: data,
  };
};
