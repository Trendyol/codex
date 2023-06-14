import Popup from '@components/ui/Popup';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { cx } from 'class-variance-authority';
import { DELAY_FOR_WINNERS_POPUP } from 'src/constants';
import { PARTICIPATE_ICON, prizes } from '@modules/Challenge/models/constants';
import { User } from '@hooks/data/models/types';

type WinnerPopupProps = {
  participants: User[];
  order: number;
};

const WinnerPopup: FC<WinnerPopupProps> = ({ participants, order }) => {
  const [popupAvailable, setPopupAvailable] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPopupAvailable(true);
    }, DELAY_FOR_WINNERS_POPUP);
  }, []);

  const closePopup = () => {
    setPopupAvailable(false);
  };

  if (!popupAvailable || !participants.length) return <></>;

  return (
    <Popup showHeader={false} show={true} onHide={closePopup}>
      <div className="mb-10 flex items-center justify-center gap-10">
        <span className="text-4xl">{prizes[order]?.icon || PARTICIPATE_ICON}</span>
        <p className="text-center text-4xl font-semibold">Congratulations</p>
        <span className="text-4xl">{prizes[order]?.icon || PARTICIPATE_ICON}</span>
      </div>
      <div className="flex flex-wrap justify-center gap-10">
        {participants.map(({ id, avatar, name }) => (
          <Image
            key={id}
            className={cx('max-h-[60px] w-[60px] min-w-[60px] rounded-full')}
            width={60}
            height={60}
            alt={name}
            src={avatar}
          />
        ))}
      </div>
      <p className="mb-10 text-center text-2xl">You are number</p>
      <p className="text-center text-6xl font-semibold">{order + 1}</p>
    </Popup>
  );
};

export default WinnerPopup;
