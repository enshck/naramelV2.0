import React from "react";
import styled from "styled-components";

const SpinnerMainContainer = styled.div`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  width: 50px;
  height: 50px;

  border: 2px solid #f3f3f3;
  border-top: 3px solid #f25a41;
  border-radius: 100%;

  position: absolute;
  top: calc(50% - 25px);
  bottom: 0;
  left: calc(50% - 25px);
  right: 0;
  margin: 0;

  animation: spin 1s infinite linear;
`;

const Spinner = () => <SpinnerMainContainer />;

export default Spinner;
