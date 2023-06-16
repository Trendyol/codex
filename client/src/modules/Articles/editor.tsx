import Leaderboard from '@components/shared/Leaderboard';
import Progression from '@components/shared/Progression';
import Suggestion from '@components/shared/Suggestion';
import { FC, useContext, useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import Card from '@components/ui/Card';
import { ThemeContext } from '@contexts/ThemeContext';
import TabsGroup from '@components/shared/TabsGroup';
import Button from '@components/ui/Button';
import { useArticle } from '@hooks/data/useArticle';
import Input from '@components/ui/Input';
import { EditorView } from '@codemirror/view';
import Spinner from '@components/shared/Spinner';
import Community from '@components/shared/Community';
import { useArticleById } from '@hooks/data/useArticleById';
import { useRouter } from 'next/router';
import { useArticleDelete } from '@hooks/data/useArticleDelete';
import { toast } from 'react-toastify';

type ArticleEditorProps = {
  edit?: boolean;
};

const ArticleEditor: FC<ArticleEditorProps> = ({ edit = false }) => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const articleId = router.query.id as string;
  const { article, isLoading } = useArticleById(articleId, edit);

  const { articleTrigger: articleCreateTrigger, articleLoading: isCreating } = useArticle(
    articleId,
    (submitResult) => {
      toast.success(articleId ? 'Article Updated!' : 'Article Created!');
      router.push(articleId ? `/articles/${articleId}` : '/articles');
    },
  );

  const { articleTrigger: articleDeleteTrigger, articleLoading: isDeleting } = useArticleDelete(
    articleId,
    (deleteResult) => {
      toast.success('Article Deleted!');
      router.push('/articles');
    },
  );

  function handleArticleSubmit(isPublished: boolean) {
    const confirmed = confirm('Are you sure?');
    if (!confirmed) return;

    articleCreateTrigger({
      title,
      content,
      isPublished,
    });
  }

  function handleArticleDelete() {
    const confirmed = confirm('Are you sure?');
    if (!confirmed) return;

    articleDeleteTrigger();
  }

  useEffect(() => {
    if (!edit || !article) {
      return;
    }

    setTitle(article.title);
    setContent(article.content);
  }, [article]);

  if (edit && isLoading) {
    return <Spinner />;
  }

  if (isCreating || isDeleting) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-1 gap-6">
      <Card className="break-word flex flex-col gap-6 overflow-hidden">
        <div className="text-xl font-semibold text-primary-400">
          {edit ? 'Edit Article' : 'Create Article'}
        </div>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TabsGroup tabs={['Edit', 'Preview']} className="h-[600px] max-h-[600px]">
          <div className="editor flex w-full gap-2">
            <CodeMirror
              value={content}
              onChange={(value) => setContent(value)}
              extensions={[
                markdown({ base: markdownLanguage, codeLanguages: languages }),
                EditorView.lineWrapping,
              ]}
              basicSetup={{
                lineNumbers: false,
                foldGutter: false,
                highlightActiveLineGutter: false,
                highlightActiveLine: false,
              }}
              placeholder="Start writing your article here..."
              theme={theme}
              maxWidth="100%"
              height="100%"
              className="prose w-full max-w-none rounded-lg border-none"
            />
          </div>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            className="prose p-4 text-secondary-200 prose-headings:text-secondary-200"
          >
            {'# ' + title + '\n\n' + content}
          </ReactMarkdown>
        </TabsGroup>

        <div className="flex justify-end gap-3">
          {edit && (
            <Button intent={'danger'} onClick={() => handleArticleDelete()}>
              Delete Article
            </Button>
          )}
          <Button intent={'secondary'} onClick={() => handleArticleSubmit(false)}>
            Save as Draft
          </Button>
          <Button onClick={() => handleArticleSubmit(true)}>Publish</Button>
        </div>
      </Card>

      <div className="flex w-sidebar flex-shrink-0 flex-col gap-6 xl:w-[270px] md:hidden">
        <Progression />
        <Leaderboard />
        <Community />
        <Suggestion />
      </div>
    </div>
  );
};

export default ArticleEditor;
