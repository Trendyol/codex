import { useChallenges } from '@hooks/data';
import Challenge from '../Challenge';

const List = () => {
  const { challenges } = useChallenges();

  return (
    <div className="flex flex-1 flex-col gap-6">
      {challenges?.map((challenge) => (
        <Challenge key={challenge.id} {...challenge} />
      ))}
    </div>
  );
};

export default List;
