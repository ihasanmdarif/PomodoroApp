import React, { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import {
  FiSettings,
  FiX,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

import { AppContext } from "../AppProvider";

import { device } from "../styles/device";

// color: #bdc3c7;
const Icon = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.colors.main};
`;

const Modal = styled.div`
  display: ${(props) => (props.showModal ? "block" : "none")};
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);

  @media ${device.mobileS} {
    padding-top: 20px;
  }

  @media ${device.mobileL} {
    padding-top: 70px;
  }
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  border: 1px solid #888;
  max-width: 80%;
  border-radius: 8px;
  padding: 20px 10px;

  @media ${device.mobileS} {
    padding: 5px;
    max-width: 85%;
  }
`;

const ModalFooter = styled.div``;

const ModalSavedButton = styled.span`
  position: relative;
  bottom: 12px;
  color: white;
  text-transform: capitalize;
  font-size: 18px;
  padding: 12px 25px;
  border-radius: 38px;
  font-weight: bold;
  cursor: pointer;
  background: ${(props) => props.theme.colors.main};

  @media ${device.mobileS} {
    padding: 6px 18px;
    bottom: 12px;
  }
`;

const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #bdc3c7;
`;

const HeaderText = styled.span`
  font-weight: bolder;
  padding: 20px;

  @media ${device.mobileS} {
    padding: 10px;
  }
  @media ${device.mobileL} {
    padding: 15px;
  }

  @media ${device.tablet} {
    font-size: 28px;
    padding: 20px;
  }
`;

const HeaderIcon = styled.span`
  cursor: pointer;
  padding: 20px;

  @media ${device.mobileS} {
    padding: 10px;
  }

  @media ${device.mobileL} {
    padding: 15px;
  }

  @media ${device.tablet} {
    padding: 20px;
  }
`;

const SettingsBody = styled.div``;

const TimeSettings = styled.div`
  padding: 20px;
  border-bottom: 1px solid #bdc3c7;
  @media ${device.mobileS} {
    padding: 10px;
  }
  @media ${device.mobileL} {
    padding: 15px;
  }
  @media ${device.tablet} {
    padding: 20px;
  }
`;

const ColorSettings = styled.div`
  padding: 20px;

  @media ${device.mobileS} {
    padding: 10px;
  }
`;

const ColorSettingsContent = styled.span`
  background: ${(props) => props.background};
  border-radius: 50%;
  display: inline-block;
  margin: 10px 6px;
  padding: 8px 10px;
  cursor: pointer;

  @media ${device.mobileS} {
    padding: 4px 5px;
  }
`;

const OtherHeader = styled.div`
  text-transform: uppercase;
  letter-spacing: 7px;
  font-weight: bold;
  padding: 5px;

  @media ${device.mobileS} {
    letter-spacing: 3px;
    font-size: 15px;
  }
  @media ${device.mobileL} {
    letter-spacing: 5px;
    font-size: 18px;
  }
  @media ${device.tablet} {
    letter-spacing: 10px;
    font-size: 24px;
  }
`;

const Selection = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 5px;
  line-height: 3;
  overflow: hidden;
  border-radius: 0.25em;

  @media ${device.tablet} {
    flex-flow: column;
  }
`;

const SelectionWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;

  @media ${device.mobileS} {
    flex-flow: column;
  }
  @media ${device.tablet} {
    flex-flow: row;
  }
`;

const Select = styled.select`
  font-size: 24px;
  border: none;
  border-radius: 10px;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: #e0e0e0;
  padding: 0 0 0 1em;
  color: black;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  width: 45%;
  position: relative;
  pointer-events: auto;

  @media ${device.mobileS} {
    padding: 10px;
    height: 40px;
    width: 120px;
  }
`;

const Option = styled.option``;

const Chevrons = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column;
  right: 0;
  padding: 8px 10px;
  pointer-events: none;

  @media ${device.mobileS} {
    padding: 4px;
  }
  @media ${device.tablet} {
    top: 48px;
    right: 5px;
  }
`;

const Label = styled.span`
  color: #757575;
  @media ${device.tablet} {
    text-align: start;
  }
`;

const shakeAnimation = keyframes`
0%, 100% {transform: translateX(0);}
10%, 30%, 50%, 70%, 90% {transform: translateX(-10px);}
20%, 40%, 60%, 80% {transform: translateX(10px);}
`;

const ToolTip = styled.div`
  padding: 5px;
  color: white;
  display: block;
  width: 80%;
  margin: 0 auto;
  font-weight: bolder;
  animation-name: ${shakeAnimation};
  animation-duration: 1s;
  animation-fill-mode: both;
`;

const SettingsModal = () => {
  const {
    currentTheme,
    themes,
    toggleTheme,
    moods,
    isTimerOn,
    changeMoodTimer,
  } = useContext(AppContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isToolTipOpen, setIsToolTipOpen] = useState(false);

  const [currentSettings, setCurrentSettings] = useState({
    timer: moods,
    color: {
      ...currentTheme,
    },
  });

  const showModal = () => {
    if (isTimerOn) {
      setIsToolTipOpen(true);
      setTimeout(() => {
        setIsToolTipOpen(false);
      }, 2500);
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleColorChanges = (theme) => {
    setCurrentSettings((prevState) => ({ ...prevState, color: theme }));
  };

  const handleTimerChanges = (event) => {
    const { value, name } = event.target;
    const valueAsSeconds = value * 60;

    setCurrentSettings((prevState) => ({
      ...prevState,
      timer: prevState.timer.map((mood) => {
        if (mood.name === name) {
          mood.maxTime = valueAsSeconds;
          mood.currentTime = valueAsSeconds;
        }
        return mood;
      }),
    }));
  };

  const applyNewSettings = () => {
    const { timer, color: theme } = currentSettings;
    toggleTheme(theme);
    changeMoodTimer(timer);
    closeModal();
  };

  return (
    <>
      <Modal showModal={isModalOpen}>
        <ModalContent>
          <SettingsHeader>
            <HeaderText>Settings</HeaderText>
            <HeaderIcon>
              <FiX size="18px" onClick={closeModal} />
            </HeaderIcon>
          </SettingsHeader>
          <SettingsBody>
            <TimeSettings>
              <OtherHeader>time (minutes)</OtherHeader>
              <SelectionWrapper>
                {moods.map((mood) => {
                  return (
                    <Selection key={mood.name}>
                      <Label>{mood.displayName}</Label>
                      <Select
                        name={mood.name}
                        value={mood.maxTime / 60}
                        onChange={(e) => handleTimerChanges(e)}
                      >
                        {[...Array(60).keys()].map((_, index) => {
                          return (
                            <Option key={index} value={index + 1}>
                              {index + 1}
                            </Option>
                          );
                        })}
                      </Select>
                      <Chevrons>
                        <FiChevronUp />
                        <FiChevronDown />
                      </Chevrons>
                    </Selection>
                  );
                })}
              </SelectionWrapper>
            </TimeSettings>
            <ColorSettings>
              <OtherHeader>color</OtherHeader>
              {Object.keys(themes).map((theme, i) => {
                return (
                  <ColorSettingsContent
                    key={i}
                    onClick={() => handleColorChanges(themes[theme])}
                    background={themes[theme].colors.main}
                  >
                    {currentSettings.color.id === themes[theme].id ? (
                      <FiCheck size="24px" />
                    ) : (
                      <FiCheck size="24px" visibility="hidden" />
                    )}
                  </ColorSettingsContent>
                );
              })}
            </ColorSettings>
          </SettingsBody>
        </ModalContent>
        <ModalFooter>
          <ModalSavedButton onClick={applyNewSettings}>apply</ModalSavedButton>
        </ModalFooter>
      </Modal>
      <Icon onClick={showModal}>
        <FiSettings />
      </Icon>
      {isTimerOn && isToolTipOpen && (
        <ToolTip>Timer is on, Turn it off first!</ToolTip>
      )}
    </>
  );
};

export default SettingsModal;
