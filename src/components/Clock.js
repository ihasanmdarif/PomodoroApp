import React, { useContext, useEffect, useState } from "react";
import useSound from "use-sound";
import styled, { css } from "styled-components";
import { AppContext } from "../AppProvider";
import siren from "../tones/siren.mp3";

const ClockDial = styled.div`
  margin: 30px auto;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  box-shadow: -16px -15px 39px -24px rgba(255, 255, 255, 0.5);
  padding: 13px;
  background: linear-gradient(129deg, #0d0e25 30%, rgb(73 73 97 / 40%) 73%);
`;

const InnerClockDial = styled.div`
  position: relative;
  background: #1f2141;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  cursor: pointer;
`;

const Svg = styled.svg`
  transform: scaleX(-1);
`;

const TimerSpan = styled.span`
  position: absolute;
  width: 260px;
  height: 260px;
  top: 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: #f5f5f5;
  font-weight: bolder;
`;

const CirclePath = styled.circle`
  //   stroke-width: 4px;
  //   stroke: ${(props) => props.theme.colors.main};
`;

const GCircle = styled.g`
  fill: none;
  stroke: none;
`;

const RemainingPath = styled.path`
  stroke-width: 5px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  stroke: ${(props) => props.theme.colors.main};
`;

const Button = styled.span`
  padding: 10px;
  text-transform: uppercase;
  font-size: 15px;
  letter-spacing: 7px;
  color: #bdc3c7;
`;
let timerInterval = null;

const Clock = () => {
  const {
    currentMood,
    isTimerOn,
    toggleTimerSwitch,
    decrementTime,
    resetCurrentTimer,
  } = useContext(AppContext);

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);

    let seconds = time % 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
  };

  let startTime = 0;

  const handleTimerSwitch = () => {
    toggleTimerSwitch();
    if (!isTimerOn) {
      timerInterval = setInterval(() => {
        startTime++;
        decrementTime(startTime);
      }, 1000);
    } else {
      resetCurrentTimer();
      clearInterval(timerInterval);
    }
  };

  function calculateDashArray() {
    const { currentTime, maxTime } = currentMood;
    let timeFraction = currentTime / maxTime;
    timeFraction = timeFraction - (1 / maxTime) * (1 - timeFraction);
    timeFraction = timeFraction <= 0 ? 0 : timeFraction;
    const remainingDashArray = (timeFraction * 283).toFixed(0);
    return `${remainingDashArray} 283`;
  }

  const [playSiren] = useSound(siren, {
    onend: resetCurrentTimer,
  });

  useEffect(() => {
    if (currentMood.currentTime == 0 || !isTimerOn) {
      clearInterval(timerInterval);
      playSiren();
    }
  }, [currentMood, isTimerOn]);

  return (
    <ClockDial>
      <InnerClockDial onClick={handleTimerSwitch}>
        <Svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <GCircle>
            <CirclePath cx="50" cy="50" r="45"></CirclePath>
            <RemainingPath
              strokeDasharray={calculateDashArray()}
              d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></RemainingPath>
          </GCircle>
        </Svg>
        <TimerSpan>
          {formatTime(currentMood.currentTime)}
          <Button>{isTimerOn ? "stop" : "start"}</Button>
        </TimerSpan>
      </InnerClockDial>
    </ClockDial>
  );
};

export default Clock;
