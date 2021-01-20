import React, { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import themes from "./styles/theme";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const appMoods = [
    {
      name: "pomodoro",
      displayName: "pomodoro",
      maxTime: 1500,
      currentTime: 1500,
    },
    {
      name: "shortBreak",
      displayName: "short break",
      maxTime: 300,
      currentTime: 300,
    },
    {
      name: "longBreak",
      displayName: "long break",
      maxTime: 900,
      currentTime: 900,
    },
  ];

  const defaultMood = appMoods[0];

  const defaultTheme = themes.tomato;

  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  const [currentMood, setCurrentMood] = useState(defaultMood);

  const [moods, setMoods] = useState(appMoods);

  const [isTimerOn, setIsTimerOn] = useState(false);

  const decrementTime = (updatedTime) => {
    setCurrentMood((prevState) => ({
      ...prevState,
      currentTime: prevState.maxTime - updatedTime,
    }));
  };

  const toggleTheme = (theme) => {
    setCurrentTheme(theme);
  };

  const toggleMoods = (mood) => {
    setCurrentMood(mood);
  };

  const toggleTimerSwitch = () => {
    setIsTimerOn(!isTimerOn);
  };

  const resetTimer = () => {
    setIsTimerOn(false);
  };

  const resetCurrentTimer = () => {
    setCurrentMood((prevState) => ({
      ...prevState,
      currentTime: prevState.maxTime,
    }));
  };

  const changeMoodTimer = (moods) => {
    console.log(moods);
    setMoods(moods);
  };

  const value = {
    moods,
    themes,
    isTimerOn,
    currentTheme,
    currentMood,
    changeMoodTimer,
    resetTimer,
    toggleMoods,
    toggleTheme,
    decrementTime,
    resetCurrentTimer,
    toggleTimerSwitch,
  };

  return (
    <AppContext.Provider value={value}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
