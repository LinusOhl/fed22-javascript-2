import { useState } from "react";

const ClickCounter = () => {
  const [clicks, setClicks] = useState(0);

  const handleButtonClick = () => {
    setClicks((prevClicks) => {
      return prevClicks + 1;
    }); // prevClicks = 0, return 1

    setClicks((prevClicks) => prevClicks + 1); // prevClicks = 1, return 2
  };

  return (
    <div>
      <p>You have clicked the button {clicks} times.</p>

      <button onClick={handleButtonClick} className="btn btn-success btn-lg">
        Click me!
      </button>
    </div>
  );
};

export default ClickCounter;
