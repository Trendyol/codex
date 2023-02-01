import { useChallenges, useParticipate } from '@hooks/data';
import Challenge from '../Challenge';

const List = () => {
  const { participate } = useParticipate();
  const { challenges } = useChallenges();

  return (
    <div className="flex flex-col gap-8">
      {challenges?.map(({ id, name, status, teamSize, participated }) => (
        <Challenge key={id} title={name} description={name} />
      ))}
    </div>
  );
};

export default List;