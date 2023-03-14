import Badge from '@components/shared/Badge';
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

  return (
    <Card className="h-fit min-h-[600px] overflow-x-auto rounded-lg">
      <div className="text-xl font-semibold text-primary-400">Problems</div>
      <table className="mt-3 w-full overflow-x-scroll text-left text-sm">
        <thead className="text-xs uppercase">
          <tr>
            {problemTableFields.map((field) => (
              <th key={field} scope="col" className="py-3">
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {problems?.map(({ id, title, difficulty, solved }) => (
            <tr
              key={id}
              onClick={() => handleProblemNavigation(id)}
              className="cursor-pointer border-t border-border hover:bg-background-50"
            >
              <td className="text whitespace-nowrap py-3">{title}</td>
              <td className="">
                <Badge className="capitalize" intent={difficulty}>
                  {Difficulty[difficulty]}
                </Badge>
              </td>
              <td>{solved && <AiOutlineCheckCircle size={20} />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Problems;
