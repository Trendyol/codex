import { cva, cx, type VariantProps } from 'class-variance-authority';
import { FC, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fluid?: boolean;
} & VariantProps<typeof buttonVariants>;

const buttonVariants = cva('text-center font-medium', {
  variants: {
    intent: {
      primary: ['bg-primary-100', 'hover:bg-primary-200', 'text-white'],
      secondary: ['bg-white', 'border', 'border-gray-400', 'hover:bg-gray-100'],
    },
    size: {
      medium: ['text-sm', 'py-3', 'px-4', 'rounded-lg'],
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
});

const Button: FC<ButtonProps> = ({ intent, size, fluid, className, children, ...props }) => {
  const buttonClasses = cx(buttonVariants({ intent, size, className }), fluid ? 'w-full' : '');

  return (
    <button {...props} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
