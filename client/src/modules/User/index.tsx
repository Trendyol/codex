import Community from '@components/shared/Community';
import Leaderboard from '@components/shared/Leaderboard';
import Progression from '@components/shared/Progression';
import { useState } from 'react';
import Challenges from './components/Challenges';
import Lore from './components/Lore';
import UpdatePopup from './components/UpdatePopup';

const User = () => {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  const handleShowUpdatePopup = () => setShowUpdatePopup(true);
  const handleHideUpdatePopup = () => setShowUpdatePopup(false);

  return (
    <div className="flex gap-6">
      <div className="flex flex-1 flex-col space-y-4 overflow-x-auto">
        <Lore onShowUpdatePopup={handleShowUpdatePopup} />
        <Challenges />
      </div>
      <div className="flex w-sidebar flex-shrink-0 flex-col gap-6 xl:w-[270px] md:hidden">
        <Progression />
        <Leaderboard />
        <Community />
        {/* <Suggestion /> */}
      </div>
      <UpdatePopup show={showUpdatePopup} onHide={handleHideUpdatePopup} />
    </div>
  );
};

export default User;
