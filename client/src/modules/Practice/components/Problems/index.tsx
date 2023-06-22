import Badge from '@components/shared/Badge';
import classNames from 'classnames';
import Card from '@components/ui/Card';
import { useProblems } from '@hooks/data/useProblems';
import { Difficulty, Status } from '@models/enums';
import { problemTableFields } from '@modules/Practice/models';
import { useRouter } from 'next/router';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const Problems = () => {
  const { problems } = useProblems();
  const router = useRouter();

  const handleProblemNavigation = (id: string) => {
    router.push(`/problem/${id}`);
  };

  const renderLock = () => {
    return (
      <svg fill="#435EBE" height="18px" width="18px" viewBox="0 0 330 330">
        <g id="XMLID_509_">
          <path
            id="XMLID_510_"
            d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85   S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15   s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25   C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"
          />
        </g>
      </svg>
    );
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
          {problems?.map(({ id, title, difficulty, solved, isAvailable }) => (
            <tr
              key={id}
              onClick={() => isAvailable && handleProblemNavigation(id)}
              className={classNames(
                'border-t border-border hover:bg-background-50',
                {'cursor-not-allowed': !isAvailable },
                {'cursor-pointer': isAvailable },
              )}
            >
              <td className="text whitespace-nowrap py-3">
                <span className="flex gap-2">
                  {!isAvailable && renderLock()}
                  {title}
                </span>
              </td>
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
