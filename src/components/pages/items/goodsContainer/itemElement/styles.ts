import styled from "styled-components";

import { BuyButton as ButtonBuy } from "utils/styles";

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  visibility: hidden;
  transform: translateY(-5%);
  transition: 0.2s;
`;

export const InvisiblePart = styled.div`
  display: none;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const GoodsElement = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;

  :hover {
    ${Wrapper} {
      visibility: visible;
      width: 120%;
      height: 110%;
    }
    ${InvisiblePart} {
      display: flex;
    }
  }
`;

export const VisiblePart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ItemImage = styled.img`
  max-width: 100%;
  max-height: 250px;
`;

export const Name = styled.h1`
  font-size: 15px;
  color: #333;
  margin: 5px 0 0 0;
`;

export const SubName = styled.p`
  color: #999;
  font-size: 13px;
  margin: 0;
  text-align: center;
`;

export const Price = styled.p`
  font-size: 13px;
  color: #333;
  margin: 5px 0 0 0;
  font-weight: 600;
`;

export const SelectorContainer = styled.div`
  width: 80%;
  margin-top: 10px;
`;

export const BuyButton = styled(ButtonBuy)`
  margin-top: 30px;
  width: 40%;
`;
