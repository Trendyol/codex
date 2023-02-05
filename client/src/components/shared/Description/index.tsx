/* eslint-disable react/no-children-prop */
import Card from '@components/ui/Card';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Badge from '../Badge';

type DescriptionProps = {
  title?: string;
};

const markdowne = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.
* Lists
* [ ] todo
* [x] done
<div class="note">

Some *emphasis* and <strong>strong</strong>!
<pre>
dddee
</pre>

<code>code</code>
</div>

A table:

| a | b |
| - | - |
* [x] done
<div class="note">
<p>Given two strings <code>x</code> ssss</p>

Some *emphasis* and <strong>strong</strong>!
<pre>
dddee
</pre>

<code>code</code>
</div>

A table:

| a | b |
| - | - |
* [x] done
<div class="note">

Some *emphasis* and <strong>strong</strong>!
<pre>
dddee
</pre>

<code>code</code>
</div>

A table:

| a | b |
| - | - |
`;

const Description: FC<DescriptionProps> = ({ title }) => {
  return (
    <Card className="h-full overflow-auto resize-x max-w-[500px]">
      <div className="markdown h-full">
        <div className="font-semibold text-primary-500">{title}</div>{' '}
        <Badge className="my-2" intent={'hard'}>
          Hard
        </Badge>
        <ReactMarkdown
          children={markdowne}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
        />
      </div>
    </Card>
  );
};

export default Description;
