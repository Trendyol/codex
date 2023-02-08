import Card from '@components/ui/Card';
import { useChallenge } from '@hooks/data';
import { useRouter } from 'next/router';
import { FC } from 'react';
import CD, { CountdownRendererFn } from 'react-countdown';

type CountdownProps = {
  text?: string;
  date?: string;
};

const Countdown: FC<CountdownProps> = ({ text, date }) => {
  const router = useRouter();
  const { challenge } = useChallenge(router.query.challenge as string);

  const cdRenderer: CountdownRendererFn = ({ minutes, seconds }) => {
    const withLeadingZero = (value: number) => {
      return value < 10 ? `0${value}` : value;
    };

    return (
      <div className="text-6xl text-primary-500 font-semibold ">
        {withLeadingZero(minutes)}:{withLeadingZero(seconds)}
      </div>
    );
  };

  return (
    <Card className="flex flex-col items-center overflow-hidden flex-shrink-0">
      {text && <div className="text-primary-400 text-lg font-semibold my-2">{text}</div>}
      <CD date={new Date(date || '')} renderer={cdRenderer} precision={2}></CD>
    </Card>
  );
};

export default Countdown;
