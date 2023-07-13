import { cn } from '@utils/common';
import { cva, cx, type VariantProps } from 'class-variance-authority';
import { FC, ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  className?: string;
} & VariantProps<typeof badgeVariants>;

const badgeVariants = cva('text-xs font-medium mr-2 w-fit rounded', {
  variants: {
    intent: {
      1: ['bg-green-100', 'text-green-800'],
      2: ['bg-yellow-100', 'text-yellow-800'],
      3: ['bg-red-100', 'text-red-800'],
      4: ['bg-blue-100', 'text-black-800'],
    },
    size: {
      small: ['text-xs', ' px-2.5', 'py-0.5'],
      medium: ['text-xs', 'px-2.5', 'py-1'],
    },
  },
  defaultVariants: {
    intent: 1,
    size: 'small',
  },
});

const Badge: FC<BadgeProps> = ({ intent, size, className, children, ...props }) => {
  const badgeClasses = cn(badgeVariants({ intent, size }), className);

  return (
    <div {...props} className={badgeClasses}>
      {children}
    </div>
  );
};

export default Badge;
