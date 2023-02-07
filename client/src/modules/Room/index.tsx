import Chat from '@components/shared/Chat';
import Countdown from '@components/shared/Countdown';
import Description from '@components/shared/Description';
import Editor from '@components/shared/Editor';
import Submission from '@components/shared/Submission';
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
    <div className="flex h-[calc(100vh-94px)] gap-6 pb-6">
      <div className="h-full w-[350px] overflow-auto">
        <Description title={'3. Longest Substring Without Repeating Characters'} />
      </div>
      <div className="flex flex-1 flex-col gap-6">
        <Editor />
        <Submission />
      </div>
      <div className="flex w-[320px] shrink-0 flex-col gap-6 md:hidden">
        <Countdown date={challenge?.date} />
        <Chat className="flex-1" sendMessage={() => {}} messages={[]}></Chat>
      </div>
    </div>
  );
};

export default Room;
