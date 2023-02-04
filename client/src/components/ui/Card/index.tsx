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
        'border rounded-xl hover:shadow-lg transition-shadow bg-white',
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
