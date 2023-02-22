import Popup from '@components/ui/Popup';
import { FC } from 'react';

type UpdatePopupProps = {
  show: boolean;
  onHide: () => void;
};

const UpdatePopup: FC<UpdatePopupProps> = ({ show, onHide }) => {
  return <Popup show={show} onHide={onHide} title="Update Profile"></Popup>;
};

export default UpdatePopup;
