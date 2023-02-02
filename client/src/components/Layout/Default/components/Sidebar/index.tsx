import { BOTTOM_MENU_ITEMS, MENU_ITEMS, USER_MENU_ITEMS } from './models/constants';
import MenuItem from './components/MenuItem';
import { useMe } from '@hooks/data/useMe';

const Sidebar = () => {
  const { me } = useMe();

  const menuItems = me ? USER_MENU_ITEMS : MENU_ITEMS;

  return (
    <div className="flex-shrink-0 bg-white px-8 pt-2 h-[calc(100vh-70px)] sticky top-[70px] lg:px-3">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2">
          <div className="my-4 mb-3 text-primary-500 text-sm pt-3 lg:ml-0">Menu</div>
          {menuItems.map(({ path, title, Icon }) => (
            <MenuItem key={title} path={path} title={title} Icon={Icon} />
          ))}
        </div>
        <div className="flex flex-col gap-2 pb-6">
          {BOTTOM_MENU_ITEMS.map(({ path, title, Icon }) => (
            <MenuItem key={title} path={path} title={title} Icon={Icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
