import React, { useMemo, BaseSyntheticEvent, Fragment } from "react";
import { DropResult } from "react-beautiful-dnd";

import {
  SelectorContainer,
  StyledSelectorInput,
  StyledSelectorOption,
  StyledSelectorOptions,
  ChangedSubItemContainer,
  InputRow,
  InputContainer,
  StyledInput,
  ItemFileInputContainer,
  InputLabel,
  SubmitButton,
  SubItemSubmitButtonContainer,
} from "../styles";
import Selector from "components/inputs/selector";
import arrowDown from "assets/goods/arrowDown.png";
import { ISubGoodsElement } from "components/pages/items";
import { IFilter } from "utils/interfaces";
import { IOption } from "../..";
import DragNDropContainer from "./dragNDropContainer";
import Input from "components/inputs";
import { useSelector } from "customHooks/useSelector";
import { IGoodsElement } from "components/pages/items";

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
  deleteItemImageHandler: (itemIndex: number) => void;
  isNewElement?: boolean;
  addNewSubItemHandler?: () => void;
  itemDataClone: IGoodsElement;
}

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
  deleteItemImageHandler,
  isNewElement,
  addNewSubItemHandler,
  itemDataClone,
}: IProps) => {
  const { id } = itemDataClone;
  const filters = useSelector((state) => state.filters);
  const changedSubItem = useMemo(() => subGoods[changedSubItemIndex], [
    changedSubItemIndex,
    subGoods,
  ]);

  return (
    <ChangedSubItemContainer>
      {!isNewElement && (
        <Fragment>
          <InputLabel>Подтовар:</InputLabel>
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
        </Fragment>
      )}
      <DragNDropContainer
        changedSubItem={changedSubItem}
        onDragEnd={onDragEnd}
        deleteItemImageHandler={deleteItemImageHandler}
      />
      <ItemFileInputContainer>
        <label htmlFor={`itemImageFileInput-${changedSubItemIndex}-${id}`}>
          Загрузить файл
        </label>
        <input
          type={"file"}
          onChange={uploadNewPictures}
          name={`itemImageFileInput-${changedSubItemIndex}-${id}`}
          id={`itemImageFileInput-${changedSubItemIndex}-${id}`}
          multiple={true}
          accept="image/x-png,image/gif,image/jpeg"
        />
      </ItemFileInputContainer>
      <InputRow>
        <InputLabel>Тип подтовара:</InputLabel>
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
          <InputLabel>Значение подтовара:</InputLabel>
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
        <InputContainer>
          <InputLabel>Цена:</InputLabel>
          <Input
            StyledComponent={StyledInput}
            name={"text"}
            type={"text"}
            value={changedSubItem.price}
            onInput={setSubItemPrice}
          />
        </InputContainer>
      </InputRow>
      {isNewElement && (
        <SubItemSubmitButtonContainer>
          <SubmitButton onClick={addNewSubItemHandler}>
            Добавить подтовар
          </SubmitButton>
        </SubItemSubmitButtonContainer>
      )}
    </ChangedSubItemContainer>
  );
};

export default SubItemsContainer;
