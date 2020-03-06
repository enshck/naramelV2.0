import styled from "styled-components";

export const MainContainer = styled.div``;

export const FilterElement = styled.div`
  width: 80%;
  margin-top: 20px;
  border-top: 1px solid #ebebeb;
  padding-bottom: 30px;
  padding-top: 20px;
  h2 {
    font-size: 15px;
    font-weight: 400;
    margin-top: 5px;
  }
  p {
    font-size: 13px;
  }
  :last-child {
    border-bottom: 1px solid #ebebeb;
  }
`;

export const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  align-items: center;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  margin-left: 15px;
  margin-top: 10px;

  span {
    color: #999;
  }
`;

export const StyledFilterInput = styled.input`
  border: 1px solid #ccc;
  padding: 5px;
  box-sizing: border-box;
  height: 30px;
  width: 100%;
  outline: none;
`;
