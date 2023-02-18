import Badge from '@components/shared/Badge';
import Card from '@components/ui/Card';
import { useProblems } from '@hooks/data/useProblems';
import { Difficulty } from '@models/enums';
import { problemTableFields } from '@modules/Practice/models';
import { useRouter } from 'next/router';

const Problems = () => {
  const { problems } = useProblems();
  const router = useRouter();

  const handleProblemNavigation = (id: string) => {
    router.push(`/problem/${id}`);
  };

  return (
    <Card className="h-fit min-h-[600px] overflow-x-auto rounded-xl">
      <div className="text-xl font-semibold text-primary-400">Problems</div>
      <table className="mt-3 w-full overflow-x-scroll text-left text-sm text-gray-500">
        <thead className="text-xs uppercase text-gray-700">
          <tr>
            {problemTableFields.map((field) => (
              <th key={field} scope="col" className="py-3">
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {problems?.map(({ id, title, difficulty }) => (
            <tr
              onClick={() => handleProblemNavigation(id)}
              key={id}
              className="cursor-pointer border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="whitespace-nowrap py-2.5 text-black">{title}</td>
              <td className="whitespace-nowrap">
                <Badge className="capitalize" intent={difficulty}>
                  {Difficulty[difficulty]}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Problems;
