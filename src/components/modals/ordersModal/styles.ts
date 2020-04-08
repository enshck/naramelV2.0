import styled from "styled-components";

export const CloseButton = styled.div`
  border-bottom: 1px solid #d8d8d8;
  cursor: pointer;
  font-size: 13px;
  color: ${(props) => props.theme.mainTextColor};
  user-select: none;
  :hover {
    color: ${(props) => props.theme.mainButtonColor};
    border-color: ${(props) => props.theme.mainButtonColor};
  }
`;

export const ConfirmButton = styled.div`
  padding: 14px 10px;
  text-transform: uppercase;
  color: ${(props) => props.theme.whiteTextColor};
  background: ${(props) => props.theme.mainButtonColor};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  width: 280px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 12px;
`;
