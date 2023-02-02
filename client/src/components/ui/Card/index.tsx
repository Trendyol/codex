import { cx } from 'class-variance-authority';
import { FC, ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  fluid?: boolean;
  onClick?: () => void;
};

const Card: FC<CardProps> = ({ children, className, fluid = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cx(
        'border rounded-xl p-5 cursor-pointer hover:shadow-lg transition-shadow bg-white',
        fluid ? 'w-full' : '',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
