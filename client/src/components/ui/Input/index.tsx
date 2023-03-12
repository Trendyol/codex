/* eslint-disable react/display-name */
import { cva, cx, type VariantProps } from 'class-variance-authority';
import { FC, forwardRef } from 'react';

type InputProps = {
  label?: string;
  className?: string;
  rows?: number;
  error?: any;
} & VariantProps<typeof inputVariants> &
  React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

const inputVariants = cva('border border-border w-full resize-none', {
  variants: {
    intent: {
      primary: [
        'border-secondary-100',
        'bg-background-100',
        'focus:border-primary-100',
        'outline-primary-100',
      ],
      error: [
        'text-red-600',
        'border-red-600',
        'bg-red-50',
        'focus:border-red-600',
        'outline-red-600',
      ],
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

const Input: FC<InputProps> = forwardRef<HTMLInputElement & HTMLTextAreaElement, InputProps>(
  ({ intent, size, label, className, rows = 1, error, ...props }, ref) => {
    intent = error ? 'error' : intent;
    const inputClasses = cx(inputVariants({ intent, size, className }));

    return (
      <div>
        {label && <label className="mb-2 block text-sm font-medium">{label}</label>}
        {rows === 1 ? (
          <input ref={ref} className={inputClasses} {...props} />
        ) : (
          <textarea ref={ref} className={inputClasses} rows={rows} {...props} />
        )}
        {error && <div className="mt-1 text-sm text-red-600">{error}</div>}
      </div>
    );
  },
);

export default Input;
