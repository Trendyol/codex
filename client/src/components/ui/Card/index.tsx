import { cx } from 'class-variance-authority';
import { FC, ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  fluid?: boolean;
  space?: boolean;
  onClick?: () => void;
};

const Card: FC<CardProps> = ({ children, className, space = true, fluid = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cx(
        'rounded-lg border border-border bg-background-200 transition-shadow',
        fluid ? 'w-full' : '',
        space ? 'p-6' : '',
        onClick ? 'cursor-pointer' : '',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
