import Community from '@components/shared/Community';
import Leaderboard from '@components/shared/Leaderboard';
import Suggestion from '@components/shared/Suggestion';
import Lore from './components/Lore';
import Placement from './components/Placement';
import Prize from './components/Prize';

const Challenge = () => {
  return (
    <div className="flex gap-6">
      <div className="flex flex-1 flex-col space-y-4">
        <Lore />
        <Placement />
        <Prize />
      </div>
      <div className="flex flex-col gap-6 flex-shrink-0 w-sidebar xl:w-[270px] md:hidden">
        <Leaderboard />
        <Community />
        <Suggestion />
      </div>
    </div>
  );
};

export default Challenge;
