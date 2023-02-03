import Avatar from '@components/ui/Avatar';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import { useMe } from '@hooks/data/useMe';
import Link from 'next/link';
import Logo from '../Logo';

const Header = () => {
  const { me } = useMe();
  return (
    <div className="h-header border-b flex items-center gap-5 px-8 bg-white justify-between w-full sticky top-0 md:px-4 z-50">
      <div className="flex items-center ">
        <Logo />
        <div className="w-[440px] lg:w-[300px] md:w-[260px] sm:w-[140px] xs:w-[90px]">
          <Input placeholder="Search..." />
        </div>
      </div>
      <div className="flex items-center">
        {me ? (
          <Avatar id={me.id} name={me.name} avatar={me.avatar} points={3250} truncate />
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
