import Badge from '@components/shared/Badge';
import ListingCard from '@components/shared/ListingCard';
import Button from '@components/ui/Button';
import { useProblems } from '@hooks/data/useProblems';
import { Difficulty } from '@models/enums';
import { useRouter } from 'next/router';
import { FC } from 'react';

type ProblemsProps = {
  tags: string[];
};

const Problems: FC<ProblemsProps> = ({ tags }) => {
  const { problems } = useProblems(tags);
  const router = useRouter();

  const getProblemLink = (id: string) => `/problem/${id}`;

  return (
    <div className="flex flex-1 flex-col gap-4">
      {problems?.map(({ id, title, difficulty, solved, tags }) => {
        const tagTitles = tags?.map((tag) => tag.title).join(', ');
        return (
          <ListingCard
            href={getProblemLink(id)}
            title={title}
            subtitle={
              <div className="flex">
                <Badge
                  className="m-0 mr-1 bg-transparent bg-none p-0 capitalize"
                  intent={difficulty}
                >
                  {Difficulty[difficulty]}
                </Badge>
                {tagTitles && <div className="line-clamp-1 w-[70%] text-xs">• {tagTitles}</div>}
              </div>
            }
            action={
              <Button size={'small'} intent={solved ? 'secondary' : 'primary'} disabled={solved}>
                {solved ? 'Solved' : 'Solve'}
              </Button>
            }
            key={id}
          />
        );
      })}
    </div>
  );
};

export default Problems;
