import Community from '@components/shared/Community';
import Leaderboard from '@components/shared/Leaderboard';
import Progression from '@components/shared/Progression';
import Suggestion from '@components/shared/Suggestion';
import { Card } from 'flowbite-react';
import { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const CreateArticle = () => {
  const [content, setContent] = useState('');

  return (
    <>
      <div className="flex flex-1 gap-6">
        <Card className="mb-6 flex h-fit flex-1 overflow-x-auto rounded-lg">
          <div className="text-xl font-semibold text-primary-400">Create Article</div>

          <div className="editor flex gap-2">
            <textarea spellCheck={false} onChange={(e) => setContent(e.target.value)}></textarea>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </Card>

        <div className="flex w-sidebar flex-shrink-0 flex-col gap-6 xl:w-[270px] md:hidden">
          <Progression />
          <Leaderboard />
          <Community />
          <Suggestion />
        </div>
      </div>
    </>
  );
};

export default CreateArticle;
