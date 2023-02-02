import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import Input from '@components/ui/Input';
import { useMe } from '@hooks/data/useMe';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const { me } = useMe();
  return (
    <div className="h-header border-b flex items-center gap-5 px-8 bg-white justify-between w-full">
      <div className="flex items-center ">
        <div className="font-semibold text-2xl mr-8">Codex</div>
        <div className="w-[420px]">
          <Input placeholder="Search..." />
        </div>
      </div>
      <div className="flex items-center">
        {me ? (
          <div className="flex items-center mr-8">
            <div className="mr-4 rounded-md overflow-hidden">
              <Image src={me.avatar} width={40} height={40} alt="avatar" />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">{me.name}</div>
              <div className="text-xs text-secondary-100">350 Points</div>
            </div>
          </div>
        ) : (
          <>
            <Link href={'/login'}>
              <Button className="mr-4">Log in</Button>
            </Link>
            <Button intent={'secondary'}>Create account</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
