import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
`;

export const ItemName = styled.h1`
  font-size: 24px;
  color: #000;
  margin: 0 0 2px;
  line-height: 1.5;
  font-weight: 400;
`;

export const SubName = styled.p`
  font-size: 15px;
  color: #999;
  margin: 0 0 18px;
`;

export const ItemFeatures = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  li {
    font-size: 14px;
    margin: 0 0 15px;
    line-height: 1.6;
    span {
      font-weight: 600;
    }
  }
`;
