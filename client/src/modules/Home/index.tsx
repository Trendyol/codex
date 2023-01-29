import { useChallenges, useParticipate } from '@hooks/data';
import { Status } from '@models/enums';
import { useRouter } from 'next/router';

const Home = () => {
  const { challenges } = useChallenges();
  const { participate } = useParticipate();
  const router = useRouter();

  return (
    <div>
      <div>
        {challenges?.map(({ id, name, status, teamSize, participated }) => (
          <div
            key={id}
            onClick={() => router.push(`/lobby/${id}`)}
            style={{
              fontSize: '30px',
              backgroundColor: '#444',
              padding: '50px',
              color: 'white',
            }}
          >
            <div>{name}</div>
            <div>{Status[status]}</div>
            <div>Team size: {teamSize}</div>
            {participated ? (
              <div style={{ color: 'red' }}>Participated</div>
            ) : (
              <button onClick={() => participate(id)}>Participate</button>
            )}
          </div>
        ))}
      </div>
      <div>Home</div>
    </div>
  );
};

export default Home;
