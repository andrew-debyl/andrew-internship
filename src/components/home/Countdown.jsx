import React, { useEffect, useState } from "react";

function Countdown({ initialTime }) {
  const [countDownTime, setCountDownTime] = useState(initialTime);

  useEffect(() => {
    let animationFrameRef;
    let startTime = performance.now();

    const frame = () => {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= 1000) {
        setCountDownTime((prevCountdown) => {
          if (prevCountdown <= 0) {
            cancelAnimationFrame(animationFrameRef);
            return 0;
          }

          return prevCountdown - 0.5;
        });
        startTime = currentTime;
      }

      animationFrameRef = requestAnimationFrame(frame);
    };

    animationFrameRef = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(animationFrameRef);
  }, []);

  function calcTime(time) {
    let savedTime = Date.now();

    if (time) {
      let millisLeft = time - savedTime;
      let secondsLeft = millisLeft / 1000;
      let minutesLeft = secondsLeft / 60;
      let hoursLeft = minutesLeft / 60;

      let secondsToDisplay = Math.floor(secondsLeft % 60);
      let minutesToDisplay = Math.floor(minutesLeft % 60);
      let hoursToDisplay = Math.floor(hoursLeft);

      return `${hoursToDisplay}h ${minutesToDisplay}m ${secondsToDisplay}s`;
    } else {
      return "";
    }
  }

  return <div>{calcTime(countDownTime)}</div>;
}

export default Countdown;
