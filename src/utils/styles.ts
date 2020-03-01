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
  height: 40px;
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
  font-size: 13px;
`;

interface IGoodsStyledSelectorOptions {
  isOpenedOptionContainer: boolean;
}

export const GoodsStyledSelectorOptions = styled.div<IGoodsStyledSelectorOptions>`
  width: 100%;
  position: absolute;
  top: 40px;
  max-height: 200px;
  overflow-y: auto;
  visibility: hidden;

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
  ${({ isChanged }) =>
    isChanged &&
    css`
      background: #333;
    `}
`;
