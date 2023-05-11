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
        <div className="min-h-screen w-full bg-background-100 text-text">
          {showHeader && <Header />}
          <div className="flex">
            {showSidebar && <Sidebar collapsed={collapsed} />}
            <div className="mt-6 flex-1 px-6 md:px-4 overflow-x-auto">{children}</div>
          </div>
        </div>
  );
};

export default DefaultLayout;
