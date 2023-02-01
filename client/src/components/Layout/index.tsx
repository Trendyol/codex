import { FC, ReactNode } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="bg-background min-h-screen px-6 overflow-y-auto">
      {router.pathname !== '/login' && <Header />}
      <div style={{ display: 'flex' }}>
        {router.pathname !== '/login' && <Sidebar />}
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
