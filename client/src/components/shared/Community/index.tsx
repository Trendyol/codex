import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { BsSlack } from 'react-icons/bs';

const Community = () => {
  return (
    <Card className="whitespace-nowrap flex flex-col items-center gap-6">
      <div className="text-primary-400 text-lg font-semibold">Join Codex Community</div>
      <div className="w-20 h-20 bg-[#57caeb] flex items-center justify-center rounded-md">
        <BsSlack color="white" size={50} radius={55} />
      </div>
      <Button intent={'secondary'} fluid>
        Join Guild
      </Button>
    </Card>
  );
};

export default Community;
