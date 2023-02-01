import Community from './components/Community';
import Leaderboard from './components/Leaderboard';
import List from './components/List';
import Suggestion from './components/Suggestion';

const Dashboard = () => {
  return (
    <div className="px-6">
      <div className="text-2xl text-primary-400 font-semibold mb-8">Dashboard</div>
      <div className="flex gap-6">
        <div className='flex flex-1'>
          <List />
        </div>
        <div className="flex flex-col gap-6 w-[300px]">
          <Leaderboard />
          <Community />
          <Suggestion />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
