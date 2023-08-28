import { useEffect, useState } from "react";

function useCountDown(initialTime, interval = 1000) {
  const [time, setTime] = useState(initialTime * 1000);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time > 0) setTime((prevTime) => prevTime - interval);
    }, interval);

    return () => clearInterval(intervalId);
  }, [time]);

  return time / 1000;
}



export default useCountDown;
