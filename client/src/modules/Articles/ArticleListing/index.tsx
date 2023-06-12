import Card from '@components/ui/Card';
import { FC } from 'react';
import { BsFillTrophyFill } from 'react-icons/bs';
import Link from 'next/link';

const ArticleListing: FC<any> = () => {
  return (
    <Link href={'/'}>
      <Card className="min-w-[260px]">
        <div className="mb-4 text-xl font-semibold text-primary-400">name</div>
        <div className="flex">
          <div className="mr-6 flex h-12 w-12 items-center justify-center rounded-md bg-[#9694ff] lg:hidden">
            <BsFillTrophyFill color="white" size={28} />
          </div>
          <div className="flex flex-1 flex-col ">
            <div className="mb-1 line-clamp-3 h-[72px] whitespace-pre-wrap text-secondary-200">
              description
            </div>
            <div className="flex h-[36px] justify-between font-semibold text-secondary-200 lg:text-sm">
              <div className="mt-auto text-sm capitalize">date - status</div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ArticleListing;
