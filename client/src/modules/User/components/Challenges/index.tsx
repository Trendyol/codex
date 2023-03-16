import Card from '@components/ui/Card';
import { useUser } from '@hooks/data';
import { challengeTableFields } from '@modules/User/models/constants';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';

const Challenges = () => {
  const { push, query, isReady } = useRouter();
  const { user } = useUser(query.user as string, isReady);

  if (!user?.challenges) return <></>;

  const handleChallengeNavigation = (id: string) => {
    push(`/challenge/${id}`);
  };

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
          {user?.challenges?.map(({ id, name, ranking, date }) => (
            <tr
              onClick={() => handleChallengeNavigation(id)}
              key={id}
              className="cursor-pointer border-t border-border hover:bg-background-50"
            >
              <td className="whitespace-nowrap py-2.5">{name}</td>
              {<td className="whitespace-nowrap py-2.5">{ranking ? ranking : '-'}</td>}
              <td className="whitespace-nowrap py-2.5">
                {DateTime.fromISO(date).toFormat('dd LLL yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Challenges;
