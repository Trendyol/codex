import { FC, useId } from 'react';

type CheckboxProps = {
  label?: string;
  checked: boolean;
  onChange: () => void;
};

const Checkbox: FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const id = useId();
  return (
    <div className="flex cursor-pointer items-center">
      <input
        className="h-5 w-5 cursor-pointer rounded-[4px] text-primary-100 outline-none transition-all hover:text-primary-200 focus:ring-0"
        checked={checked}
        type="checkbox"
        onChange={onChange}
        id={id}
      />
      {label && (
        <label className="hover: cursor-pointer select-none pl-2" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
