import Card from '@components/ui/Card';
import { Challenge } from '@hooks/data/models/types';
import { mockChallenges } from '@modules/User/models/constants';

const challengeTableFields: Partial<keyof Challenge>[] = ['name', 'score', 'ranking', 'date'];

const Questions = () => {
  return (
    <Card className="p-0 rounded-xl overflow-x-auto h-fit min-h-[300px] ">
      <div className="p-8 relative">
        <div className="text-2xl font-semibold">Questions</div>
      </div>
    </Card>
  );
};

export default Questions;
