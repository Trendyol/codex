import Card from '@components/ui/Card';
import Checkbox from '@components/ui/Checkbox';
import { useTags } from '@hooks/data/useTags';
import { FC, useState } from 'react';

type FilterProps = {
  forArticle?: boolean;
  forProblem?: boolean;
  onFilter?: (tags: string[]) => void;
};

const Filter: FC<FilterProps> = ({ forArticle, forProblem, onFilter }) => {
  const { tags } = useTags({ forArticle, forProblem });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSelectTag = (tagId: string) => () => {
    let newSelectedTags;
    if (selectedTags.includes(tagId)) newSelectedTags = selectedTags.filter((tag) => tag !== tagId);
    else newSelectedTags = [...selectedTags, tagId];
    setSelectedTags(newSelectedTags);
    if (onFilter) onFilter(newSelectedTags);
  };

  return (
    <Card className="flex flex-col items-center">
      <div className="text-lg font-semibold text-primary-400">Filters</div>
      <div className="mt-4 flex w-full flex-col gap-1.5">
        {tags?.map((tag) => {
          const tagSelected = selectedTags.includes(tag.id);
          return (
            <Checkbox
              key={tag.id}
              label={tag.title}
              checked={tagSelected}
              onChange={handleSelectTag(tag.id)}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default Filter;
