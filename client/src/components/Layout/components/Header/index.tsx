import { useMe } from '@hooks/data/useMe';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const { me } = useMe();
  return (
    <div>
      {me?.name ? (
        <div className="flex">
          <div>{me.name}</div>
          <Image
            alt="User Avatar"
            width={50}
            height={50}
            src={me.avatar}
          ></Image>
        </div>
      ) : (
        <Link href="http://localhost:4000/auth/google/callback">Login</Link>
      )}
    </div>
  );
};

export default Header;
