import Community from '@components/shared/Community';
import Leaderboard from '@components/shared/Leaderboard';
import Suggestion from '@components/shared/Suggestion';
import Problems from './components/Problems';

const Practice = () => {

  return (
    <>
      <div className="text-2xl text-primary-400 mb-6">Practice</div>
      <div className="flex gap-6 flex-1">
        <Problems />
        <div className="flex flex-col gap-4 flex-shrink-0 w-sidebar xl:w-[270px] md:hidden">
          <Leaderboard />
          <Community />
          <Suggestion />
        </div>
      </div>
    </>
  );
};

export default Practice;