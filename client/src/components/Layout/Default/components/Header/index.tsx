import Avatar from '@components/ui/Avatar';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import { useMe } from '@hooks/data/useMe';
import Link from 'next/link';
import Logo from '../Logo';

const Header = () => {
  const { me } = useMe();
  return (
    <div className="sticky top-0 z-50 flex h-header w-full items-center justify-between gap-5 border-b bg-white px-8 md:px-4">
      <div className="flex items-center ">
        <Logo />
        <div className="w-[440px] lg:w-[300px] md:w-[260px] sm:w-[140px] xs:w-[90px]">
          <Input placeholder="Search..." />
        </div>
      </div>
      <div className="flex items-center">
        {/* <ThemeToggle /> */}
        {me ? (
          <Avatar id={me.id} name={me.name} avatar={me.avatar} points={me.points} truncate />
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
