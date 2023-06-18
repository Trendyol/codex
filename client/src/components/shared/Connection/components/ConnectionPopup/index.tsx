import Button from '@components/ui/Button';
import Popup from '@components/ui/Popup';
import { FC, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import AccessIndicator from '../AccessIndicator';
import { AiFillSound } from 'react-icons/ai';

type ConnectionPopupProps = {
  show: boolean;
  onHide: () => void;
  hasAudioAccess: boolean;
  hasVideoAccess: boolean;
  checkMediaAccess: () => void;
};

const ConnectionPopup: FC<ConnectionPopupProps> = ({
  show,
  onHide,
  hasAudioAccess,
  hasVideoAccess,
  checkMediaAccess,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [volumeLevel, setVolumeLevel] = useState(0);

  const showAccessedMedia = async () => {
    try {
      let maxLevelL = 0;
      let oldLevelL = 0;

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const audioContext = new AudioContext();
      const microphone = audioContext.createMediaStreamSource(stream);
      const processorNode = audioContext.createScriptProcessor(1024, 1, 1);

      microphone.connect(processorNode);
      processorNode.connect(audioContext.destination);
      processorNode.onaudioprocess = (event) => {
        const inputL = event.inputBuffer.getChannelData(0);
        let instantL = 0.0;
        let sumL = 0.0;

        for (let i = 0; i < inputL.length; ++i) {
          sumL += inputL[i] * inputL[i];
        }
        instantL = Math.sqrt(sumL / inputL.length);
        maxLevelL = Math.max(maxLevelL, instantL);
        instantL = Math.max(instantL, oldLevelL - 0.008);
        oldLevelL = instantL;
        setVolumeLevel(instantL / maxLevelL);
      };
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.volume = 0.4;
        videoRef.current.play();
      }
    } catch (err) {
      toast.error('You need to allow access to your microphone and camera');
    }
  };

  useEffect(() => {
    if (!show) return;
    showAccessedMedia();

    return () => {
      window.location.reload();
    };
  }, [show]);

  return (
    <Popup title="Check Your Connection" show={show} onHide={onHide}>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <AccessIndicator name="Audio" access={hasAudioAccess} />
          <AccessIndicator name="Video" access={hasVideoAccess} />
        </div>
        <div className="mt-2 h-[300px]">
          <div className="flex w-full items-center ">
            <AiFillSound className="mr-1" size={16} />
            <div className="h-3 w-full overflow-hidden rounded-md">
              <div
                style={{ width: `${volumeLevel * 100}%` }}
                className="h-3 rounded-md bg-success"
              ></div>
            </div>
          </div>
          <video muted controls className="mt-2 h-[264px] w-[352px] rounded-md" ref={videoRef}></video>
        </div>
        <div className="text-xs text-secondary-100">
          You should be able to see your video and your voice level. If you are experiencing problems you
          should check your browser permissions and refresh it. If problem still
          exists we recommend using Google Chrome
        </div>
        <Button className="mt-1" intent={'text'} onClick={checkMediaAccess}>
          Refresh
        </Button>
      </div>
    </Popup>
  );
};

export default ConnectionPopup;
