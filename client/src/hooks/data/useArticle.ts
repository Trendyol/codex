import useMutation from 'swr/mutation';
import axios from 'axios';

type ArticleParams = {
  title: string;
  content: string;
  isPublished: boolean;
  isApproved: boolean;
  likedBy: Array<string>;
  userId: string;
};
export const useArticle = (successCallback?: (data: any) => void) => {
  const { trigger, isMutating, data } = useMutation(
    'article',
    (_, { arg }: { arg: ArticleParams }) => {
      let url = `/publication/articles`;
      return axios.post(url, arg);
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
