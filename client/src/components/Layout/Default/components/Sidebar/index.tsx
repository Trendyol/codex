import { BOTTOM_MENU_ITEMS, MENU_ITEMS, USER_MENU_ITEMS } from './models/constants';
import MenuItem from './components/MenuItem';
import { useMe } from '@hooks/data/useMe';
import { FC, useState } from 'react';
import { cx } from 'class-variance-authority';

type SidebarProps = {};

const Sidebar: FC<SidebarProps> = () => {
  const [collapse, setCollapse] = useState(false);
  const { me } = useMe();

  const menuItems = me ? USER_MENU_ITEMS : MENU_ITEMS;

  return (
    <div
      className={cx(
        'flex-shrink-0 bg-white pt-2 h-[calc(100vh-70px)] sticky top-[70px] lg:px-3',
        collapse ? 'px-3' : 'px-8',
      )}
    >
      <div className="flex flex-col justify-between h-full" onClick={() => setCollapse((e) => !e)}>
        <div className="flex flex-col gap-2">
          <div className="mt-2 mb-3 text-primary-500 text-sm lg:ml-0">{/* Menu */}</div>
          {menuItems.map(({ path, title, Icon, disabled }) => (
            <MenuItem
              collapse={collapse}
              key={title}
              path={path}
              title={title}
              Icon={Icon}
              disabled={disabled}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 pb-6">
          {BOTTOM_MENU_ITEMS.map(({ path, title, Icon, disabled }) => (
            <MenuItem
              collapse={collapse}
              key={title}
              path={path}
              title={title}
              Icon={Icon}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
