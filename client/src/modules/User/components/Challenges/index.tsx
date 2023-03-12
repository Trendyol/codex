import Card from '@components/ui/Card';
import { challengeTableFields, mockChallenges } from '@modules/User/models/constants';

const Challenges = () => {
  return (
    <Card className="min-h-[250px] overflow-x-auto rounded-lg">
      <div className="text-2xl font-semibold">Challenges</div>
      <table className="mt-3 w-full overflow-x-scroll text-left text-sm">
        <thead className="text-xs uppercase">
          <tr>
            {challengeTableFields.map((field) => (
              <th key={field} scope="col" className="py-3">
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockChallenges.map((challenge: any) => (
            <tr
              key={challenge.id}
              className="cursor-pointer border-t border-border hover:bg-background-50"
            >
              {challengeTableFields.map((field) => (
                <td key={field} className="whitespace-nowrap py-2.5">
                  {challenge[field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Challenges;
