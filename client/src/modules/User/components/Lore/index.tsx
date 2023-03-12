import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { useUser } from '@hooks/data';
import Image from 'next/image';
import { useRouter } from 'next/router';
import randomGradient from 'random-gradient';
import { FC } from 'react';

type LoreProps = {
  onShowUpdatePopup: () => void;
};

const Lore: FC<LoreProps> = ({ onShowUpdatePopup }) => {
  const { query, isReady } = useRouter();
  const { user } = useUser(query.user as string, isReady);

  if (!user) return <></>;

  const avatar = `https://avatars.dicebear.com/api/avataaars/${user.id}.svg`;

  return (
    <Card className="h-fit min-h-[500px] overflow-hidden rounded-lg p-0" space={false}>
      <div
        className="relative h-48 w-full bg-white"
        style={{ background: randomGradient(user?.id) }}
      >
        <div>
          <Image
            priority
            className="bg-error absolute -bottom-[50px] left-8 flex items-center justify-center rounded-full ring-4 ring-background-200"
            alt="avatar"
            height={120}
            width={120}
            src={user?.avatar || avatar}
          />
        </div>
        <Button
          onClick={onShowUpdatePopup}
          size={'small'}
          intent="secondary"
          className="absolute top-[220px] right-8"
        >
          Update
        </Button>
      </div>
      <div className="mt-12 p-6">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-semibold">{user?.name}</span>
        </div>
        <div className="mt-2 text-sm text-secondary-100">
          {user?.points} Points - {user?.rank}th
        </div>
        <div className="mt-3 whitespace-pre-wrap text-secondary-200">{user?.bio}</div>
      </div>
    </Card>
  );
};

export default Lore;
