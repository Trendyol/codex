import Community from '@components/shared/Community';
import Leaderboard from '@components/shared/Leaderboard';
import Progression from '@components/shared/Progression';
import List from './components/List';

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-1 gap-6">
        <List />
        <div className="flex w-sidebar flex-shrink-0 flex-col gap-6 xl:w-[270px] md:hidden">
          <Progression />
          <Leaderboard />
          <Community />
          {/* <Suggestion /> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
