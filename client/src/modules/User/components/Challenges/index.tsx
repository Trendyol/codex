import Card from '@components/ui/Card';
import { challengeTableFields, mockChallenges } from '@modules/User/models/constants';

const Challenges = () => {
  return (
    <Card className="rounded-xl overflow-x-auto min-h-[250px]">
      <div className="text-2xl font-semibold">Challenges</div>
      <table className="w-full overflow-x-scroll text-sm text-left mt-3">
        <thead className="text-xs text-gray-700 uppercase">
          <tr>
            {challengeTableFields.map((field) => (
              <th key={field} scope="col" className="py-3">
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockChallenges.map((challenge) => (
            <tr
              key={challenge.id}
              className="border-t border-gray-200 cursor-pointer hover:bg-gray-50"
            >
              {challengeTableFields.map((field) => (
                <td key={field} className="py-2.5 whitespace-nowrap">
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
