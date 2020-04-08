import React, { ElementType, useState } from "react";
import { ClickAwayListener } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";

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
  setNewValue: (newValue: IOption) => void;
  changedValue: IOption;
  arrowIcon?: string;
}

const Selector = ({
  StyledInputContainer,
  StyledOptionContainer,
  StyledOption,
  options,
  setNewValue,
  changedValue,
  arrowIcon,
}: IProps) => {
  const [isVisible, setVisible] = useState<boolean>(false);

  // const changedLabel =
  //   options.find((elem) => elem.value === changedValue)?.label || "";

  return (
    <ClickAwayListener onClickAway={() => setVisible(false)}>
      <MainContainer isOpenedOptionContainer={isVisible}>
        <StyledInputContainer onClick={() => setVisible(!isVisible)}>
          {changedValue.label}
          {arrowIcon && <img src={arrowIcon} alt={"arrowIcon"} />}
        </StyledInputContainer>
        <StyledOptionContainer isVisible={isVisible}>
          <Scrollbars autoHeight>
            {options.map((elem, key) => {
              const { label, value } = elem;

              return (
                <StyledOption
                  isChanged={changedValue.value === value}
                  onClick={() => {
                    setNewValue(elem);
                    setVisible(false);
                  }}
                  key={key}
                >
                  {label}
                </StyledOption>
              );
            })}
          </Scrollbars>
        </StyledOptionContainer>
      </MainContainer>
    </ClickAwayListener>
  );
};

export default Selector;
