import Community from '@components/shared/Sections/Community';
import Leaderboard from '@components/shared/Sections/Leaderboard';
import Suggestion from '@components/shared/Sections/Suggestion';
import List from './components/List';

const Dashboard = () => {
  return (
    <>
      <div className="text-2xl text-primary-400 mb-6">Dashboard</div>
      <div className="flex gap-6 flex-1">
        <List />
        <div className="flex flex-col gap-4 w-sidebar xl:w-[270px] md:hidden">
          <Leaderboard />
          <Community />
          <Suggestion />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
