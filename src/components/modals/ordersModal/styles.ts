import styled from "styled-components";

import { ReactComponent as Plus } from "assets/orders/plus.svg";
import { ReactComponent as Minus } from "assets/orders/minus.svg";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 53px 40px 33px;
  h1 {
    font-size: 24px;
    color: #333;
    font-weight: 400;
  }
`;

export const OrdersContainer = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  max-height: 400px;
  width: 100%;
`;

export const Orders = styled.div`
  padding: 0 30px 0 0;
  box-sizing: border-box;
`;

export const OrderElement = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 1px solid #ebebeb;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
`;

export const OrderInfoContainer = styled.div`
  display: flex;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  h2 {
    margin: 0;
    font-size: 13px;
  }
  span {
    margin: 5px 0 0 0;
    font-size: 11px;
    text-transform: uppercase;
  }
  p {
    margin: 5px 0 0 0;
    font-size: 11px;
  }
`;

export const OrderInfo = styled.div`
  margin-left: 20px;
`;

export const Price = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

export const PlusIcon = styled(Plus)`
  stroke: #ccc;
  transition: 0.4s;
`;

export const MinusIcon = styled(Minus)`
  stroke: #ccc;
  transition: 0.4s;
`;

export const CountControlButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: 0.4s;
  :hover {
    ${PlusIcon} {
      stroke: #fff;
    }
    ${MinusIcon} {
      stroke: #fff;
    }
    background: #ccc;
  }
`;

export const CountConrolContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  user-select: none;
  width: 100px;
  p {
    font-size: 13px;
    margin: 0;
  }
`;

export const SummaryOrderPrice = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  margin-top: 15px;
  p {
    margin: 0;
  }
`;
