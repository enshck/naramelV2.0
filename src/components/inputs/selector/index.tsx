import React, { ElementType, useState } from "react";
import { ClickAwayListener } from "@material-ui/core";

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

  const changedLabel =
    options.find(elem => elem.value === changedValue)?.label || "";

  return (
    <ClickAwayListener onClickAway={() => openOptionContainer(false)}>
      <MainContainer isOpenedOptionContainer={isOpenedOptionContainer}>
        <StyledInputContainer
          onClick={() => openOptionContainer(!isOpenedOptionContainer)}
        >
          {changedLabel}
          {arrowIcon && <img src={arrowIcon} alt={"arrowIcon"} />}
        </StyledInputContainer>
        <StyledOptionContainer
          isOpenedOptionContainer={isOpenedOptionContainer}
        >
          {options.map((elem, key) => {
            const { label, value } = elem;

            return (
              <StyledOption
                isChanged={changedValue === value}
                onClick={() => {
                  setNewValue(value);
                  openOptionContainer(false);
                }}
                key={key}
              >
                {label}
              </StyledOption>
            );
          })}
        </StyledOptionContainer>
      </MainContainer>
    </ClickAwayListener>
  );
};

export default Selector;
