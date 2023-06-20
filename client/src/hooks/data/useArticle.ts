import useMutation from 'swr/mutation';
import axios from 'axios';

type ArticleParams = {
  title: string;
  content: string;
  isPublished: boolean;
};
export const useArticle = (articleId?: string, successCallback?: (data: any) => void) => {
  const { trigger, isMutating, data } = useMutation(
    'article',
    (_, { arg }: { arg: ArticleParams }) => {
      let url = `/publication/articles/`;
      if (articleId) {
        return axios.put(url + articleId, arg);
      } else {
        return axios.post(url, arg);
      }
    },
    {
      onSuccess: ({ data }) => successCallback?.(data),
    },
  );

  return {
    articleTrigger: trigger,
    articleLoading: isMutating,
    article: data,
  };
};
