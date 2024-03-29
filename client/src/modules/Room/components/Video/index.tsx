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
import { useConfig } from '@contexts/ConfigContext';
import { cx } from 'class-variance-authority';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Button from '@components/ui/Button';
type VideoProps = {};

type VideoRef = {
  [peer: string]: any;
};

const Video: FC<VideoProps> = () => {
  const config = useConfig();

  const { query, isReady } = useRouter();
  const { me } = useMe();
  const { room } = useRoom(query.challenge as string, isReady);

  const peerInstance = useRef<Peer>();
  const videoRef = useRef<any>(null);
  const remoteVideoRefs = useRef<VideoRef>({});
  const hasInitialized = useRef(false);
  const participants = room?.team.participants.filter((participant) => participant.id !== me?.id);
  const [muteVideo, setMuteVideo] = useState(false);
  const [muteAudio, setMuteAudio] = useState(false);
  const [hidePreview, setHidePreview] = useState(false);

  useEffect(() => {
    if (!me || !room || !participants || peerInstance.current || hasInitialized.current) return;

    (async () => {
      hasInitialized.current = true;
      const { Peer } = await import('peerjs');

      const peer = new Peer(me.id, {
        host: config.peerjsHost,
        path: '/peerjs',
        // port: Number(config.peerjsPort),
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

  useEffect(() => {
    return () => {
      peerInstance.current?.destroy();
    };
  }, []);

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

  const handleHidePreview = () => {
    setHidePreview((hidePreview) => !hidePreview);
  };

  const cameraHeight = participants
    ? `${100 / (participants.length + (hidePreview ? 0 : 1))}%`
    : '100%';

  return (
    <div className="w-full">
      <div className="flex h-[40px] items-center justify-between border-b">
        <Button
          disabled
          intent={'text'}
          className="flex h-full w-full items-center justify-center"
          onClick={handleMuteVideo}
        >
          {muteVideo ? <BsCameraVideoOffFill size={20} /> : <BsCameraVideoFill size={20} />}
        </Button>
        <Button
          disabled
          intent={'text'}
          className="flex h-full w-full items-center justify-center"
          onClick={handleMuteAudio}
        >
          {muteAudio ? <BsFillMicMuteFill size={20} /> : <BsFillMicFill size={20} />}
        </Button>
        <Button
          intent={'text'}
          className="flex h-full w-full items-center justify-center"
          onClick={handleHidePreview}
        >
          {hidePreview ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
        </Button>
      </div>
      <div className="flex h-[calc(100%-40px)] flex-col overflow-hidden">
        <video
          muted
          style={{ height: cameraHeight }}
          className={cx('object-cover', hidePreview ? 'hidden' : '')}
          ref={videoRef}
        />
        {participants?.map((participant, index) => (
          <video
            className="object-cover"
            style={{ height: cameraHeight }}
            key={index}
            playsInline
            ref={(ref) => (remoteVideoRefs.current[participant.id] = ref)}
            poster={participant.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default Video;
