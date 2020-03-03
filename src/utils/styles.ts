import styled, { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    font-family: "Montserrat", "Proxima Nova Regular", "Proxima Nova Thin", "Roboto",
      "SF UI Display Regular", sans-serif;
    letter-spacing: 0.2px;
    box-sizing: border-box;
}
body {
    font-family: "Montserrat", "Proxima Nova Regular", "Proxima Nova Thin",
      "SF UI Display Regular", sans-serif;
    background-color: #fff;
    margin: 0px;
    padding: 0px;
}
`;

export const GoodsStyledSelectorInput = styled.div`
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
  font-size: 13px;
  display: flex;
  justify-content: center;
`;

interface IGoodsStyledSelectorOptions {
  isOpenedOptionContainer: boolean;
}

export const GoodsStyledSelectorOptions = styled.div<IGoodsStyledSelectorOptions>`
  width: 100%;
  position: absolute;
  top: 30px;
  max-height: 200px;
  overflow-y: auto;
  visibility: hidden;
  border: 1px solid #ccc;
  background: #fff;
  border-top: 0;

  ${({ isOpenedOptionContainer }) =>
    isOpenedOptionContainer &&
    css`
      visibility: visible;
    `}
`;

interface IGoodsStyledSelectorOption {
  isChanged: boolean;
}

export const GoodsStyledSelectorOption = styled.div<IGoodsStyledSelectorOption>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 0;
  font-size: 13px;
  ${({ isChanged }) =>
    isChanged &&
    css`
      background: #f4f3f5;
    `}
`;

export const BuyButton = styled.div`
  background-color: #792c9b;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  padding: 14px 10px;
  text-transform: uppercase;
  margin: 0 0 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;
