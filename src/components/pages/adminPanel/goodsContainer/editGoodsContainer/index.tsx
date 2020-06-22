import React, { useState, useEffect, BaseSyntheticEvent, useMemo } from "react";

import { MainContainer } from "./styles";
import { IGoodsElement } from "components/pages/items";
import { useSelector } from "customHooks/useSelector";
import { IOption } from "../";
import SubItemContainer from "./subItemsContainer";
import ItemForm from "./itemForm";
import { DropResult } from "react-beautiful-dnd";
import FiltersContainer from "./filtersContainer";
import EditFiltersPopover from "./editFiltersPopover";

interface IProps {
  changedItem: IGoodsElement;
  listOfGoodsCategory: IOption[];
}

const EditGoodsContainer = ({ changedItem, listOfGoodsCategory }: IProps) => {
  const filtersTypes = useSelector((state) => state.filters);
  const [
    anchorForEditFilterPopover,
    setAnchorForEditFilterPopover,
  ] = useState<HTMLDivElement | null>(null);
  const [editableFilterId, setEditableFilterId] = useState<string | null>(null);
  const [itemDataClone, setItemDataClone] = useState<IGoodsElement>(
    changedItem
  );
  const [itemDataCloneForEdit, setItemDataCloneForEdit] = useState<
    IGoodsElement
  >(JSON.parse(JSON.stringify(itemDataClone)));

  const ignoreFiltersListForEditPopover = useMemo(() => {
    const { filters } = itemDataCloneForEdit;
    return Object.keys(filters).map((elem) => elem);
  }, [itemDataCloneForEdit]);

  const { brand, filters, subGoods } = itemDataClone;

  const [changedSubItemIndex, setChangedSubItemIndex] = useState(0);
  const changedFilter = useMemo(() => {
    const { subGoods } = itemDataClone;

    return (
      filtersTypes.find(
        (elem) => elem.type === subGoods[changedSubItemIndex].elementValue.type
      ) || {
        id: "",
        name: "",
        type: "",
        units: "",
      }
    );
  }, [changedSubItemIndex, filtersTypes, itemDataClone]);

  const ignoreFiltersList = useMemo(() => {
    const { subGoods } = itemDataClone;

    const ignoreList = ["brand", "price"];
    subGoods.forEach((elem) => {
      const { type } = elem.elementValue;

      if (!ignoreList.includes(type)) {
        ignoreList.push(type);
      }
    });

    return ignoreList;
  }, [itemDataClone]);

  useEffect(() => {
    const itemDataDeepClone = JSON.parse(JSON.stringify(itemDataClone));
    setItemDataCloneForEdit(itemDataDeepClone);
  }, [itemDataClone]);

  useEffect(() => {
    setItemDataClone(changedItem);
    setChangedSubItemIndex(0);
  }, [changedItem]);

  const onInputHandler = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;

    if (name === "brand") {
      setItemDataClone({
        ...itemDataClone,
        filters: {
          ...filters,
          brand: value,
        },
        brand: value,
      });
    } else {
      setItemDataClone({
        ...itemDataClone,
        [name]: value,
      });
    }
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

    if (changedSubItemIndex === 0) {
      cloneOfItemData.filters.price = e.target.value;
    }
    cloneOfItemData.subGoods[changedSubItemIndex].price = e.target.value;
    setItemDataClone(cloneOfItemData);
  };

  const deleteFilter = (filterKey: string) => {
    const cloneOfItemData = { ...itemDataClone };
    const { filters } = cloneOfItemData;

    delete filters[filterKey];

    setItemDataClone(cloneOfItemData);
  };

  const onCloseEditFilterPopover = () => {
    const itemDataDeepClone = JSON.parse(JSON.stringify(itemDataClone));

    setAnchorForEditFilterPopover(null);
    setEditableFilterId(null);
    setItemDataCloneForEdit(itemDataDeepClone);
  };

  const openEditPopoverHandler = (
    anchor: HTMLDivElement | null,
    filterId?: string
  ) => {
    if (filterId) {
      setEditableFilterId(filterId);
      setAnchorForEditFilterPopover(anchor);
    } else {
      const firstIdFilter = filtersTypes.find(
        (elem) => !ignoreFiltersListForEditPopover.includes(elem.type)
      )?.type;

      if (firstIdFilter) {
        setAnchorForEditFilterPopover(anchor);
        setEditableFilterId(firstIdFilter);
        const itemClone = { ...itemDataCloneForEdit };
        itemClone.filters[firstIdFilter] = [];

        setItemDataCloneForEdit(itemClone);
      }
    }
  };

  const uploadNewPictures = (e: BaseSyntheticEvent) => {
    const { files } = e.target;
    const cloneOfItemData = { ...itemDataClone };
    const { subGoods } = cloneOfItemData;
    const imagesOfChangedSubGoods = subGoods[changedSubItemIndex].images;

    subGoods[changedSubItemIndex].images = [
      ...imagesOfChangedSubGoods,
      ...files,
    ];

    setItemDataClone(cloneOfItemData);
  };

  // const submit = () => {
  //   const cloneOfItemData = { ...itemDataClone };
  //   const { subGoods } = cloneOfItemData;

  //   subGoods.forEach((elem) => {
  //     const { images } = elem;

  //     console.log(
  //       images.filter((elem) => typeof elem !== "string"),
  //       "img"
  //     );
  //   });
  // };

  console.log(itemDataClone, itemDataCloneForEdit, "ignored");

  return (
    <MainContainer>
      <EditFiltersPopover
        anchorEl={anchorForEditFilterPopover}
        closeHandler={onCloseEditFilterPopover}
        ignoreFiltersList={ignoreFiltersListForEditPopover}
        itemDataClone={itemDataClone}
        setItemDataClone={setItemDataClone}
        editableFilterId={editableFilterId}
        setEditableFilterId={setEditableFilterId}
        itemDataCloneForEdit={itemDataCloneForEdit}
        setItemDataCloneForEdit={setItemDataCloneForEdit}
      />
      <SubItemContainer
        changedFilter={changedFilter}
        changedSubItemIndex={changedSubItemIndex}
        onChangeSubItemIndex={onChangeSubItemIndex}
        subGoods={subGoods}
        onDragEnd={onDragEnd}
        onChangeSubItemValueType={onChangeSubItemValueType}
        onChangeSubItemValue={onChangeSubItemValue}
        setSubItemPrice={setSubItemPrice}
        uploadNewPictures={uploadNewPictures}
      />
      <ItemForm
        itemDataClone={itemDataClone}
        listOfGoodsCategory={listOfGoodsCategory}
        onChangeGroup={onChangeGroup}
        onInputHandler={onInputHandler}
      />
      <FiltersContainer
        filters={filters}
        ignoreFiltersList={ignoreFiltersList}
        deleteFilter={deleteFilter}
        openEditPopoverHandler={openEditPopoverHandler}
      />
    </MainContainer>
  );
};

export default EditGoodsContainer;
