import { BOTTOM_MENU_ITEMS, MENU_ITEMS, USER_MENU_ITEMS } from './models/constants';
import MenuItem from './components/MenuItem';
import { useMe } from '@hooks/data/useMe';
import { FC } from 'react';
import { cx } from 'class-variance-authority';

type SidebarProps = {
  collapsed?: boolean;
};

const Sidebar: FC<SidebarProps> = ({ collapsed }) => {
  const { me } = useMe();

  const menuItems = me ? USER_MENU_ITEMS : MENU_ITEMS;

  return (
    <div
      className={cx(
        'sticky top-[70px] h-[calc(100vh-70px)] flex-shrink-0 border-r border-border bg-background-200 pt-2 lg:px-3',
        collapsed ? 'px-3' : 'px-6',
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-2">
          <div className="mt-2 mb-3 text-sm text-primary-500 lg:ml-0">{/* Menu */}</div>
          {menuItems.map(({ path, title, Icon, disabled, target }) => (
            <MenuItem
              collapse={collapsed}
              key={title}
              path={path}
              title={title}
              Icon={Icon}
              disabled={disabled}
              target={target}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 pb-6">
          {BOTTOM_MENU_ITEMS.map(({ path, title, Icon, disabled, target }) => (
            <MenuItem
              collapse={collapsed}
              key={title}
              path={path}
              title={title}
              Icon={Icon}
              disabled={disabled}
              target={target}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
