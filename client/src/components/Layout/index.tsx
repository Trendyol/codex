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
    <div>
      {router.pathname !== '/login' && <Header />}
      <div style={{ display: 'flex' }}>
      {router.pathname !== '/login' && <Sidebar />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
