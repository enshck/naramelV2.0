import styled, { css } from "styled-components";

export const FormMainContainer = styled.div`
  background: #fff;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2px;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
`;

export const SubmitButton = styled.div`
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;

  white-space: nowrap;
  overflow: hidden;
  font-weight: 700;
  text-transform: uppercase;
  height: 48px;
  background-color: #4680fe;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 13px;
  font-family: "Roboto", sans-serif;
  border-radius: 3px;
  margin-top: 30px;
  cursor: pointer;
`;

export const SignUpInput = styled.input`
  width: 100%;
  font-size: 14px;
  color: #444;
  background: #fff;
  border: 1px solid #707070;
  padding: 12px 12px 10px;
  outline: none;
  border-radius: 3px;
  box-sizing: border-box;
  margin-top: 5px;

  ${({ active }: { active: boolean }) =>
    active &&
    css`
      border-color: #4680fe;
    `}
`;

export const ErrorMessage = styled.h3`
  color: red;
  font-size: 14px;
  text-align: center;
`;

export const ControlsContainer = styled.div`
  padding: 40px 60px 50px;
  position: relative;
`;

export const InputContainer = styled.div`
  margin-top: 30px;
  label {
    font-weight: 600;
    font-size: 14px;
    color: grey;
  }
`;
