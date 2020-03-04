import React, { ReactType, ReactElement, BaseSyntheticEvent } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  position: relative;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  img {
    position: absolute;
    left: 20px;
  }
`;
const ErrorMessage = styled.p`
  color: red !important;
  opacity: 1;
  margin: 10px 0 0 30px;
  max-width: 450px;
  @media (max-width: 900px) {
    margin: 10px 0 0 0px;
  }
`;

interface IProps {
  beforeIcon?: string;
  errors?: { [key: string]: string };
  placeholder?: string;
  StyledComponent: ReactType;
  onBlur?: (e: BaseSyntheticEvent, name: string) => void;
  name: string;
  defaultValue?: string;
  value?: string;
  type: string;
  onClick?: (e: BaseSyntheticEvent, name: string) => void;
  checked?: string | boolean;
  changed?: string;
  onChange?: (...args: any[]) => void;
  autoComplete?: string;
  onInput?: (e: BaseSyntheticEvent, name: string) => void;
  maxLength?: string;
  multiple?: boolean;
  autoFocus?: boolean;
  isBlocked?: boolean;
  onDrop?: (...args: any[]) => void;
  accept?: string;
  titleForFileInput?: string | ReactElement;
}

const Input = ({
  beforeIcon,
  errors,
  placeholder,
  StyledComponent,
  onBlur,
  name,
  defaultValue,
  value,
  type,
  onClick,
  checked,
  changed,
  onChange,
  autoComplete,
  onInput,
  maxLength,
  multiple,
  autoFocus,
  isBlocked,
  onDrop,
  accept,
  titleForFileInput
}: IProps) => {
  return (
    <MainContainer>
      <InputContainer>
        {beforeIcon && <img src={beforeIcon} alt={"inputImg"} />}
        <StyledComponent
          placeholder={placeholder}
          onBlur={(e: BaseSyntheticEvent) => onBlur && onBlur(e, name)}
          onClick={(e: BaseSyntheticEvent) => onClick && onClick(e, name)}
          checked={checked}
          value={value && value}
          name={name}
          onChange={onChange && onChange}
          onInput={(e: BaseSyntheticEvent) => onInput && onInput(e, name)}
          defaultValue={defaultValue}
          type={type}
          changed={changed === name}
          autoComplete={autoComplete}
          maxLength={maxLength && maxLength}
          multiple={multiple}
          autoFocus={autoFocus}
          disabled={isBlocked}
          error={errors && errors[name]}
          onDrop={onDrop}
          accept={accept}
          titleForFileInput={titleForFileInput}
        />
      </InputContainer>
      {errors && errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
    </MainContainer>
  );
};

export default Input;
