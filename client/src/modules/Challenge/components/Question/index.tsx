import Card from '@components/ui/Card';
import { useChallenge } from '@hooks/data';

import { useRouter } from 'next/router';

const Question = () => {
  const router = useRouter();
  const { challenge } = useChallenge(router.query.challenge as string);

  if (!challenge) return <></>;

  return (
    <Card className="p-0 rounded-xl overflow-hidden h-fit min-h-[300px]">
      <div className="p-8">
        <div className="text-2xl font-semibold">Question</div>
        <div className="space-y-4 text-lg mb-2 mt-3 font-semibold">Two Sum</div>
        <div className="text-secondary-200">
          Id anim esse sint laboris incididunt dolore ipsum. Nulla fugiat pariatur commodo enim do
          ullamco excepteur irure ipsum commodo tempor reprehenderit. Dolore est ad sunt duis elit
          id commodo elit aute eu. Nostrud nisi pariatur cillum deserunt laboris occaecat aliqua
          pariatur ad tempor. Nulla quis ut qui id ipsum nostrud elit consectetur enim consequat
          veniam irure aliquip. Magna tempor culpa aute amet velit aliqua irure. Cillum voluptate
          officia eu sit veniam. Nisi ullamco adipisicing officia nisi ea deserunt aliquip sit. Esse
          exercitation culpa duis anim dolore deserunt eiusmod aute id aliquip commodo reprehenderit
          irure. Dolore velit est reprehenderit tempor est eu officia. Aliqua ut in sunt nulla
          incididunt anim officia. Aute culpa ipsum aute fugiat magna nisi irure cillum cillum
          tempor deserunt. Velit commodo nulla officia officia reprehenderit excepteur duis amet
          tempor.
        </div>
      </div>
    </Card>
  );
};

export default Question;
