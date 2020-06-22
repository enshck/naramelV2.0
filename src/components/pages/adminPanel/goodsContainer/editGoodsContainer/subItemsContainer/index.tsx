import React, { useMemo, BaseSyntheticEvent } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";

import {
  SelectorContainer,
  StyledSelectorInput,
  StyledSelectorOption,
  StyledSelectorOptions,
  ChangedSubItemContainer,
  DraggableImagesContainer,
  ImageCard,
  DroppableContainer,
  InputRow,
  InputContainer,
  StyledInput,
} from "../styles";
import Selector from "components/inputs/selector";
import arrowDown from "assets/goods/arrowDown.png";
import { ISubGoodsElement } from "components/pages/items";
import { IFilter } from "utils/interfaces";
import { IOption } from "../..";
import DragNDropContainer from "./dragNDropContainer";
import Input from "components/inputs";
import { useSelector } from "customHooks/useSelector";

interface IProps {
  changedFilter: IFilter;
  subGoods: ISubGoodsElement[];
  changedSubItemIndex: number;
  onChangeSubItemIndex: (newValue: IOption) => void;
  onDragEnd: (result: DropResult) => void;
  onChangeSubItemValueType: (
    nextOption: IOption,
    prevOption: string,
    currentValue: string
  ) => void;
  onChangeSubItemValue: (
    e: BaseSyntheticEvent,
    filterType: string,
    prevValue: string
  ) => void;
  setSubItemPrice: (e: BaseSyntheticEvent) => void;
  uploadNewPictures: (e: BaseSyntheticEvent) => void;
}

// const StyledDroppable = styled(Droppable)`
//   display: inline-flex;
// `;

const SubItemsContainer = ({
  changedFilter,
  changedSubItemIndex,
  onChangeSubItemIndex,
  subGoods,
  onDragEnd,
  onChangeSubItemValueType,
  onChangeSubItemValue,
  setSubItemPrice,
  uploadNewPictures,
}: IProps) => {
  const filters = useSelector((state) => state.filters);
  const changedSubItem = useMemo(() => subGoods[changedSubItemIndex], [
    changedSubItemIndex,
    subGoods,
  ]);

  // console.log(filters, "fil");

  return (
    <ChangedSubItemContainer>
      <h2>{changedFilter.name}</h2>
      {subGoods.length > 0 && (
        <SelectorContainer>
          <Selector
            StyledInputContainer={StyledSelectorInput}
            StyledOptionContainer={StyledSelectorOptions}
            StyledOption={StyledSelectorOption}
            options={subGoods.map((elem) => {
              const { value, type } = elem.elementValue;

              return {
                label: `${value} ${
                  filters.find((elem) => elem.type === type)?.units || ""
                }`,
                value,
              };
            })}
            changedValue={{
              label: `${changedSubItem.elementValue.value} ${changedFilter.units}`,
              value: changedSubItem.elementValue.value,
            }}
            setNewValue={onChangeSubItemIndex}
            arrowIcon={arrowDown}
          />
        </SelectorContainer>
      )}
      <DragNDropContainer
        changedSubItem={changedSubItem}
        onDragEnd={onDragEnd}
      />
      <InputRow>
        <SelectorContainer>
          <Selector
            StyledInputContainer={StyledSelectorInput}
            StyledOptionContainer={StyledSelectorOptions}
            StyledOption={StyledSelectorOption}
            options={filters.map((elem) => ({
              label: elem.name,
              value: elem.type,
            }))}
            changedValue={{
              label:
                filters.find(
                  (filter) => filter.type === changedSubItem.elementValue.type
                )?.name || "",
              value: changedSubItem.elementValue.type,
            }}
            setNewValue={(newValue) =>
              onChangeSubItemValueType(
                newValue,
                changedSubItem.elementValue.type,
                changedSubItem.elementValue.value
              )
            }
            arrowIcon={arrowDown}
          />
        </SelectorContainer>
        <InputContainer>
          <Input
            StyledComponent={StyledInput}
            name={"text"}
            type={"text"}
            value={changedSubItem.elementValue.value}
            onInput={(e) =>
              onChangeSubItemValue(
                e,
                changedSubItem.elementValue.type,
                changedSubItem.elementValue.value
              )
            }
          />
        </InputContainer>
      </InputRow>
      <InputContainer>
        <Input
          StyledComponent={StyledInput}
          name={"text"}
          type={"text"}
          value={changedSubItem.price}
          onInput={setSubItemPrice}
        />
      </InputContainer>
      <input type={"file"} onChange={uploadNewPictures} />
    </ChangedSubItemContainer>
  );
};

export default SubItemsContainer;
