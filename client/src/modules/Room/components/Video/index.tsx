import { useMe, useRoom } from '@hooks/data';
import { useRouter } from 'next/router';
import Peer from 'peerjs';
import { FC, useEffect, useRef, useState } from 'react';
import {
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsFillMicFill,
  BsFillMicMuteFill,
} from 'react-icons/bs';
type VideoProps = {};

type VideoRef = {
  [peer: string]: any;
};

const Video: FC<VideoProps> = () => {
  const router = useRouter();
  const { me } = useMe();
  const { room } = useRoom(router.query.challenge as string);

  const peerInstance = useRef<Peer>();
  const videoRef = useRef<any>(null);
  const remoteVideoRefs = useRef<VideoRef>({});
  const participants = room?.team.participants.filter((participant) => participant.id !== me?.id);
  const [muteVideo, setMuteVideo] = useState(false);
  const [muteAudio, setMuteAudio] = useState(false);

  useEffect(() => {
    if (!me || !room || !participants) return;

    (async () => {
      const { Peer } = await import('peerjs');
      const peer = new Peer(me.id, {
        host: 'localhost',
        path: '/peerjs',
        port: 4001,
      });
      peerInstance.current = peer;
      peer.on('error', (error: Error) => {});
      peer.on('connection', (...args) => {});

      peerInstance.current.on('open', () => {
        participants.forEach((participant) => call(participant.id));
      });

      peerInstance.current.on('call', (call: any) => {
        const getUserMedia =
          navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        getUserMedia({ video: true, audio: true }, (mediaStream: HTMLMediaElement) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          call.answer(mediaStream);
          call.on('stream', (remoteStream: HTMLMediaElement) => {
            remoteVideoRefs.current[call.peer].srcObject = remoteStream;
            remoteVideoRefs.current[call.peer].play();
          });
        });
      });
    })();
  }, [me, room, participants]);

  const call = (remotePeerId: string) => {
    const getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream: MediaStream) => {
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();

      const call = peerInstance?.current?.call(remotePeerId, mediaStream);

      call?.on('stream', (remoteStream: MediaStream) => {
        remoteVideoRefs.current[remotePeerId].srcObject = remoteStream;
        remoteVideoRefs.current[remotePeerId].play();
      });
    });
  };

  const handleMuteVideo = () => {
    setMuteVideo((muteVideo) => !muteVideo);
    const tracks = videoRef.current?.srcObject?.getVideoTracks();
    tracks.forEach((track: MediaStreamTrack) => (track.enabled = !track.enabled));
  };

  const handleMuteAudio = () => {
    setMuteAudio((muteAudio) => !muteAudio);
    const tracks = videoRef.current?.srcObject?.getAudioTracks();
    tracks.forEach((track: MediaStreamTrack) => (track.enabled = !track.enabled));
  };

  return (
    <div className="w-full">
      <div className="flex h-[40px] items-center justify-between border-b">
        <div className="flex h-full w-full items-center justify-center" onClick={handleMuteVideo}>
          {muteVideo ? <BsCameraVideoOffFill size={20} /> : <BsCameraVideoFill size={20} />}
        </div>
        <div className="flex h-full w-full items-center justify-center" onClick={handleMuteAudio}>
          {muteAudio ? <BsFillMicMuteFill size={20} /> : <BsFillMicFill size={20} />}
        </div>
      </div>
      <div className="flex h-[calc(100%-40px)] flex-col overflow-hidden">
        <video muted className="hidden" controls ref={videoRef} />
        {participants?.map((participant: any, index: number) => (
          <video
            muted
            className="object-cover"
            style={{ height: `${100 / participants.length}%` }}
            key={index}
            playsInline
            controls
            ref={(ref) => (remoteVideoRefs.current[participant.id] = ref)}
            poster={participant.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default Video;
