import { cva, cx, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { FC, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fluid?: boolean;
  disabled?: boolean;
} & VariantProps<typeof buttonVariants>;

const buttonVariants = cva('text-center font-medium box-border border-border', {
  variants: {
    intent: {
      primary: ['bg-primary-100', 'hover:bg-primary-200', 'text-white'],
      secondary: [
        'bg-background-200',
        'border',
        'border-secondary-100',
        'hover:bg-background-50',
        ,
      ],
      danger: ['bg-error', 'hover:bg-red-600', 'text-white'],
      success: ['bg-success', 'hover:bg-green-600', 'text-white'],
      text: ['bg-transparent', 'hover:bg-background-50', 'text-secondary-200'],
    },
    size: {
      small: ['text-sm', 'py-2 h-[36px]', 'px-3', 'rounded-lg'],
      medium: ['text-sm', 'py-3', 'px-4', 'rounded-lg'],
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
  },
});

const Button: FC<ButtonProps> = ({
  intent,
  size,
  fluid,
  className,
  disabled,
  children,
  ...props
}) => {
  const buttonClasses = cx(
    twMerge(buttonVariants({ intent, size }), className),
    fluid ? 'w-full' : '',
    disabled ? 'opacity-60 cursor-not-allowed' : '',
  );

  return (
    <button {...props} disabled={disabled} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
