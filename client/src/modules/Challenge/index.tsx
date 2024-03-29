import Community from '@components/shared/Community';
import Leaderboard from '@components/shared/Leaderboard';
import Progression from '@components/shared/Progression';
import Lore from './components/Lore';
import Placement from '../../components/shared/Placement';
import Prize from './components/Prize';

const Challenge = () => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-1 flex-col space-y-4">
        <Lore />
        <Placement />
        <Prize />
      </div>
      <div className="flex w-sidebar flex-shrink-0 flex-col gap-4 xl:w-[270px] md:hidden">
        <Progression />
        <Leaderboard />
        <Community />
        {/* <Suggestion /> */}
      </div>
    </div>
  );
};

export default Challenge;
