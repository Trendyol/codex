import { cx } from 'class-variance-authority';
import { Children, FC, ReactNode, useState } from 'react';

type TabsProps = {
  children: ReactNode | ReactNode[];
  tabs: string[];
  className?: string;
};

const TabsGroup: FC<TabsProps> = ({ children, tabs, className }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className={cx('flex flex-1 flex-col overflow-auto rounded-lg border bg-white', className)}>
      <div className="flex items-center">
        {tabs.map((tab, index) => (
          <div
            className={cx(
              'w-full cursor-pointer border-b-2 p-4 text-center text-sm',
              activeTab == index ? 'border-b-primary-200 text-primary-200' : '',
            )}
            key={tab}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </div>
        ))}
      </div>
      {Children.map(children, (child, index) => {
        return (
          <div className={cx('flex flex-1 overflow-auto', index !== activeTab ? 'hidden' : '')}>
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default TabsGroup;
