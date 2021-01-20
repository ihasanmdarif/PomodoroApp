import React, { useContext } from "react";
import styled from "styled-components";
import { device } from "../styles/device";

const Heading = styled.div`
  padding: 30px;
  color: white;
  font-size: 26px;
  font-weight: bolder;

  @media ${device.tablet} {
    padding-top: 50px;
    font-size: 36px;
  }
  @media ${device.laptop} {
    padding-top: 40px;
    font-size: 30px;
  }
`;

const Header = () => {
  return <Heading>pomodoro</Heading>;
};

export default Header;
