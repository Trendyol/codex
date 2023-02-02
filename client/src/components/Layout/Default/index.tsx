import { FC, ReactNode } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

type DefaultLayoutProps = {
  children: ReactNode;
};

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="bg-background min-h-screen w-full">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 px-8 mt-6 md:px-4">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
