/* eslint-disable react/no-children-prop */
import Card from '@components/ui/Card';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Badge from '../Badge';
import { mockProblem } from './models/constants';

type DescriptionProps = {
  title?: string;
};

const Description: FC<DescriptionProps> = ({ title }) => {
  return (
    <Card className="h-full overflow-auto">
      <div className="font-semibold text-primary-500">{title}</div>{' '}
      <Badge className="my-2" intent={'hard'}>
        Hard
      </Badge>
      <ReactMarkdown
        children={mockProblem}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      />
    </Card>
  );
};

export default Description;
