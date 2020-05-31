import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
  span {
    opacity: 0.6;
  }
`;

export const FilterInfo = styled.span`
  color: green;
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
