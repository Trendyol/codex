import { FC } from 'react';

type AccessIndicatorProps = {
  name: string;
  access: boolean;
};

const AccessIndicator: FC<AccessIndicatorProps> = ({ name, access }) => {
  let indicator;

  if (access) indicator = <div className="h-3 w-3 rounded-full bg-green-500"></div>;
  else {
    indicator = <div className="h-3 w-3 rounded-full bg-red-500"></div>;
  }

  return (
    <>
      <div className="text-sm  text-secondary-100">{name}</div>
      {indicator}
    </>
  );
};

export default AccessIndicator;
