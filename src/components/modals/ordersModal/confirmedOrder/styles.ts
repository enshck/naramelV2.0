import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  h1 {
    font-size: 24px;
    color: #333;
    font-weight: 400;
    margin-bottom: 0;
  }
  h2 {
    font-size: 16px;
    font-weight: 400;
    margin-top: 0px;
  }
  h3 {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
    span {
      font-weight: 600;
    }
  }
`;

export const SubmitButton = styled.div`
  padding: 14px 10px;
  color: ${(props) => props.theme.whiteTextColor};
  background: ${(props) => props.theme.mainButtonColor};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 12px;
  transition: 0.3s;
  margin-bottom: 20px;
`;
