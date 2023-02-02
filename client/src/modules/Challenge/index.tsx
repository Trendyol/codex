import Community from '@components/sections/Community';
import Leaderboard from '@components/sections/Leaderboard';
import Suggestion from '@components/sections/Suggestion';
import Lore from './components/Lore';
import Placement from './components/Placement';
import Prize from './components/Prize';
import Question from './components/Question';

const Challenge = () => {
  return (
    <>
      <div className="flex gap-6">
        <div className="space-y-4">
          <Lore />
          <Placement />
          <Prize />
          <Question />
        </div>
        <div className="flex flex-col gap-4 flex-shrink-0 w-sidebar xl:w-[270px] md:hidden">
          <Leaderboard />
          <Community />
          <Suggestion />
        </div>
      </div>
    </>
  );
};

export default Challenge;
