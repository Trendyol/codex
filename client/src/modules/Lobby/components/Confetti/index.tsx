import { FC, useCallback, useEffect, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { CONFETTI_PARTICLE_COUNT } from 'src/constants';

type ConfettiProps = {};

const Confetti: FC<ConfettiProps> = () => {
  const refAnimationInstance: any = useRef(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((position: number, particleRatio: number, opts: any) => {
    if (!refAnimationInstance.current) return;

    setTimeout(() => {
      refAnimationInstance.current({
        ...opts,
        origin: { y: position },
        particleCount: Math.floor(opts.particleCount ?? CONFETTI_PARTICLE_COUNT * particleRatio),
      });
    }, opts.delay ?? 0);
  }, []);

  const fire = useCallback(() => {
    makeShot(0.7, 0.5, {
      spread: 90,
      startVelocity: 97,
      delay: 800,
    });

    makeShot(0.6, 0.1, {
      spread: 900,
      startVelocity: 17,
      delay: 300,
    });

    makeShot(0.55, 0.25, {
      spread: 900,
      startVelocity: 97,
      delay: 350,
    });

    makeShot(0.6, 0.2, {
      spread: 60,
      delay: 400,
    });

    makeShot(0.6, 0.25, {
      spread: 86,
      startVelocity: 97,
      delay: 450,
    });

    makeShot(0.45, 0.1, {
      spread: 120,
      delay: 100,
    });

    makeShot(0.6, 0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      delay: 500,
    });

    makeShot(0.8, 0.3, {
      spread: 100,
      startVelocity: 45,
      decay: 0.92,
      delay: 550,
      scalar: 1.2,
    });

    makeShot(0.8, 0.3, {
      spread: 1000,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      delay: 300,
    });

    makeShot(0.6, 0.3, {
      spread: 500,
      startVelocity: 50,
      decay: 0.92,
      scalar: 1.2,
      delay: 1200,
      particleCount: 2000,
    });

    makeShot(0.8, 0.3, {
      spread: 500,
      startVelocity: 50,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.9, 0.3, {
      spread: 500,
      startVelocity: 50,
      decay: 0.92,
      scalar: 1.2,
      delay: 150,
    });

    makeShot(0.5, 0.1, {
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
      className="z-50 pointer-events-none fixed left-0 top-0 h-full w-full"
    />
  );
};

export default Confetti;
