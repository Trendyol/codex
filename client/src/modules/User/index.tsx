import Community from '@components/shared/Community';
import Leaderboard from '@components/shared/Leaderboard';
import Suggestion from '@components/shared/Suggestion';
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
        {/* <Questions /> */}
      </div>
      <div className="flex flex-col gap-6 flex-shrink-0 w-sidebar xl:w-[270px] md:hidden">
        <Leaderboard />
        <Community />
        <Suggestion />
      </div>
      <UpdatePopup show={showUpdatePopup} onHide={handleHideUpdatePopup} />
    </div>
  );
};

export default User;
