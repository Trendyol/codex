import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { FC } from 'react';
import { BsFillTrophyFill } from 'react-icons/bs';

type ChallengeProps = {
  title: string;
  description: string;
};

const Challenge: FC<ChallengeProps> = ({ title }) => {
  return (
    <Card>
      <div className="text-primary-400 text-xl font-semibold mb-6">{title}</div>
      <div className="flex">
        <div className="mr-6 h-14 w-14 bg-[#9694ff] rounded-md flex items-center justify-center">
          <BsFillTrophyFill color="white" size={32} />
        </div>
        <div className="flex flex-1 flex-col ">
          <div className="text-secondary-100 line-clamp-3">
            text-primary-400 text-xl font-semibold mb-6text-primary-400 text-xl font-semibold mb-6
            text-primary-400 text-xl font-semibold mb-6text-primary-400 text-xl font-semibold
            mb-6text-primary-400 text-xl font-semibold mb-6text-primary-400 text-xl font-semibold
            mb-6text-primary-400 text-xl font-semibold mb-6400 text-xl font-semibold mb-6
            text-primary-400 text-xl font-semibold mb-6text-primary-400 text-xl font-semibold
            mb-6text-primary-400 text-xl font-semibold mb-6text-primary-400 text-xl font-semibold
            mb-6text-primary-400 text-xl font-semibold mb-6
          </div>
          <div className="text-secondary-200 font-semibold flex justify-between mt-2">
            <div>27 Jan 2023 - Finished</div>
            <Button size={'small'} intent={'primary'}>
              Participate
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Challenge;

// <div
//   key={id}
//   onClick={() => router.push(`/lobby/${id}`)}
//   style={{
//     fontSize: '30px',
//     backgroundColor: '#444',
//     padding: '50px',
//     color: 'white',
//   }}
// >
//   <div>{name}</div>
//   <div>{Status[status]}</div>
//   <div>Team size: {teamSize}</div>
//   {participated ? (
//     <div style={{ color: 'red' }}>Participated</div>
//   ) : (
//     <button onClick={() => participate(id)}>Participate</button>
//   )}
// </div>
