import { cva, cx, type VariantProps } from 'class-variance-authority';
import { FC, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & VariantProps<typeof badgeVariants>;

const badgeVariants = cva('text-xs font-medium mr-2 w-fit rounded', {
  variants: {
    intent: {
      easy: ['bg-green-100', 'text-green-800'],
      medium: ['bg-yellow-100', 'text-yellow-800'],
      hard: ['bg-red-100', 'text-red-800'],
    },
    size: {
      small: ['text-xs', ' px-2.5', 'py-0.5'],
      medium: ['text-xs', 'px-2.5', 'py-1'],
    },
  },
  defaultVariants: {
    intent: 'easy',
    size: 'small',
  },
});

const Badge: FC<ButtonProps> = ({ intent, size, className, children, ...props }) => {
  const badgeClasses = cx(className, badgeVariants({ intent, size }));

  return (
    <div {...props} className={badgeClasses}>
      {children}
    </div>
  );
};

export default Badge;
