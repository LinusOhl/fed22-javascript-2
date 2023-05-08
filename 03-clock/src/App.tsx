import { useEffect, useState } from "react";
import "./assets/scss/App.scss";

function App() {
  const [time, setTime] = useState(() => {
    return new Date().toLocaleTimeString();
  });

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <div className="container">
      <div className="display-1 text-center">{time}</div>
    </div>
  );
}

export default App;
