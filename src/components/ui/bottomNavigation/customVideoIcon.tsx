"use client";

import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 45px;
  height: 30px;
  position: relative;
`;

const Box = styled.div`
  width: 38px;
  height: 100%;
  border-radius: 7px;
  position: absolute;
  top: 0;
`;

const BoxLeft = styled(Box)`
  left: 10px;
  background-color: rgba(250, 45, 108, 1);
`;

const BoxRight = styled(Box)`
  right: 10px;
  background-color: rgba(32, 211, 234, 1);
`;

const CenterBox = styled.div`
  width: 38px;
  height: 100%;
  border-radius: 7px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const PlusSign = styled.div`
  width: 20px;
  height: 2px;
  background-color: black;
  position: absolute;
`;

const CustomVideoIcon = () => {
  return (
    <Container>
      <BoxLeft />
      <BoxRight />
      <CenterBox>
        <PlusSign />
        <PlusSign style={{ transform: "rotate(90deg)" }} />
      </CenterBox>
    </Container>
  );
};

export default CustomVideoIcon;
