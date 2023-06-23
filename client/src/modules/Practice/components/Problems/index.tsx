import Badge from '@components/shared/Badge';
import ListingCard from '@components/shared/ListingCard';
import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { useProblems } from '@hooks/data/useProblems';
import { Difficulty } from '@models/enums';
import { problemTableFields } from '@modules/Practice/models';
import { useRouter } from 'next/router';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const Problems = () => {
  const { problems } = useProblems();
  const router = useRouter();

  const handleProblemNavigation = (id: string) => {
    router.push(`/problem/${id}`);
  };

  const getProblemLink = (id: string) => `/problem/${id}`;

  return (
    <div className="flex flex-1 flex-col gap-4">
      {problems?.map(({ id, title, difficulty, solved, content }) => (
        // <tr
        //   key={id}
        //   onClick={() => handleProblemNavigation(id)}
        //   className="cursor-pointer border-t border-border hover:bg-background-50"
        // >
        //   <td className="text whitespace-nowrap py-3">{title}</td>
        //   <td className="">
        //     <Badge className="capitalize" intent={difficulty}>
        //       {Difficulty[difficulty]}
        //     </Badge>
        //   </td>
        //   <td>{solved && <AiOutlineCheckCircle size={20} />}</td>
        // </tr>

        <ListingCard
          href={getProblemLink(id)}
          title={title}
          subtitle={
            <div className="flex gap-1">
              <Badge className="m-0 bg-transparent bg-none p-0 capitalize" intent={difficulty}>
                {Difficulty[difficulty]}
              </Badge>
              <div className="line-clamp-1 w-[70%] text-xs">{content}</div>
            </div>
          }
          action={
            solved ? (
              <Button size={'small'} intent={'primary'}>
                Solve
              </Button>
            ) : (
              <Button size={'small'} intent={'secondary'} disabled>
                Solved
              </Button>
            )
          }
          key={id}
        />
      ))}
    </div>
  );
};

export default Problems;
