import styled, { css } from "styled-components";

export const PagingPicture = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const PagingPictureContainer = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid transparent;
  cursor: pointer;
  width: 60px;
  height: 60px;
  padding: 5px;

  ${({ isChanged }: { isChanged?: boolean }) =>
    isChanged &&
    css`
      border-color: red;
    `}
`;

export const MainPicture = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: zoom-in;

  img {
    max-width: 400px;
    max-height: 400px;
  }
`;

export const MainPictureContainer = styled.div`
  display: flex !important;
  justify-content: center;
  width: 100%;
  outline: none;
`;

export const DotsContainer = styled.div`
  bottom: -65px;
`;

export const DotsList = styled.ul`
  margin: 0;
  padding: 0;

  li {
    width: auto;
    height: auto;
  }
  .slick-active {
    ${PagingPictureContainer} {
      border-color: #ccc;
    }
  }
`;
