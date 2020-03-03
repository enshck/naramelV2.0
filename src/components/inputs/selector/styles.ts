import styled, { css } from "styled-components";

interface IProps {
  isOpenedOptionContainer: boolean;
}

export const MainContainer = styled.div<IProps>`
  width: 100%;
  position: relative;
  user-select: none;

  img {
    position: absolute;
    right: 10%;
    top: 30%;
    max-width: 15px;
    transition: 0.3s;
    ${({ isOpenedOptionContainer }) =>
      isOpenedOptionContainer &&
      css`
        transform: rotate(180deg);
      `}
  }
`;
