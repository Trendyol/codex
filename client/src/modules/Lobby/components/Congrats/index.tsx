import Popup from '@components/ui/Popup';
import { FC, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { prizes } from '@modules/Challenge/models/constants';
import { usePlacements } from '@hooks/data/usePlacements';
import { useRouter } from 'next/router';
import { useRoom } from '@hooks/data';
import { getSeedAvatar, getSeedName } from '@utils/common';
import { Tooltip } from 'flowbite-react';
import { ThemeContext } from '@contexts/ThemeContext';
import Spinner from '@components/shared/Spinner';
import { DELAY_FOR_WINNERS_POPUP } from 'src/constants';
import Confetti from '../Confetti';

type CongratsProps = {};

const Congrats: FC<CongratsProps> = () => {
  const { query, isReady } = useRouter();
  const { placements } = usePlacements(query.challenge as string, isReady);
  const { room } = useRoom(query.challenge as string, isReady);
  const { theme } = useContext(ThemeContext);
  const [showWinnersPopup, setShowWinnersPopup] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setShowWinnersPopup(true);
    }, DELAY_FOR_WINNERS_POPUP);
  },[]);

  const handleHideWinnersPopup = () => setShowWinnersPopup(false);

  const order = Number(placements?.findIndex((placement) => placement?.teamId === room?.team.id));
  const placement = placements?.[order];
  const prizeIcon = prizes[order]?.icon;

  const shouldShowWinnersPopup = Boolean(showWinnersPopup && placement);
  
  if (!shouldShowWinnersPopup) return <></>

  return (
    <>
      <Confetti />
      <Popup
        title={
          <div className="flex w-full items-center justify-center gap-8 text-center">
            <span className="text-4xl">{prizeIcon}</span>
            <p className="text-center text-3xl font-semibold">Congratulations</p>
            <span className="text-4xl">{prizeIcon}</span>
          </div>
        }
        show={shouldShowWinnersPopup}
        onHide={handleHideWinnersPopup}
        showClose={false}
      >
        {placement ? (
          <>
            <div className="flex flex-wrap justify-center gap-4">
              {placement.participants.map(({ id, avatar, name, points }) => (
                <Tooltip
                  key={id}
                  style={theme}
                  content={
                    <div>
                      <div className="text-sm font-semibold text-primary-500">
                        {name || getSeedName(id)}
                      </div>
                      <div className="text-xs font-normal text-secondary-100">{points} Points</div>
                    </div>
                  }
                >
                  <Image
                    key={id}
                    className={'max-h-[60px] w-[60px] min-w-[60px] rounded-full'}
                    width={60}
                    height={60}
                    alt={name}
                    src={avatar || getSeedAvatar(id)}
                  />
                </Tooltip>
              ))}
            </div>
            <p className="text-center text-xl text-secondary-200">You are number</p>
            <div className="text-center text-6xl font-semibold">{order + 1}</div>
          </>
        ) : (
          <Spinner className="flex w-full justify-center" />
        )}
      </Popup>
    </>
  );
};

export default Congrats;
