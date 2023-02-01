import { useChallenges, useParticipate } from '@hooks/data';
import { Status } from '@models/enums';
import { useRouter } from 'next/router';
import Card from './components/Card';

const Home = () => {
  const { challenges } = useChallenges();
  const { participate } = useParticipate();
  const router = useRouter();

  return (
    <div>
      <div className='flex flex-col gap-8'>
        {challenges?.map(({ id, name, status, teamSize, participated }) => (
          <Card key={id} title={name} description={name} />
        ))}
      </div>
    </div>
  );
};

export default Home;
