import { cx } from 'class-variance-authority';
import { FC, ReactNode, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

type DropdownProps = {
  children: ReactNode;
  onChange?: (value: string | number) => void;
  items?: { key: string | number; label: ReactNode }[];
  bodyClassNames?: string;
};

const Dropdown: FC<DropdownProps> = ({ children, onChange, items, bodyClassNames }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useClickAway(ref, () => handleClose());

  const handleItemSelect = (key: string | number) => {
    handleClose();
    onChange?.(key);
  };

  return (
    <div className="relative">
      <div onClick={handleOpen}>{children}</div>
      {isOpen && !!items?.length && (
        <div
          ref={ref}
          className={cx(
            'absolute right-0 rounded-md border border-border bg-background-200 py-2',
            bodyClassNames,
          )}
        >
          {items.map(({ key, label }) => (
            <div
              onClick={() => handleItemSelect(key)}
              className="cursor-pointer hover:bg-background-50"
              key={key}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
