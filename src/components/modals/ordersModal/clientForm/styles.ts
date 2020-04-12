import styled, { css } from "styled-components";
import InputMask from "react-input-mask";

import { StyledInput as Input } from "utils/styles";
import { CloseButton as Close } from "../styles";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow: hidden;
  h1 {
    font-size: 24px;
    color: #333;
    font-weight: 400;
  }
`;

export const StyledInput = styled(Input)``;

export const StyledPhoneInput = styled(InputMask)`
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  outline: none;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  :first-child {
    margin-top: 0;
  }
`;

export const Label = styled.label`
  font-size: 15px;
`;

export const InputContainer = styled.div`
  margin-top: 20px;
`;

export const ConfirmButton = styled.div`
  padding: 14px 10px;
  text-transform: uppercase;
  color: ${(props) => props.theme.whiteTextColor};
  background: ${(props) => props.theme.mainButtonColor};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 12px;
  margin-top: 30px;
  transition: 0.3s;

  ${({ isBlocked }: { isBlocked?: boolean }) =>
    isBlocked &&
    css`
      background: ${(props) => props.theme.blockedColor};
    `}
`;

export const CloseButton = styled(Close)`
  width: fit-content;
  align-self: center;
  margin-top: 10px;
`;

export const DynamicSearchInput = styled(Input)``;

export const StyledSearchList = styled.div`
  border: 1px solid #ccc;
  border-top: none;
  padding: 5px 5px 5px 5px;
  background: #ffffff;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  visibility: hidden;
  height: 0;
  flex-direction: column;
  z-index: 99999;
  overflow: hidden;
  max-width: 300px;

  ${({ isVisible }: { isVisible?: boolean }) =>
    isVisible &&
    css`
      visibility: visible;
      height: auto;
    `}
`;

export const StyledOption = styled.div`
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  font-size: 14px;

  :hover {
    background: #fde9dd;
  }
`;

export const SelectorInput = styled.div`
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  outline: none;
  overflow: hidden;
  font-size: 12px;
  span {
    width: 30%;
    max-width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    z-index: 200;
    border-radius: 3px 3px 0 0;
    box-sizing: border-box;
    cursor: pointer;
  }
`;
