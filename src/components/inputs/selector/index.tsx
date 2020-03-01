import React, { ElementType, useState } from "react";

import { MainContainer } from "./styles";

interface IOption {
  label: string;
  value: string;
}

interface IProps {
  StyledInputContainer: ElementType;
  StyledOptionContainer: ElementType;
  StyledOption: ElementType;
  options: IOption[];
  setNewValue: (newValue: string) => void;
  changedValue: string;
  arrowIcon?: string;
}

const Selector = ({
  StyledInputContainer,
  StyledOptionContainer,
  StyledOption,
  options,
  setNewValue,
  changedValue,
  arrowIcon
}: IProps) => {
  const [isOpenedOptionContainer, openOptionContainer] = useState<boolean>(
    false
  );

  return (
    <MainContainer isOpenedOptionContainer={isOpenedOptionContainer}>
      <StyledInputContainer
        onClick={() => openOptionContainer(true)}
        onBlur={() => openOptionContainer(false)}
      >
        {changedValue}
        {arrowIcon && <img src={arrowIcon} alt={"arrowIcon"} />}
      </StyledInputContainer>
      <StyledOptionContainer isOpenedOptionContainer={isOpenedOptionContainer}>
        {options.map(elem => {
          const { label, value } = elem;

          return (
            <StyledOption
              isChanged={changedValue === value}
              onClick={() => {
                setNewValue(value);
                openOptionContainer(false);
              }}
            >
              {label}
            </StyledOption>
          );
        })}
      </StyledOptionContainer>
    </MainContainer>
  );
};

export default Selector;
