import { cn } from '@utils/common';
import { FC } from 'react';

type AccessIndicatorProps = {
  name: string;
  access: boolean;
};

const AccessIndicator: FC<AccessIndicatorProps> = ({ name, access }) => {
  return (
    <>
      <div className="text-sm  text-secondary-100">{name}</div>
      <div className={cn('h-3 w-3 rounded-full', access ? 'bg-success' : 'bg-error')}></div>
    </>
  );
};

export default AccessIndicator;
