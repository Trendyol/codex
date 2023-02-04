import Card from '@components/ui/Card';
import { useChallenge } from '@hooks/data';
import { useRouter } from 'next/router';
import CD, { CountdownRendererFn } from 'react-countdown';

const Countdown = () => {
  const router = useRouter();
  const { challenge } = useChallenge(router.query.challenge as string);

  const cdRenderer: CountdownRendererFn = ({ minutes, seconds }) => {
    const withLeadingZero = (value: number) => {
      return value < 10 ? `0${value}` : value;
    };

    return (
      <div className="text-6xl text-primary-500 font-semibold">
        {withLeadingZero(minutes)}:{withLeadingZero(seconds)}
      </div>
    );
  };

  return (
    <Card className="flex flex-col items-center gap-2 overflow-hidden">
      <div className="text-primary-400 text-lg font-semibold mb-2">Time to Challenge</div>
      <CD date={new Date(challenge?.date || '')} renderer={cdRenderer} precision={2}></CD>
    </Card>
  );
};

export default Countdown;
