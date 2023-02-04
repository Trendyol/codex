import Badge from '@components/shared/Badge';
import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { useChallenge } from '@hooks/data';
import { useRouter } from 'next/router';
import randomGradient from 'random-gradient';
import { BsFillTrophyFill } from 'react-icons/bs';

const Lore = () => {
  const router = useRouter();
  const { challenge } = useChallenge(router.query.challenge as string);

  if (!challenge) return <></>;

  const { name, teamSize, question, date, status } = challenge;

  return (
    <Card className="p-0 rounded-xl overflow-hidden h-fit min-h-[500px]" space={false}>
      <div
        className="h-48 w-full relative bg-white"
        style={{ background: randomGradient(challenge.id) }}
      >
        <div className="w-[120px] h-[120px] bg-[#9694ff] absolute -bottom-[50px] left-8 rounded-full ring-4 ring-white flex items-center justify-center">
          <BsFillTrophyFill color="white" size={60} />
        </div>
        <Button size={'small'} intent="secondary" className="top-[220px] right-8 absolute">
          Participate
        </Button>
      </div>
      <div className="mt-12 p-6">
        <div className="text-2xl font-semibold flex items-center gap-3">
          <span>{name}</span>
          <Badge size={'small'}>Easy</Badge>
        </div>
        <div className="text-secondary-100 text-sm mt-2">27 Jan 2023 - Upcoming</div>
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
