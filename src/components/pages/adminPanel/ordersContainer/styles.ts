import styled from "styled-components";

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 100%;
  width: 100%;
  border: 1px solid ${(props) => props.theme.inputsBorderColor};
  flex: 1 0 auto;
  margin: 10px 0;
`;

export const GridElement = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  position: relative;

  :first-child {
    border-right: 1px solid ${(props) => props.theme.inputsBorderColor};
  }
`;

export const EmptyEditOrdersContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-weight: 400;
  font-size: 20px;
`;
