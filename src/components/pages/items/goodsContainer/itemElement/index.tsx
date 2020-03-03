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
  SelectorContainer,
  BuyButton
} from "./styles";
import {
  GoodsStyledSelectorInput,
  GoodsStyledSelectorOption,
  GoodsStyledSelectorOptions
} from "utils/styles";
import Selector from "components/inputs/selector";
import arrowDown from "assets/goods/arrowDown.png";
import { ISubGoodsElement, IGoodsElement } from "components/pages/items/index";

const ItemElement = (props: IGoodsElement) => {
  const { name, subName, subGoods } = props;
  const [changedSubElement, setChangedSubElement] = useState<ISubGoodsElement>(
    subGoods[0]
  );
  const { elementValue, image, price } = changedSubElement;
  const optionsForSelector = subGoods.map(elem => {
    const { value } = elem.elementValue;
    return {
      label: value,
      value
    };
  });

  const changeSubElement = (newValue: string) => {
    const changedElement = subGoods.find(
      elem => elem.elementValue.value === newValue
    );

    if (changedElement) {
      setChangedSubElement(changedElement);
    }
  };

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
            arrowIcon={arrowDown}
          />
        </SelectorContainer>
        <BuyButton>Купить</BuyButton>
      </InvisiblePart>
    </GoodsElement>
  );
};

export default ItemElement;
