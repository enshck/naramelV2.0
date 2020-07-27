import styled, { css } from "styled-components";

import {
  GoodsStyledSelectorInput,
  GoodsStyledSelectorOption,
  GoodsStyledSelectorOptions,
  BuyButton,
} from "utils/styles";
import { OrderStatusContainer } from "utils/styles";

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-rows: 50% minmax(50%, 100px);
  height: 100%;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.inputsBorderColor};
  padding: 10px;
`;

export const InputContainer = styled.div`
  margin-top: 10px;
`;

export const SelectorContainer = styled.div`
  width: 300px;
  margin-top: 5px;
`;

export const StyledInput = styled.input`
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
  height: 30px;
  width: 300px;
  outline: none;
  margin-top: 5px;
`;

export const StyledSearchLabel = styled.label`
  font-size: 14px;
  margin-bottom: 10px;
`;

export const ClearFilterButton = styled(BuyButton)`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin: 20px 0 0 0;
`;

export const StyledSelectorInput = styled(GoodsStyledSelectorInput)``;

export const StyledSelectorOption = styled(GoodsStyledSelectorOption)``;

export const StyledSelectorOptions = styled(GoodsStyledSelectorOptions)`
  overflow-y: initial;
`;

export const OrdersList = styled.div`
  width: 100%;
  padding: 10px 5px;
  overflow: auto;
  height: 100%;
`;

export const OrderElement = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.inputsBorderColor};
  padding: 10px;
  margin-top: 15px;
  user-select: none;
  cursor: pointer;

  :first-child {
    margin-top: 0;
  }

  ${({ isChanged }: { isChanged?: boolean }) =>
    isChanged &&
    css`
      border-color: ${(props) => props.theme.mainButtonColor};
    `}
`;

export const StyledOrderStatusContainer = styled(OrderStatusContainer)`
  padding: 5px;
  border-radius: 5px;
  text-transform: capitalize;
  font-size: 14px;
`;

export const DateContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
  align-items: center;

  p {
    opacity: 0.7;
    font-size: 14px;
  }
`;
