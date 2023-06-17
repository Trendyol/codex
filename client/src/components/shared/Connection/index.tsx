import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { FC, useEffect, useState } from 'react';
import ConnectionPopup from './components/ConnectionPopup';
import AccessIndicator from './components/AccessIndicator';

type ConnectionProps = {};

const Connection: FC<ConnectionProps> = () => {
  const [showConnectionPopup, setShowConnectionPopup] = useState(false);

  const [hasAudioAccess, setHasAudioAccess] = useState(false);
  const [hasVideoAccess, setHasVideoAccess] = useState(false);

  const handleShowConnectionPopup = () => setShowConnectionPopup(true);
  const handleHideConnectionPopup = () => setShowConnectionPopup(false);

  const checkMediaAccess = async () => {
    navigator.mediaDevices.enumerateDevices().then((devices) =>
      devices.forEach((device) => {
        if (device.kind == 'audioinput' && device.label) setHasAudioAccess(true);
        if (device.kind == 'videoinput' && device.label) setHasVideoAccess(true);
      }),
    );
  };

  useEffect(() => {
    navigator.mediaDevices.ondevicechange = () => {
      checkMediaAccess();
    };
    checkMediaAccess();
  }, []);

  return (
    <Card className="flex flex-col items-center gap-4 overflow-hidden">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <AccessIndicator name="Audio" access={hasAudioAccess} />
          <AccessIndicator name="Video" access={hasVideoAccess} />
        </div>
      </div>
      <Button intent={'secondary'} fluid onClick={handleShowConnectionPopup}>
        Check Your Connection
      </Button>
      <ConnectionPopup
        show={showConnectionPopup}
        onHide={handleHideConnectionPopup}
        hasAudioAccess={hasAudioAccess}
        hasVideoAccess={hasVideoAccess}
        checkMediaAccess={checkMediaAccess}
      />
    </Card>
  );
};

export default Connection;
