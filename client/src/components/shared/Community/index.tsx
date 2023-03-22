import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { BsSlack } from 'react-icons/bs';

const Community = () => {
  return (
    <Card className="flex flex-col items-center gap-6 whitespace-nowrap">
      <div className="text-lg font-semibold text-primary-400">Join Codex Community</div>
      <div className="flex h-20 w-20 items-center justify-center rounded-md bg-[#57caeb]">
        <BsSlack color="white" size={50} radius={55} />
      </div>
      <Button intent={'secondary'} fluid>
        Join Guild
      </Button>
    </Card>
  );
};

export default Community;
