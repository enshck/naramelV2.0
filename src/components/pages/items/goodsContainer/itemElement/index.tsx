import React, { useState } from "react";

import {
  GoodsElement,
  ItemImage,
  Name,
  SubName,
  VisiblePart,
  InvisiblePart,
  Wrapper,
  Price,
  SelectorContainer
} from "./styles";
import { IGoodsElement } from "../../index";
import {
  GoodsStyledSelectorInput,
  GoodsStyledSelectorOption,
  GoodsStyledSelectorOptions
} from "utils/styles";
import Selector from "components/inputs/selector";

const ItemElement = (props: IGoodsElement) => {
  const { name, subName, subGoods } = props;
  const [changedSubElement, setChangedSubElement] = useState(subGoods[0]);
  const { elementValue, image, price } = changedSubElement;
  const optionsForSelector = subGoods.map(elem => {
    const { value } = elem.elementValue;
    return {
      label: value,
      value
    };
  });

  const changeSubElement = (newValue: string) => {};

  console.log(elementValue);

  return (
    <GoodsElement>
      <Wrapper />
      <VisiblePart>
        <ItemImage src={image} />
        <Name>{name}</Name>
        <SubName>{subName}</SubName>
        <Price>{price + " грн"}</Price>
      </VisiblePart>
      <InvisiblePart>
        <SelectorContainer>
          <Selector
            StyledInputContainer={GoodsStyledSelectorInput}
            StyledOptionContainer={GoodsStyledSelectorOptions}
            StyledOption={GoodsStyledSelectorOption}
            options={optionsForSelector}
            changedValue={elementValue.value}
            setNewValue={changeSubElement}
          />
        </SelectorContainer>
      </InvisiblePart>
    </GoodsElement>
  );
};

export default ItemElement;
