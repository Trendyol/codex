import { useCallback, useEffect, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { CONFETTI_PARTICLE_COUNT } from 'src/constants';

const Confetti = () => {
  const refAnimationInstance: any = useRef(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((position: number, particleRatio: number, opts: any) => {
    if (!refAnimationInstance.current) return;

    refAnimationInstance.current({
      ...opts,
      origin: { y: position },
      particleCount: Math.floor(CONFETTI_PARTICLE_COUNT * particleRatio),
    });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.7, 0.5, {
      spread: 90,
      startVelocity: 97,
    });

    makeShot(0.6, 0.1, {
      spread: 900,
      startVelocity: 17,
    });

    makeShot(0.2, 0.25, {
      spread: 900,
      startVelocity: 97,
    });

    makeShot(0.6, 0.2, {
      spread: 60,
    });

    makeShot(0.4, 0.25, {
      spread: 86,
      startVelocity: 97,
    });

    makeShot(0.3, 0.1, {
      spread: 20,
    });

    makeShot(0.6, 0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.7, 0.3, {
      spread: 200,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.7, 0.3, {
      spread: 200,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.4, 0.1, {
      spread: 200,
      startVelocity: 45,
      decay: 0.92,
    });
  }, [makeShot]);

  useEffect(() => {
    fire();
  }, []);

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      }}
    />
  );
};

export default Confetti;
