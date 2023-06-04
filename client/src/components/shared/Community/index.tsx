import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import Link from 'next/link';
import { BsDiscord } from 'react-icons/bs';
import { COMMUNITY_LINK } from './models/constants';

const Community = () => {
  return (
    <Card className="flex flex-col items-center gap-6 whitespace-nowrap">
      <div className="text-lg font-semibold text-primary-400">Join Codex Community</div>
      <div className="flex h-20 w-20 items-center justify-center rounded-md bg-[#7788D4]">
        <BsDiscord color="white" size={50} radius={55} />
      </div>
      <Link href={COMMUNITY_LINK} target="_blank" className="w-full">
        <Button intent={'secondary'} fluid>
          Join Us
        </Button>
      </Link>
    </Card>
  );
};

export default Community;
