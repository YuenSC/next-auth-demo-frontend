import { useCallback, useState } from "react";
import Time from "../utils/Time";
import useInterval from "./useInterval";

export default function useStopwatch({
  onUpdate,
}: {
  onUpdate?: (record: {
    totalSeconds: number;
    seconds: number;
    minutes: number;
    hours: number;
  }) => void;
} = {}) {
  const [prevTime, setPrevTime] = useState(new Date());
  const [seconds, setSeconds] = useState(
    Time.getSecondsFromPrevTime(prevTime, true),
  );
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      setSeconds(Time.getSecondsFromPrevTime(prevTime, true));
      onUpdate?.(
        Time.getTimeFromSeconds(Time.getSecondsFromPrevTime(prevTime, true)),
      );
    },
    isRunning ? 1000 : null,
  );

  const start = useCallback(
    (prevTime: Date) => {
      setIsRunning(true);
      setPrevTime(prevTime);
      setSeconds(Time.getSecondsFromPrevTime(prevTime, true));
    },
    [setSeconds],
  );

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(0);
  }, []);

  return {
    ...Time.getTimeFromSeconds(seconds),
    start,
    pause,
    reset,
    isRunning,
  };
}
