import React, { useMemo, BaseSyntheticEvent } from "react";
import { DropResult } from "react-beautiful-dnd";

import { StyledPopover, MainContainer } from "./styles";
import SubItemContainer from "../subItemsContainer";
import { IGoodsElement } from "components/pages/items";
import { useSelector } from "customHooks/useSelector";
import { IOption } from "../../";

interface IProps {
  anchorEl: HTMLDivElement | null;
  closeHandler: () => void;
  itemDataCloneForEdit: IGoodsElement;
  changedSubItemIndex: number;
  setItemDataCloneForEdit: (newValue: IGoodsElement) => void;
  setItemDataClone: (newValue: IGoodsElement) => void;
  onSubmitedCloseSubItemPopover: () => void;
}

const AddSubItemPopover = ({
  anchorEl,
  closeHandler,
  itemDataCloneForEdit,
  changedSubItemIndex,
  setItemDataCloneForEdit,
  setItemDataClone,
  onSubmitedCloseSubItemPopover,
}: IProps) => {
  const filtersTypes = useSelector((state) => state.filters);
  const { subGoods } = itemDataCloneForEdit;

  const changedFilter = useMemo(() => {
    const { subGoods } = itemDataCloneForEdit;

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
  }, [changedSubItemIndex, filtersTypes, itemDataCloneForEdit]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const cloneOfItemData = { ...itemDataCloneForEdit };
    const { images } = cloneOfItemData.subGoods[changedSubItemIndex];
    const prevIndex = result.source.index;
    const nextIndex = result.destination.index;

    const [removed] = images.splice(prevIndex, 1);
    images.splice(nextIndex, 0, removed);

    setItemDataCloneForEdit(cloneOfItemData);
  };

  const onChangeSubItemValueType = (
    newValue: IOption,
    prevOption: string,
    currentValue: string
  ) => {
    const cloneOfItemData = { ...itemDataCloneForEdit };
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

        setItemDataCloneForEdit(cloneOfItemData);
      }
    }
  };

  const onChangeSubItemValue = (
    e: BaseSyntheticEvent,
    filterType: string,
    prevValue: string
  ) => {
    const cloneOfItemData = { ...itemDataCloneForEdit };
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

    setItemDataCloneForEdit(cloneOfItemData);
  };

  const setSubItemPrice = (e: BaseSyntheticEvent) => {
    const cloneOfItemData = { ...itemDataCloneForEdit };

    if (changedSubItemIndex === 0) {
      cloneOfItemData.filters.price = e.target.value;
    }
    cloneOfItemData.subGoods[changedSubItemIndex].price = e.target.value;
    setItemDataCloneForEdit(cloneOfItemData);
  };

  const uploadNewPictures = (e: BaseSyntheticEvent) => {
    const { files } = e.target;
    const cloneOfItemData = { ...itemDataCloneForEdit };
    const { subGoods } = cloneOfItemData;

    const imagesOfChangedSubGoods = subGoods[changedSubItemIndex].images;

    subGoods[changedSubItemIndex].images = [
      ...imagesOfChangedSubGoods,
      ...files,
    ];

    setItemDataCloneForEdit(cloneOfItemData);
  };

  const deleteItemImageHandler = (imageIndex: number) => {
    const dataClone = { ...itemDataCloneForEdit };
    const { subGoods } = dataClone;

    subGoods[changedSubItemIndex].images.splice(imageIndex, 1);
    setItemDataCloneForEdit({
      ...dataClone,
    });
  };

  const addNewSubItemHandler = () => {
    setItemDataClone(itemDataCloneForEdit);
    onSubmitedCloseSubItemPopover();
  };

  return (
    <StyledPopover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={closeHandler}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <MainContainer>
        <SubItemContainer
          changedFilter={changedFilter}
          changedSubItemIndex={changedSubItemIndex}
          onChangeSubItemIndex={() => {}}
          subGoods={subGoods}
          onDragEnd={onDragEnd}
          onChangeSubItemValueType={onChangeSubItemValueType}
          onChangeSubItemValue={onChangeSubItemValue}
          setSubItemPrice={setSubItemPrice}
          uploadNewPictures={uploadNewPictures}
          deleteItemImageHandler={deleteItemImageHandler}
          isNewElement={true}
          addNewSubItemHandler={addNewSubItemHandler}
          itemDataClone={itemDataCloneForEdit}
        />
      </MainContainer>
    </StyledPopover>
  );
};

export default AddSubItemPopover;
