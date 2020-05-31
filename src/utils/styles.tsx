import React, { BaseSyntheticEvent } from "react";
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
    /* overflow: hidden; */
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
  isVisible: boolean;
}

export const GoodsStyledSelectorOptions = styled.div<
  IGoodsStyledSelectorOptions
>`
  width: 100%;
  position: absolute;
  top: 30px;
  max-height: 200px;
  overflow-y: auto;
  visibility: hidden;
  border: 1px solid #ccc;
  background: #fff;
  border-top: 0;

  ${({ isVisible }) =>
    isVisible &&
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

const CheckboxSpan = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  box-sizing: border-box;
  width: 20px;
  background-color: #eee;

  &:after {
    content: "";
    position: absolute;
    display: none;
  }
`;

const CheckboxInput = styled.input``;

const CheckBoxMainContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 14px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  user-select: none;

  ${CheckboxInput} {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ ${CheckboxSpan}:after {
      display: block;
    }
  }

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  ${CheckboxSpan}:after {
    left: 6px;
    top: 1px;
    width: 6px;
    height: 12px;
    border: solid #792c9b;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

interface IFilterStyledCheckbox {
  type: string;
  name: string;
  onChange: (e: BaseSyntheticEvent, name: string) => void;
  checked: boolean;
}

export const FilterStyledCheckbox = ({
  type,
  name,
  onChange,
  checked,
}: IFilterStyledCheckbox) => {
  return (
    <CheckBoxMainContainer>
      <CheckboxInput
        type={type}
        name={name}
        id={name}
        onChange={(e) => onChange(e, name)}
        checked={checked}
      />
      <CheckboxSpan />
    </CheckBoxMainContainer>
  );
};

export const StyledInput = styled.input`
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  outline: none;
`;

interface IOrderStatusContainer {
  status: "ordered" | "accepted" | "delivered" | "cancelled";
}

export const OrderStatusContainer = styled.div<IOrderStatusContainer>`
  color: #fff;
  ${({ status }) => {
    if (status === "accepted") {
      return css`
        background: #792c9b;
      `;
    }
    if (status === "cancelled") {
      return css`
        background: #ff3e3e;
      `;
    }
    if (status === "delivered") {
      return css`
        background: #0d9e33;
      `;
    }
    if (status === "ordered") {
      return css`
        background: #3087f8;
      `;
    }
  }}
`;
