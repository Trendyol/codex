import { cva, cx, type VariantProps } from 'class-variance-authority';
import { FC, ReactNode } from 'react';

type InputProps = {
  label: string;
  className?: string;
} & VariantProps<typeof inputVariants> &
  React.InputHTMLAttributes<HTMLInputElement>;

const inputVariants = cva('border w-full', {
  variants: {
    intent: {
      primary: ['text-gray-900', 'border-gray-300', 'bg-gray-50', 'focus:border-primary-600'],
    },
    size: {
      medium: ['text-base', 'p-2.5', 'rounded-lg'],
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
});

const Input: FC<InputProps> = ({ intent, size, label, className, ...props }) => {
  const inputClasses = cx(inputVariants({ intent, size, className }));

  return (
    <div>
      {label && <label className="block mb-2 text-sm font-medium">{label}</label>}
      <input className={inputClasses} {...props} />
    </div>
  );
};

export default Input;
