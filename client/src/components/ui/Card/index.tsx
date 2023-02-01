import { cx } from 'class-variance-authority';
import { FC, ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cx(
        'bg-white w-full border rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
