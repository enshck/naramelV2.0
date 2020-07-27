import styled from "styled-components";

import { BuyButton } from "utils/styles";

export const MainContainer = styled.div`
  height: 100%;
  padding: 0 20px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SubmitButtonContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const SubmitButton = styled(BuyButton)`
  padding: 10px;
`;
