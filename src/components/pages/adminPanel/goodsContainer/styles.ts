import styled from "styled-components";

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 100%;
  width: 100%;
  border: 1px solid ${(props) => props.theme.mainButtonColor};
  flex: 1 0 auto;
`;

export const GridElement = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;

  :first-child {
    border-right: 1px solid ${(props) => props.theme.mainButtonColor};
  }
`;
