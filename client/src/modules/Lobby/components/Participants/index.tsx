import Card from '@components/ui/Card';
import { User } from '@hooks/data/models/types';
import Image from 'next/image';
import { FC, useContext, useState } from 'react';
import { Tooltip } from 'flowbite-react';
import { cx } from 'class-variance-authority';
import { MAX_PARTICIPANT_DISPLAY } from '@modules/Lobby/models/constants';
import { ThemeContext } from '@contexts/ThemeContext';
import { getSeedAvatar, getSeedName } from '@utils/common';

type ParticipantsProps = {
  activeParticipants: User[];
};

const Participants: FC<ParticipantsProps> = ({ activeParticipants }) => {
  const { theme } = useContext(ThemeContext);

  const [expand, setExpand] = useState(false);
  const [delayHandler, setDelayHandler] = useState<NodeJS.Timeout>();

  const handleMouseLeave = () => {
    setDelayHandler(
      setTimeout(() => {
        setExpand(false);
      }, 2000),
    );
  };

  const handleMouseEnter = () => {
    setExpand(true);
    clearTimeout(delayHandler);
  };

  return (
    <Card>
      <div className="text-md mb-3 font-semibold text-primary-500">
        Participants ({activeParticipants.length}/60)
      </div>
      <div
        className="h-14 -space-x-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex -space-x-4 overflow-auto">
          {activeParticipants
            .slice(0, !expand ? MAX_PARTICIPANT_DISPLAY : activeParticipants.length)
            .map(({ id, name, avatar, points }) => (
              <div key={id} className="shrink-0 overflow-scroll hover:z-50">
                <Tooltip
                  style={theme}
                  content={
                    <div>
                      <div className="text-sm font-semibold text-primary-500">{name || getSeedName(id)}</div>
                      <div className="text-xs font-normal text-secondary-100">{points} Points</div>
                    </div>
                  }
                >
                  <Image
                    className={cx('max-h-[56px] w-[56px] min-w-[56px] rounded-full border-2 border-border')}
                    alt={name}
                    src={avatar || getSeedAvatar(id)}
                    width={56}
                    height={56}
                  />
                </Tooltip>
              </div>
            ))}
          {!expand && activeParticipants.length > MAX_PARTICIPANT_DISPLAY && (
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-gray-700 text-xs font-medium text-white">
              +{activeParticipants.length - MAX_PARTICIPANT_DISPLAY}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
export default Participants;
