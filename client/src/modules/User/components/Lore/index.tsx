import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { useChallenge, useUser } from '@hooks/data';
import Image from 'next/image';
import { useRouter } from 'next/router';
import randomGradient from 'random-gradient';

const Lore = () => {
  const router = useRouter();
  const { user } = useUser(router.query.user as string | '');

  return (
    <Card className="p-0 rounded-xl overflow-hidden h-fit min-h-[500px]" space={false}>
      <div
        className="h-48 w-full relative bg-white"
        style={{ background: randomGradient('challenge.id') }}
      >
        <div>
          <Image
            className="absolute -bottom-[50px] left-8 rounded-full ring-4 ring-white flex items-center justify-center"
            alt="avatar"
            height={120}
            width={120}
            src="https://lh3.googleusercontent.com/a/AEdFTp4mrIOqg46bY8tJ1pdxSxGJsOP_Fp61S7IAkLd4qw=s96-c"
          />
        </div>
        <Button size={'small'} intent="secondary" className="top-[220px] right-8 absolute">
          Update
        </Button>
      </div>
      <div className="mt-12 p-6">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-semibold">John Doe</span>
        </div>
        <div className="text-secondary-100 text-sm mt-2">720 Points - 15th</div>
        <div className="text-secondary-200 mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ante eget quam volutpat
          luctus. Duis efficitur tristique leo in efficitur. Proin pellentesque luctus purus, ut
          sollicitudin ipsum. Cras lacinia lobortis tincidunt. Vestibulum et ullamcorper sapien.
          Mauris gravida velit nisl. Vivamus elit dui, lobortis a risus in, tempor
        </div>
      </div>
    </Card>
  );
};

export default Lore;
