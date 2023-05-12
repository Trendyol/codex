import Button from '@components/ui/Button';
import Popup from '@components/ui/Popup';
import { FC } from 'react';

type WarningPopupProps = {
  show: boolean;
  onHide: () => void;
  onReset: () => void;
};

const WarningPopup: FC<WarningPopupProps> = ({ show, onReset, onHide }) => {
  const reset = () => {
    onReset();
    onHide();
  };

  return (
    <Popup
      show={show}
      title="Warning"
      onHide={onHide}
      footer={
        <div className="flex w-full gap-2">
          <Button intent="secondary" onClick={onHide} className="ml-auto">
            Cancel
          </Button>
          <Button intent="danger" onClick={reset}>
            Reset
          </Button>
        </div>
      }
    >
      You are about to lose all your progress. Are you sure you want to reset?
    </Popup>
  );
};

export default WarningPopup;
