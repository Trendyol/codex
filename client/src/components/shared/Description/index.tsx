/* eslint-disable react/no-children-prop */
import Card from '@components/ui/Card';
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
    <Card className="h-full overflow-auto">
      <div className="font-semibold text-primary-500">{title}</div>{' '}
      <Badge className="my-2 capitalize" intent={difficulty}>
        {Difficulty[difficulty]}
      </Badge>
      <ReactMarkdown children={content} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} />
    </Card>
  );
};

export default Description;
