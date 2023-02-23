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
  const router = useRouter();
  const { user } = useUser(router.query.user as string | '');

  return (
    <Card className="h-fit min-h-[500px] overflow-hidden rounded-xl p-0" space={false}>
      <div
        className="relative h-48 w-full bg-white"
        style={{ background: randomGradient('challenge.id') }}
      >
        <div>
          <Image
            priority
            className="absolute -bottom-[50px] left-8 flex items-center justify-center rounded-full ring-4 ring-white"
            alt="avatar"
            height={120}
            width={120}
            src="https://lh3.googleusercontent.com/a/AEdFTp4mrIOqg46bY8tJ1pdxSxGJsOP_Fp61S7IAkLd4qw=s96-c"
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
        <div className="mt-2 text-sm text-secondary-100">720 Points - 15th</div>
        <div className="mt-3 text-secondary-200 whitespace-pre-wrap">{user?.bio}</div>
      </div>
    </Card>
  );
};

export default Lore;
