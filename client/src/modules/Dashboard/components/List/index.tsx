import { useChallenges, useParticipate } from '@hooks/data';
import Challenge from '../Challenge';

const List = () => {
  const { participate } = useParticipate();
  const { challenges } = useChallenges();

  return (
    <div className="flex flex-col gap-6 flex-1">
      {challenges?.map(({ id, name, status, teamSize, participated }) => (
        <Challenge key={id} id={id} name={name} description={name} />
      ))}
    </div>
  );
};

export default List;
