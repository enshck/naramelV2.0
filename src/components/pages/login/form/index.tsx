import React, { useState } from "react";

import {
  ControlsContainer,
  ErrorMessage,
  FormMainContainer,
  InputContainer,
  SignUpInput,
  SubmitButton,
} from "./styles";

interface IFormData {
  email: string;
  password: string;
  error: any;
}

interface IProps {
  formData: IFormData;
  setFormData: (formData: IFormData) => void;
  signUpHandler: () => void;
}

const SignUpForm = (props: IProps) => {
  const { formData, setFormData, signUpHandler } = props;
  const [activeInput, setActiveInput] = useState<string>("");

  const onBlur = (e: any, typeInput: string) => {
    setFormData({
      ...formData,
      ...{ [typeInput]: e.target.value },
    });
    setActiveInput("");
  };

  return (
    <FormMainContainer>
      <ControlsContainer>
        <InputContainer>
          <label>Email:</label>
          <SignUpInput
            type={"text"}
            placeholder={"example@example.com"}
            onBlur={(e) => onBlur(e, "email")}
            onFocus={() => setActiveInput("email")}
            active={activeInput === "email"}
          />
        </InputContainer>
        <InputContainer>
          <label>Пароль:</label>
          <SignUpInput
            type={"password"}
            placeholder={"**********"}
            onBlur={(e) => onBlur(e, "password")}
            onFocus={() => setActiveInput("password")}
            active={activeInput === "password"}
          />
        </InputContainer>
        <SubmitButton onClick={signUpHandler}>Войти</SubmitButton>
      </ControlsContainer>
      {formData.error && <ErrorMessage>{formData.error}</ErrorMessage>}
    </FormMainContainer>
  );
};

export default SignUpForm;
