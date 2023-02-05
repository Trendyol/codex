import Card from '@components/ui/Card';
import { User } from '@hooks/data/models/types';
import Image from 'next/image';
import { FC, useState } from 'react';
import { Tooltip } from 'flowbite-react';
import { cx } from 'class-variance-authority';
import { MAX_PARTICIPANT_DISPLAY } from '@modules/Lobby/models/constants';
import { useRouter } from 'next/router';
import { useChallenge } from '@hooks/data';

type ParticipantsProps = {
  activeParticipants: User[];
};

const Participants: FC<ParticipantsProps> = ({ activeParticipants }) => {
  const router = useRouter();
  const { challenge } = useChallenge(router.query.challenge as string);

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
      <div className="mb-3 text-md text-primary-500 font-semibold">
        Participants ({activeParticipants.length}/60)
      </div>
      <div className="-space-x-4 h-14" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="flex -space-x-4 overflow-auto pb-3">
          {activeParticipants
            .slice(0, !expand ? MAX_PARTICIPANT_DISPLAY : activeParticipants.length)
            .map(({ id, name, avatar }) => (
              <div key={id} className="shrink-0 overflow-scroll hover:z-50">
                <Tooltip
                  style="light"
                  content={
                    <div>
                      <div className="text-sm text-primary-500 font-semibold">{name}</div>
                      <div className="text-xs text-secondary-100 font-normal">360 Points</div>
                    </div>
                  }
                >
                  <Image
                    className={cx('border-2 border-white rounded-full')}
                    alt={name}
                    src={avatar}
                    width={56}
                    height={56}
                  />
                </Tooltip>
              </div>
            ))}
          {!expand && activeParticipants.length > MAX_PARTICIPANT_DISPLAY && (
            <div className="flex items-center justify-center w-14 h-14 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full">
              +99
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
export default Participants;
