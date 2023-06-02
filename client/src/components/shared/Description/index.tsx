/* eslint-disable react/no-children-prop */
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Badge from '../Badge';
import { Difficulty } from '@models/enums';

type DescriptionProps = {
  title: string;
  content: string;
  difficulty: Difficulty;
};

const Description: FC<DescriptionProps> = ({ title, content, difficulty }) => {
  return (
    <div className="h-full overflow-auto p-6">
      <div className="mb-2 flex items-center gap-2">
        <div
          title={title}
          className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-primary-500"
        >
          {title}
        </div>

        <Badge className="capitalize" intent={difficulty}>
          {Difficulty[difficulty]}
        </Badge>
      </div>
      <ReactMarkdown
        children={content}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        className="text-[13px]"
      />
    </div>
  );
};

export default Description;
