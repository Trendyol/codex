import { useMe } from '@hooks/data/useMe';
import Link from 'next/link';

const Header = () => {
  const { me } = useMe();
  return (
    <div>
      {me?.name ? (
        <div>{me.name}</div>
      ) : (
        <Link href="http://localhost:4000/auth/google/callback">Login</Link>
      )}
    </div>
  );
};

export default Header;
