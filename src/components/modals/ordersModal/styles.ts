import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 53px 40px 33px;
  h1 {
    font-size: 24px;
    color: #333;
    font-weight: 400;
  }
`;

export const OrdersContainer = styled.div`
  display: flex;
  overflow: auto;
  flex-direction: column;
  min-height: 300px;
  width: 100%;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
`;

export const OrderElement = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
