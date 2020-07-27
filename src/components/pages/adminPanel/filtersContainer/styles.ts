import styled, { css } from "styled-components";

import { OrderStatusContainer } from "utils/styles";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Filters = styled.div`
  width: 60%;
`;

export const FilterElement = styled.div`
  margin: 10px 0;
  border: 1px solid #dbdcde;
  padding: 15px;
  width: 100%;
  position: relative;
  display: flex;
  span {
    opacity: 0.6;
  }
`;

export const Button = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid #dbdcde;
  border-radius: 100%;
  stroke: ${(props) => props.theme.mainButtonColor};
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  position: absolute;
  top: calc(50% - 15px);
  right: 0;
  ${({ right }: { right?: string }) =>
    css`
      right: ${right};
    `}
`;

export const StyledTooltip = styled.div`
  position: absolute;
  top: 40px;
  padding: 10px;
  box-sizing: border-box;
  left: calc(50% - 200px);
  background: #fff;
  opacity: 0;
  width: 400px;
  transition: 0.4s;
  visibility: hidden;
  color: #000;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.14);
  z-index: 9999999 !important;
  overflow: auto;
  max-height: 400px;

  ${({ isEmpty }: { isEmpty?: boolean }) =>
    isEmpty &&
    css`
      display: none;
    `}
`;

export const CountOfGoodsContainer = styled.div`
  margin-left: 5px;
  cursor: pointer;
  span {
    opacity: 0.6;
    color: red;
    position: relative;
  }
  :hover {
    ${StyledTooltip} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const TooltipElement = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  border: 1px solid #dbdcde;
  padding: 10px;
  :first-child {
    margin-top: 0;
  }
  :hover {
    color: ${(props) => props.theme.mainButtonColor};
  }
`;

export const StyledOrderStatusContainer = styled(OrderStatusContainer)`
  padding: 5px;
  border-radius: 5px;
  text-transform: capitalize;
`;

export const PlusFilterIconContainer = styled.div`
  stroke: #792c9b;
  max-width: 30px;
  max-height: 30px;
  padding: 5px;
  border: 1px solid #dbdcde;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  cursor: pointer;
`;
