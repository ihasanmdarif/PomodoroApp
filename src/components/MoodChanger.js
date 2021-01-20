import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { AppContext } from "../AppProvider";
import { device } from "../styles/device";

const Switcher = styled.div`
  display: inline-block;
  padding: 17px 28px;
  cursor: pointer;
  border-radius: 25px;
  color: #9e9e9e;
  font-weight: bolder;

  @media ${device.mobileS} {
    padding: 10px;
  }

  @media ${device.mobileM} {
    padding: 15px;
  }
  @media ${device.laptop} {
    padding: 17px 28px;
  }

  ${(props) =>
    props.isActive &&
    css`
      background: ${props.theme.colors.main};
      color: #263238;
    `}
`;

const Container = styled.div`
  background: #161932;
  border-radius: 25px;
  max-width: 400px;
  margin: 0 auto;
  padding: 5px;

  @media ${device.mobileS} {
    max-width: 290px;
    padding: 8px;
  }

  @media ${device.mobileM} {
    max-width: 330px;
    padding: 8px;
  }

  @media ${device.tablet} {
    max-width: 430px;
    padding: 12px;
  }

  @media ${device.laptop} {
    max-width: 400px;
    padding: 15px;
  }
`;

const MoodChanger = () => {
  const { moods, currentMood, toggleMoods, resetTimer } = useContext(
    AppContext
  );

  const handleMoodChange = (elem) => {
    resetTimer();
    toggleMoods(elem);
  };

  return (
    <Container>
      {moods.map((elem, index) => {
        return (
          <Switcher
            isActive={currentMood.name === elem.name}
            onClick={(e) => handleMoodChange(elem)}
            key={index}
          >
            {elem.displayName}
          </Switcher>
        );
      })}
    </Container>
  );
};

export default MoodChanger;
