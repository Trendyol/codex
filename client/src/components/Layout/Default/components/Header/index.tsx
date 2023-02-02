import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import { useMe } from '@hooks/data/useMe';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../Logo';

const Header = () => {
  const { me } = useMe();
  return (
    <div className="h-header border-b flex items-center gap-5 px-8 bg-white justify-between w-full sticky top-0 md:px-4">
      <div className="flex items-center ">
        <Logo />
        <div className="w-[440px] lg:w-[300px] md:w-[260px] sm:w-[140px]">
          <Input placeholder="Search..." />
        </div>
      </div>
      <div className="flex items-center">
        {me ? (
          <div className="flex items-center mr-8">
            <div className="mr-4 rounded-md overflow-hidden xs:hidden">
              <Image src={me.avatar} width={42} height={42} alt="avatar" />
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <div className="font-semibold truncate xs:max-w-[120px]">{me.name}</div>
              <div className="text-xs text-secondary-100 truncate xs:max-w-[120px]">350 Points</div>
            </div>
          </div>
        ) : (
          <>
            <Link href={'/login'}>
              <Button className="mr-4 md:hidden">Log in</Button>
            </Link>
            <Button intent={'secondary'}>
              Create<span className="sm:hidden"> account</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
