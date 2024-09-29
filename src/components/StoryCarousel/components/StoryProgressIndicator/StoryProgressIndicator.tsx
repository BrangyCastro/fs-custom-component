import { useEffect, useRef, useState } from "react";

import "./StoryProgressIndicator.css";
import { useStoryContext } from "../StoryContext";

interface StoryProgressIndicatorProps {
  isActive: boolean;
  isPaused: boolean;
  onComplete: () => void;
}

export const StoryProgressIndicator: React.FC<StoryProgressIndicatorProps> = ({
  isActive,
  isPaused,
  onComplete,
}) => {
  const { duration } = useStoryContext();
  const [progress, setProgress] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }

    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(intervalRef.current!);

        setTimeout(() => {
          onComplete();
        }, 0);

        return 100;
      });
    }, duration / 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, duration, onComplete, isPaused]);

  return (
    <div className="progress-container navigation-area">
      <div className="progress-bar">
        <div className="bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};
