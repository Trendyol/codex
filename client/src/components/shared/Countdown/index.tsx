import Card from '@components/ui/Card';
import { FC, ReactNode } from 'react';
import CD, { CountdownRendererFn } from 'react-countdown';

type CountdownProps = {
  text?: string | ReactNode;
  date?: string;
  onComplete?: () => void;
};

const Countdown: FC<CountdownProps> = ({ text = '', date = '', onComplete }) => {
  const cdRenderer: CountdownRendererFn = ({ minutes, seconds }) => {
    const withLeadingZero = (value: number) => {
      return value < 10 ? `0${value}` : value;
    };

    return (
      <div className="text-6xl font-semibold text-primary-500 ">
        {withLeadingZero(minutes)}:{withLeadingZero(seconds)}
      </div>
    );
  };

  return (
    <Card className="flex flex-shrink-0 flex-col items-center overflow-hidden">
      {text && <div className="my-2 text-lg font-semibold text-primary-400">{text}</div>}
      <CD date={new Date(date)} renderer={cdRenderer} precision={2} onComplete={onComplete}></CD>
    </Card>
  );
};

export default Countdown;
