import styled, { css } from "styled-components";

import { BuyButton } from "utils/styles";

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 100%;
  width: 100%;
  border: 1px solid ${(props) => props.theme.inputsBorderColor};
  flex: 1 0 auto;
  margin: 10px 0;
`;

export const GridElement = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;

  :first-child {
    border-right: 1px solid ${(props) => props.theme.inputsBorderColor};
  }
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-rows: 15% minmax(85%, 100px);
  height: 100%;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.inputsBorderColor};
`;

export const GoodsListContainer = styled.div`
  box-sizing: border-box;
  padding: 0 10px;
  overflow: auto;
`;

export const GoodsListElement = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.inputsBorderColor};
  margin-top: 20px;
  padding: 10px 10px 10px 0;
  cursor: pointer;
  position: relative;

  img {
    max-width: 100%;
    max-height: 100%;
  }

  ${({ isChanged }: { isChanged?: boolean }) =>
    isChanged &&
    css`
      border-color: ${(props) => props.theme.mainButtonColor};
    `}
`;

export const StyledInput = styled.input`
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
  height: 30px;
  width: 300px;
  outline: none;
`;

export const StyledSearchLabel = styled.label`
  font-size: 14px;
  margin-bottom: 10px;
`;

export const ElementInfo = styled.div`
  margin-left: 10px;

  h3 {
    margin: 0;
    font-weight: 500;
    font-size: 20px;
  }
  p {
    margin: 0;
    font-size: 14px;
  }
`;

export const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.inputsBorderColor};
  border-left: none;
  padding: 5px;
`;

export const AddItemButton = styled(BuyButton)`
  margin-top: 20px;
`;

export const DeleteItemButton = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dbdcde;
  border-radius: 100%;
  background: #fff;
  position: absolute;
  top: 10px;
  right: 10px;
  stroke: ${(props) => props.theme.dangerColor};
`;

export const EmptyEditGoodsContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-weight: 400;
  font-size: 20px;
`;
