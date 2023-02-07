import { FC, ReactNode } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

type DefaultLayoutProps = {
  children: ReactNode;
  showHeader?: boolean;
  showSidebar?: boolean;
  collapsed?: boolean;
};

const DefaultLayout: FC<DefaultLayoutProps> = ({
  children,
  showHeader = false,
  showSidebar = false,
  collapsed = false,
}) => {
  return (
    <div className="min-h-screen w-full bg-background">
      {showHeader && <Header />}
      <div className="flex">
        {showSidebar && <Sidebar collapsed={collapsed} />}
        <div className="mt-6 flex-1 px-8 md:px-4">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
