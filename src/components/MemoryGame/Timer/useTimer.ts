import { useState, useRef, useEffect } from 'react';

export const useTimer = () => {
  const [displayTime, setDisplayTime] = useState('00:00');
  const timeRef = useRef(0);
  const timerIdRef = useRef<number | undefined>(0);

  const secondFormatter = new Intl.NumberFormat('ru', {
    style: 'unit',
    unit: 'second',
    unitDisplay: 'long',
  });

  const minuteFormatter = new Intl.NumberFormat('ru', {
    style: 'unit',
    unit: 'minute',
    unitDisplay: 'long',
  });

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    if (timerIdRef.current === undefined) {
      if (mins > 0) {
        const formatedMinutes = minuteFormatter.format(mins);
        const formatedSeconds = secondFormatter.format(secs);
        return `${formatedMinutes} ${formatedSeconds} `;
      } else {
        const formatedSeconds = secondFormatter.format(secs);
        return `${formatedSeconds}`;
      }
    } else {
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  };
  const start = () => {
    if (timerIdRef.current) return;
    timerIdRef.current = setInterval(() => {
      timeRef.current += 1;
      setDisplayTime(formatTime(timeRef.current));
    }, 1000);
  };

  const stop = () => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = undefined;
      setDisplayTime(formatTime(timeRef.current));
    }
  };

  const reset = () => {
    stop();
    timeRef.current = 0;
    setDisplayTime('00:00');
  };

  useEffect(() => {
    return () => stop();
  }, []);

  return { displayTime, start, stop, reset };
};
