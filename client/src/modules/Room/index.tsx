import Countdown from '@components/shared/Countdown';
import Description from '@components/shared/Description';
import { useChallenge, useRoom } from '@hooks/data';
import { useMe } from '@hooks/data/useMe';
import { joinRoom } from '@services/room';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Room = () => {
  const router = useRouter();
  const { challenge } = useChallenge(router.query.challenge as string);
  const { room } = useRoom(router.query.challenge as string);
  const { me } = useMe();

  useEffect(() => {
    if (!room || !me) return;

    joinRoom(room.team.id, me.id);
  }, [room, me]);

  return (
    <div className="flex gap-6 h-[calc(100vh-94px)] flex-1 pb-6">
      <div className="w-full space-y-6">
        <div className="w-[380px] h-full">
          <Description title={'3. Longest Substring Without Repeating Characters'} />
        </div>
      </div>
      <div className="flex flex-col gap-6 flex-shrink-0 w-sidebar xl:w-[270px] md:hidden">
        <Countdown date={challenge?.date}></Countdown>
      </div>
    </div>
  );
};

export default Room;
