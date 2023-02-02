import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { BsFillTrophyFill } from 'react-icons/bs';

const Suggestion = () => {
  return (
    <Card className="whitespace-nowrap flex flex-col items-center gap-4">
      <div className="text-primary-400 text-lg font-semibold">Suggest New Challenge</div>
      <div className="w-20 h-20 bg-[#5ddab4] flex items-center justify-center rounded-md">
        <BsFillTrophyFill color="white" size={50} radius={55} />
      </div>
      <Button intent={'secondary'} fluid>
        Suggest Challenge
      </Button>
    </Card>
  );
};

export default Suggestion;
