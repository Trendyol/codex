import Button from '@components/ui/Button';
import { FC, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import WarningPopup from './components/WarningPopup';

type ResetProps = {
  onReset: () => void;
};

const Reset: FC<ResetProps> = ({ onReset }) => {
  const [showWarningPopup, setShowWarningPopup] = useState(false);

  const showWarning = () => setShowWarningPopup(true);
  const hideWarningPopup = () => setShowWarningPopup(false);

  return (
    <>
      <Button onClick={showWarning} intent={'secondary'} className="border-border">
        <GrPowerReset size={14} />
      </Button>
      <WarningPopup show={showWarningPopup} onHide={hideWarningPopup} onReset={onReset} />
    </>
  );
};

export default Reset;
