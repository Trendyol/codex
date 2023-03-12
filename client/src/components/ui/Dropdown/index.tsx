import { cx } from 'class-variance-authority';
import { FC, useEffect, useRef, useState } from 'react';

type DropdownProps = {
  children: React.ReactNode;
  show: boolean;
  onHide: () => void;
};

const Dropdown: FC<DropdownProps> = ({ children, show, onHide }) => {
  const ref = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowDropdown(false);
      onHide();
    }
  };

  useEffect(() => {
    if (show) {
      setShowDropdown(true);
    }
  }, [show]);

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div
      ref={ref}
      className={cx(
        'absolute right-0 top-14 w-[200px] rounded-lg bg-white shadow-lg g-4',
        showDropdown ? 'block' : 'hidden',
      )}
    >
      {children}
    </div>
  );
};

export default Dropdown;
