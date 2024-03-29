import Popup from '@components/ui/Popup';
import { FC, useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { prizes } from '@modules/Challenge/models/constants';
import { usePlacements } from '@hooks/data/usePlacements';
import { useRouter } from 'next/router';
import { useRoom } from '@hooks/data';
import { getSeedAvatar, getSeedName } from '@utils/common';
import { Tooltip } from 'flowbite-react';
import { ThemeContext } from '@contexts/ThemeContext';
import { useWindowSize } from 'react-use';
import Spinner from '@components/shared/Spinner';
import dynamic from 'next/dynamic';
import Confetti from '../Confetti/index';

const ConfettiBackground = dynamic(() => import('react-confetti'), {
  ssr: false,
});

type CongratsProps = {};

const Congrats: FC<CongratsProps> = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { query, isReady } = useRouter();
  const { placements } = usePlacements(query.challenge as string, isReady);
  const { room } = useRoom(query.challenge as string, isReady);
  const { theme } = useContext(ThemeContext);
  const { width, height } = useWindowSize();
  const [showWinnersPopup, setShowWinnersPopup] = useState(true);

  useEffect(() => {
    audioRef.current?.play();

    // User action is required to play audio on some browsers
    window.addEventListener('mouseover', () => {
      audioRef.current?.play();
    });
  }, []);

  const handleHideWinnersPopup = () => {
    setShowWinnersPopup(false);
  };

  const order = Number(placements?.findIndex((placement) => placement?.teamId === room?.team.id));
  const placement = placements?.[order];
  const prizeIcon = prizes[order]?.icon;

  const shouldShowWinnersPopup = Boolean(showWinnersPopup && placement);

  if (!shouldShowWinnersPopup) return <></>;

  return (
    <>
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
      <audio src="/winner.mp3" ref={audioRef} />
      <Confetti />
      <ConfettiBackground width={width} height={height} />
    </>
  );
};

export default Congrats;
