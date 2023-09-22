import React, { useState, useEffect } from "react";

export const Counter = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(interval);
          setIsActive(false);
        } else {
          if (seconds === 0) {
            if (minutes === 0) {
              setHours((prevHours) => prevHours - 1);
              setMinutes(59);
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
            }
            setSeconds(59);
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, hours, minutes, seconds]);

  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  const reset = () => {
    setHours(0);
    setMinutes(5);
    setSeconds(0);
  };

  return (
    <div className="container">
        <h1>COUNTDOWN-TIMER</h1>
      <div className="timer">
        <p className="time">
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </p>
     

      <div className="btns">
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={() => setIsActive(false)}>Stop</button>
        <button onClick={() => reset()}>Reset</button>
      </div>
 </div>

{isActive ?  <></> : <> <div className="user-input">
        <p>Change Counter Time</p>
        <div className="each-time">
              <label>Hour</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
          disabled={isActive}
        />
        </div>
      <div className="each-time">
         <label>Minute</label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
          disabled={isActive}
        />
      </div>
       <div className="each-time">
          <label>Second</label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(parseInt(e.target.value))}
          disabled={isActive}
        />
       </div>
      
      </div> </> }
     
    </div>
  );
};
