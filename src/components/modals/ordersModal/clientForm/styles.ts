import styled from "styled-components";

import { StyledInput as Input } from "utils/styles";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const StyledInput = styled(Input)``;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  :first-child {
    margin-top: 0;
  }
`;

export const Label = styled.label`
  font-size: 15px;
`;

export const InputContainer = styled.div`
  margin-top: 20px;
`;
