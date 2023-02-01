import Community from './components/Community';
import List from './components/List';
import Suggestion from './components/Suggestion';

const Home = () => {
  return (
    <div className="px-6">
      <div className="text-2xl text-primary-400 font-semibold mb-8">Dashboard</div>
      <div className="flex gap-6">
        <div>
          <List />
        </div>
        <div className='flex flex-col gap-6'>
          <Community />
          <Suggestion />
        </div>
      </div>
    </div>
  );
};

export default Home;
