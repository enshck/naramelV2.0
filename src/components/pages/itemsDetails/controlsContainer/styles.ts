import styled from "styled-components";

import { BuyButton as ButtonBuy } from "utils/styles";

export const MainContainer = styled.div`
  max-width: 140px;
  width: 100%;
  h2 {
    font-size: 24;
    font-weight: 400;
    :after {
      content: " грн.";
      display: inline;
      font-size: 16px;
    }
  }
`;

export const ItemId = styled.p`
  font-size: 13px;
  color: #000;
  font-weight: 400;
  span {
    font-weight: 600;
  }
`;

export const BuyButton = styled(ButtonBuy)`
  cursor: pointer;
  width: 100%;
  margin-top: 30px;
  user-select: none;
`;
