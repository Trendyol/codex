import { FC, ReactNode } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
