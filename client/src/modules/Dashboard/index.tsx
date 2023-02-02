import Community from './components/Community';
import Leaderboard from './components/Leaderboard';
import List from './components/List';
import Suggestion from './components/Suggestion';

const Dashboard = () => {
  return (
    <div className="px-8">
      <div className="text-2xl text-primary-400 mb-6 mt-6">Dashboard</div>
      <div className="flex gap-6 flex-1">
        <List />
        <div className="flex flex-col gap-4 w-sidebar">
          <Leaderboard />
          <Community />
          <Suggestion />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
