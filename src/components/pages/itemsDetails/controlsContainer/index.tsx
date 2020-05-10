import React from "react";

import { MainContainer, ItemId, BuyButton } from "./styles";
import { IOption } from "components/inputs/dynamicSearch";
import Selector from "components/inputs/selector";
import {
  StyledSelectorInput,
  StyledSelectorOption,
  StyledSelectorOptions,
} from "../styles";
import arrowDown from "assets/goods/arrowDown.png";

interface IProps {
  price: number;
  optionsForSelector: IOption[];
  changedValueSelector: IOption;
  changeSubElement: (newValue: IOption) => void;
  id: string;
  submitHandler: () => void;
}

const ControlsContainer = ({
  changeSubElement,
  optionsForSelector,
  price,
  changedValueSelector,
  id,
  submitHandler,
}: IProps) => {
  return (
    <MainContainer>
      <h2>{price}</h2>
      <Selector
        StyledInputContainer={StyledSelectorInput}
        StyledOptionContainer={StyledSelectorOptions}
        StyledOption={StyledSelectorOption}
        options={optionsForSelector}
        changedValue={changedValueSelector}
        setNewValue={changeSubElement}
        arrowIcon={arrowDown}
      />
      <ItemId>
        Код товара: <span>{id}</span>
      </ItemId>
      <BuyButton onClick={submitHandler}>Купить</BuyButton>
    </MainContainer>
  );
};

export default ControlsContainer;
