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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel convallis ex, et
            venenatis enim. Morbi est mauris, bibendum sit amet erat ut, venenatis viverra sapien.
            Nam sollicitudin et quam nec mollis. Duis volutpat est malesuada, lacinia est sit amet,
            malesuada magna. In in scelerisque urna. Suspendisse consequat, risus et lacinia
            tincidunt, risus nunc tincidunt velit, in maximus est tortor eget nunc. Praesent et
            sapien sit amet neque mollis mollis sit amet at nunc. Proin vitae gravida purus. In
            dolor arcu, tempor vel porttitor efficitur, rhoncus id nulla.
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
