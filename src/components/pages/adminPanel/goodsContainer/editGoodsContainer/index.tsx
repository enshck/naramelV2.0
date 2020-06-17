import React, { useState, useEffect, BaseSyntheticEvent, useMemo } from "react";

import { MainContainer } from "./styles";
import { IGoodsElement } from "components/pages/items";
import { useSelector } from "customHooks/useSelector";
import { IOption } from "../";
import SubItemContainer from "./subItemsContainer";
import ItemForm from "./itemForm";
import { DropResult } from "react-beautiful-dnd";

interface IProps {
  changedItem: IGoodsElement;
  listOfGoodsCategory: IOption[];
}

const EditGoodsContainer = ({ changedItem, listOfGoodsCategory }: IProps) => {
  const filtersTypes = useSelector((state) => state.filters);
  const [itemDataClone, setItemDataClone] = useState<IGoodsElement>(
    changedItem
  );
  const { brand, filters, subGoods } = itemDataClone;

  const [changedSubItemIndex, setChangedSubItemIndex] = useState(0);
  const changedFilter = useMemo(
    () =>
      filtersTypes.find(
        (elem) => elem.type === subGoods[changedSubItemIndex].elementValue.type
      ) || {
        id: "",
        name: "",
        type: "",
        units: "",
      },
    [changedSubItemIndex, filtersTypes, itemDataClone]
  );

  useEffect(() => {
    setItemDataClone(changedItem);
    setChangedSubItemIndex(0);
  }, [changedItem]);

  useEffect(() => {
    setItemDataClone({
      ...itemDataClone,
      filters: {
        ...filters,
        brand: brand,
      },
    });
  }, [brand]);

  useEffect(() => {
    setItemDataClone({
      ...itemDataClone,
      filters: {
        ...filters,
        price: `${subGoods[0]?.price}` || "",
      },
    });
  }, [subGoods[0]?.price]);

  const onInputHandler = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;

    setItemDataClone({
      ...itemDataClone,
      [name]: value,
    });
  };

  const onChangeGroup = (newValue: IOption) => {
    setItemDataClone({
      ...itemDataClone,
      groupId: newValue.value,
    });
  };

  const onChangeSubItemIndex = (newValue: IOption) => {
    const { value } = newValue;

    const findedIndex = subGoods.findIndex(
      (elem) => elem.elementValue.value === value
    );

    if (findedIndex === -1) {
      setChangedSubItemIndex(0);
    } else {
      setChangedSubItemIndex(findedIndex);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const cloneOfItemData = { ...itemDataClone };
    const { images } = cloneOfItemData.subGoods[changedSubItemIndex];
    const prevIndex = result.source.index;
    const nextIndex = result.destination.index;

    const [removed] = images.splice(prevIndex, 1);
    images.splice(nextIndex, 0, removed);

    setItemDataClone(cloneOfItemData);
  };

  const onChangeSubItemValue = (
    e: BaseSyntheticEvent,
    filterType: string,
    prevValue: string
  ) => {
    const cloneOfItemData = { ...itemDataClone };
    const { filters } = cloneOfItemData;
    const { elementValue } = cloneOfItemData.subGoods[changedSubItemIndex];
    elementValue.value = e.target.value;

    const changedFilter = filters[filterType];

    if (Array.isArray(changedFilter)) {
      if (filters[filterType]) {
        const indexOfElement = changedFilter.indexOf(prevValue);

        if (indexOfElement === -1) {
          filters[filterType] = [...changedFilter, e.target.value];
        } else {
          changedFilter[indexOfElement] = e.target.value;
        }
      } else {
        filters[filterType] = [e.target.value];
      }
    }

    setItemDataClone(cloneOfItemData);
  };

  const onChangeSubItemValueType = (
    newValue: IOption,
    prevOption: string,
    currentValue: string
  ) => {
    const cloneOfItemData = { ...itemDataClone };
    const { filters } = cloneOfItemData;
    const oldChangedFilter = filters[prevOption];

    const indexOfCurrentValue = oldChangedFilter.indexOf(currentValue);

    if (Array.isArray(oldChangedFilter)) {
      if (indexOfCurrentValue !== -1) {
        const { elementValue } = cloneOfItemData.subGoods[changedSubItemIndex];
        elementValue.type = newValue.value;

        oldChangedFilter.splice(indexOfCurrentValue, 1);

        if (filters[prevOption].length < 1) {
          delete filters[prevOption];
        }

        const newChangedFilter = filters[newValue.value];

        if (filters[newValue.value] && Array.isArray(newChangedFilter)) {
          filters[newValue.value] = [...newChangedFilter, currentValue];
        } else {
          filters[newValue.value] = [currentValue];
        }

        setItemDataClone(cloneOfItemData);
      }
    }
  };

  const setSubItemPrice = (e: BaseSyntheticEvent) => {
    const cloneOfItemData = { ...itemDataClone };
    cloneOfItemData.subGoods[changedSubItemIndex].price = e.target.value;
    setItemDataClone(cloneOfItemData);
  };

  console.log(itemDataClone, "clone");

  return (
    <MainContainer>
      <SubItemContainer
        changedFilter={changedFilter}
        changedSubItemIndex={changedSubItemIndex}
        onChangeSubItemIndex={onChangeSubItemIndex}
        subGoods={subGoods}
        onDragEnd={onDragEnd}
        onChangeSubItemValueType={onChangeSubItemValueType}
        onChangeSubItemValue={onChangeSubItemValue}
        setSubItemPrice={setSubItemPrice}
      />
      <ItemForm
        itemDataClone={itemDataClone}
        listOfGoodsCategory={listOfGoodsCategory}
        onChangeGroup={onChangeGroup}
        onInputHandler={onInputHandler}
      />
    </MainContainer>
  );
};

export default EditGoodsContainer;
