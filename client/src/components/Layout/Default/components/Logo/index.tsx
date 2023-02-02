import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href={'/'}
      className="font-semibold text-2xl mr-8 md:mr-4 transition-colors hover:text-primary-500"
    >
      Codex
    </Link>
  );
};

export default Logo;
