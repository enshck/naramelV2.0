import styled, { css } from "styled-components";

interface IProps {
  isOpenedOptionContainer: boolean;
}

export const MainContainer = styled.div<IProps>`
  width: 100%;
  position: relative;

  img {
    position: absolute;
    right: 10%;
    ${({ isOpenedOptionContainer }) =>
      isOpenedOptionContainer &&
      css`
        transform: rotate(180deg);
      `}
  }
`;
