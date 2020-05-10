import React, { useState, useMemo } from "react";

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
  BuyButton,
} from "./styles";
import {
  GoodsStyledSelectorInput,
  GoodsStyledSelectorOption,
  GoodsStyledSelectorOptions,
} from "utils/styles";
import Selector from "components/inputs/selector";
import arrowDown from "assets/goods/arrowDown.png";
import { ISubGoodsElement, IGoodsElement } from "components/pages/items/index";
import { useSelector } from "customHooks/useSelector";
import { IOrderData } from "utils/interfaces";
import { IOption } from "components/inputs/dynamicSearch";

interface IProps {
  itemData: IGoodsElement;
  buyButtonHandler: (item: IOrderData) => void;
}

const ItemElement = ({ itemData, buyButtonHandler }: IProps) => {
  const { name, subName, subGoods, id } = itemData;
  const [changedSubElement, setChangedSubElement] = useState<ISubGoodsElement>(
    subGoods[0]
  );
  const { elementValue, images, price } = changedSubElement;
  const filters = useSelector((state) => state.filters);
  const optionsForSelector = useMemo(
    () =>
      subGoods.map((elem) => {
        const { value, type } = elem.elementValue;
        const changedFilterType = filters.find((elem) => elem.type === type);

        return {
          label: `${value} ${changedFilterType?.units || ""}`,
          value,
        };
      }),
    [subGoods, filters]
  );
  const changedValueSelector = useMemo(() => {
    const value = elementValue.value;
    const changedFilterType = filters.find(
      (elem) => elem.type === elementValue.type
    );

    return {
      label: `${value} ${changedFilterType?.units || ""}`,
      value: `${value}`,
    };
  }, [changedSubElement, filters]);

  const changeSubElement = (newValue: IOption) => {
    const changedElement = subGoods.find(
      (elem) => elem.elementValue.value === newValue.value
    );

    if (changedElement) {
      setChangedSubElement(changedElement);
    }
  };

  return (
    <GoodsElement>
      <Wrapper to={`/items/${id}`} />
      <VisiblePart>
        <ItemImage src={images[0]} />
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
            changedValue={changedValueSelector}
            setNewValue={changeSubElement}
            arrowIcon={arrowDown}
          />
        </SelectorContainer>
        <BuyButton
          onClick={() => {
            const orderElement = {
              ...itemData,
              ...changedSubElement,
            };
            delete orderElement.subGoods;
            buyButtonHandler(orderElement);
          }}
        >
          Купить
        </BuyButton>
      </InvisiblePart>
    </GoodsElement>
  );
};

export default ItemElement;
