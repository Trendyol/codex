import Community from '@components/shared/Community';
import Leaderboard from '@components/shared/Leaderboard';
import Progression from '@components/shared/Progression';
import Problems from './components/Problems';
import Filter from './components/Filter';
import { useState } from 'react';

const Practice = () => {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <>
      <div className="flex flex-1 gap-4">
        <Problems tags={tags} />
        <div className="flex w-sidebar flex-shrink-0 flex-col gap-4 xl:w-[270px] md:hidden">
          <Filter forProblem onFilter={setTags} />
          <Progression />
          <Leaderboard />
          <Community />
          {/* <Suggestion /> */}
        </div>
      </div>
    </>
  );
};

export default Practice;
