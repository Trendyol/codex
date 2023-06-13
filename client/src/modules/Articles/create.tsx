import Community from '@components/shared/Community';
import Leaderboard from '@components/shared/Leaderboard';
import Progression from '@components/shared/Progression';
import Suggestion from '@components/shared/Suggestion';
import { useContext, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import Card from '@components/ui/Card';
import { ThemeContext } from '@contexts/ThemeContext';
import TabsGroup from '@components/shared/TabsGroup';


const CreateArticle = () => {
  const { theme } = useContext(ThemeContext);
  const [content, setContent] = useState('');

  return (
    <>
      <div className="flex flex-1 gap-6">
        <Card>
          <div className="text-xl font-semibold text-primary-400">Create Article</div>
          <TabsGroup tabs={['Edit', 'Preview']} className="mt-5">
            <div className="editor flex w-full gap-2">
              <CodeMirror
                value={content}
                onChange={(value) => setContent(value)}
                extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
                basicSetup={{
                  lineNumbers: false,
                  foldGutter: false,
                  highlightActiveLineGutter: false,
                  highlightActiveLine: false,
                }}
                placeholder="Start writing your article here..."
                theme={theme}
                height="100%"
                minHeight="600px"
                className="w-full rounded-lg border-none bg-red-500"
              />
            </div>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              className="prose prose-slate min-h-[600px] p-4 dark:prose-invert"
            >
              {content}
            </ReactMarkdown>
          </TabsGroup>
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
