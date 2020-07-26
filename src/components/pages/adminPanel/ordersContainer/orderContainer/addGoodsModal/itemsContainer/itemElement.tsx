import React, { useState, useMemo } from "react";

import {
  ItemsListElement,
  ImageContainer,
  ItemsListElementText,
  SelectorContainer,
  StyledOption,
  StyledSearchList,
  StyledSelectorInput,
  ItemInfoContainer,
  ControlsContainer,
  SubmitButton,
} from "../styles";
import { IGoodsElement } from "components/pages/items";
import defaultItemImage from "assets/goods/defaultImage.png";
import Selector from "components/inputs/selector";
import arrowDown from "assets/goods/arrowDown.png";

interface IProps {
  itemData: IGoodsElement;
  addItemHandler: (item: IGoodsElement, subItemIndex: number) => void;
}

const ItemElement = ({ itemData, addItemHandler }: IProps) => {
  const { name, subGoods, brand } = itemData;
  const [changedSubItemIndex, setChangedSubItemIndex] = useState(0);

  const { elementValue, images } = useMemo(
    () => subGoods[changedSubItemIndex],
    [subGoods, changedSubItemIndex]
  );

  return (
    <ItemsListElement>
      <ItemInfoContainer>
        <ImageContainer>
          <img
            src={typeof images[0] === "string" ? images[0] : defaultItemImage}
            alt={"itemImage"}
          />
        </ImageContainer>
        <ItemsListElementText>
          <h3>{name}</h3>
          <p>{brand}</p>
        </ItemsListElementText>
      </ItemInfoContainer>
      <ControlsContainer>
        <SelectorContainer>
          <Selector
            StyledInputContainer={StyledSelectorInput}
            StyledOptionContainer={StyledSearchList}
            StyledOption={StyledOption}
            options={subGoods.map((elem, key) => {
              const { elementValue } = elem;

              return {
                label: elementValue.value,
                value: `${key}`,
              };
            })}
            changedValue={{
              label: elementValue.value || "",
              value: `${changedSubItemIndex}` || "",
            }}
            setNewValue={(elem) => setChangedSubItemIndex(+elem.value)}
            arrowIcon={arrowDown}
          />
        </SelectorContainer>
        <SubmitButton
          onClick={() => addItemHandler(itemData, changedSubItemIndex)}
        >
          Добавить
        </SubmitButton>
      </ControlsContainer>
    </ItemsListElement>
  );
};

export default ItemElement;
