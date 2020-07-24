import styled, { css } from "styled-components";
import InputMask from "react-input-mask";

import { StyledInput as Input } from "utils/styles";

export const MainForm = styled.form`
  width: 100%;
`;

export const MainContainer = styled.form``;

export const Label = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const InputContainer = styled.div`
  max-width: 400px;
  margin: 20px auto 0 auto;
`;

export const StyledInput = styled.input`
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  outline: none;
  margin-top: 5px;
`;

export const StyledPhoneInput = styled(InputMask)`
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  outline: none;
  margin-top: 5px;
`;

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
  max-width: 400px;

  ${({ isVisible }: { isVisible?: boolean }) =>
    isVisible &&
    css`
      visibility: visible;
      height: auto;
    `}
`;

export const DynamicSearchInput = styled(Input)``;

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
