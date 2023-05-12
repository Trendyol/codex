import Button from '@components/ui/Button';
import { FC, useState } from 'react';
import WarningPopup from './components/WarningPopup';
import { AiOutlineClear } from 'react-icons/ai';

type ResetProps = {
  onReset: () => void;
};

const Reset: FC<ResetProps> = ({ onReset }) => {
  const [showWarningPopup, setShowWarningPopup] = useState(false);

  const showWarning = () => setShowWarningPopup(true);
  const hideWarning = () => setShowWarningPopup(false);

  return (
    <>
      <Button onClick={showWarning} intent={'secondary'} className="border-border">
        <AiOutlineClear size={16}/>
      </Button>
      <WarningPopup show={showWarningPopup} onHide={hideWarning} onReset={onReset} />
    </>
  );
};

export default Reset;
