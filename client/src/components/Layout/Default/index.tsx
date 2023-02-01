import { FC, ReactNode } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useRouter } from 'next/router';

type DefaultLayoutProps = {
  children: ReactNode;
};

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="bg-background min-h-screen overflow-y-auto">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
