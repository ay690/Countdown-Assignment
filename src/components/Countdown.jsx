import React, { useState, useEffect } from "react";
import { FaRegPlayCircle } from "react-icons/fa";

const Countdown = () => {
  const [minutes, setMinutes] = useState(0); // Set an initial value for minutes
  const [seconds, setSeconds] = useState(minutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handlePlayPauseClick = () => {
    setIsActive(true);
  };

  const handleResetClick = () => {
    setIsActive(false);
    setSeconds(minutes * 60);
  };

  const handlePauseClick = () => {
    setIsActive(false);
  };

  const handleMinutesChange = (e) => {
    const newMinutes = parseInt(e.target.value, 10);
    setMinutes(newMinutes);
    setSeconds(newMinutes * 60);
    setIsActive(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="max-w-full p-4 mx-auto mt-8 text-[#008E97]">
      <div className="mb-4">
        <div className="flex items-start">
          <p className="text-2xl text-center font-bold">Enter Minutes</p>
        </div>
        <input
          id="minutesInput"
          type="number"
          min={0}
          value={minutes}
          onChange={handleMinutesChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex justify-center items-center mb-4">
        <button
          onClick={handlePlayPauseClick}
          className="px-4 py-2 font-bold text-[#008E97] rounded"
          disabled={isActive}
        >
          <FaRegPlayCircle size={40} />
        </button>
        <h3 className="ml-1 text-4xl text-center font-bold">
          {formatTime(seconds)}
        </h3>
      </div>

      <div className="flex items-center justify-center mb-4">
        <button
          onClick={handleResetClick}
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
        >
          Reset
        </button>
        <button
          onClick={handlePauseClick}
          className="ml-2 px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
          disabled={!isActive}
        >
          Pause
        </button>
      </div>
    </div>
  );
};

export default Countdown;
