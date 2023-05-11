import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(() => {
    return new Date().toLocaleTimeString();
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      console.log("stopped clock...");
      clearInterval(intervalId);
    };
  }, []);

  return <div className="display-1 text-center">{time}</div>;
};

export default Clock;
