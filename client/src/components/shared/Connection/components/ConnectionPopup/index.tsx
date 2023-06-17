import Button from '@components/ui/Button';
import Popup from '@components/ui/Popup';
import { FC, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import AccessIndicator from '../AccessIndicator';

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

  const showAccessedMedia = async () => {
    const constraints = {
      audio: true,
      video: true,
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
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
    <Popup title="Check your connection" show={show} onHide={onHide}>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <AccessIndicator name="Audio" access={hasAudioAccess} />
          <AccessIndicator name="Video" access={hasVideoAccess} />
        </div>
        <div className="mt-6 h-[280px]">
          <video className="h-[280px] rounded-md" ref={videoRef}></video>
        </div>
        <div className="mt-4 text-xs text-secondary-100">
          You should be able to see and hear yourself. If you are experiencing problems you should
          check your browser permissions. If problem still exists we recommend using Google Chrome
        </div>
        <Button className="mt-1" intent={'text'} onClick={checkMediaAccess}>
          Refresh
        </Button>
      </div>
    </Popup>
  );
};

export default ConnectionPopup;
