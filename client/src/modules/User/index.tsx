import Community from '@components/shared/Community';
import Leaderboard from '@components/shared/Leaderboard';
import Suggestion from '@components/shared/Suggestion';
import Challenges from './components/Challenges';
import Lore from './components/Lore';
import Questions from './components/Questions';

const User = () => {
  return (
    <div className="flex gap-6">
      <div className="space-y-4 flex flex-col flex-1">
        <Lore />
        <Challenges />
        {/* <Questions /> */}
      </div>
      <div className="flex flex-col gap-4 flex-shrink-0 w-sidebar xl:w-[270px] md:hidden">
        <Leaderboard />
        <Community />
        <Suggestion />
      </div>
    </div>
  );
};

export default User;
