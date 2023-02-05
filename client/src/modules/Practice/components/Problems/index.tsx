import Badge from '@components/shared/Badge';
import Card from '@components/ui/Card';
import { useProblems } from '@hooks/data/useProblems';
import { Difficulty } from '@models/enums';
import { problemTableFields } from '@modules/Practice/models';

const Problems = () => {
  const { problems } = useProblems();

  return (
    <Card className="rounded-xl overflow-x-auto h-fit min-h-[600px]">
      <div className="text-primary-400 text-xl font-semibold">Problems</div>
      <table className="w-full overflow-x-scroll text-sm text-left text-gray-500 mt-3">
        <thead className="text-xs text-gray-700 uppercase">
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
            <tr key={id} className="border-t border-gray-200 cursor-pointer hover:bg-gray-50">
              <td className="py-2.5 whitespace-nowrap text-black">{title}</td>
              <td className="whitespace-nowrap">
                <Badge className="capitalize" intent={Difficulty[difficulty]}>
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
