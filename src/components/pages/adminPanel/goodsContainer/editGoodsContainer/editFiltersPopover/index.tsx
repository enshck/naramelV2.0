import React, { useMemo, BaseSyntheticEvent, useState, useEffect } from "react";

import {
  StyledPopover,
  MainPopoverContainer,
  StyledInput,
  StyledSelectorInput,
  StyledSelectorOption,
  StyledSelectorOptions,
  InputContainer,
  PlusButton,
  SubmitButton,
  InputLabel,
  SelectorContainer,
} from "./styles";
import Selector from "components/inputs/selector";
import arrowDown from "assets/goods/arrowDown.png";
import { useSelector } from "customHooks/useSelector";
import { IGoodsElement } from "components/pages/items";
import { IOption } from "../../";
import Input from "components/inputs";
import { Button } from "../styles";
import { ReactComponent as DeleteIcon } from "assets/adminPanel/delete.svg";
import { ReactComponent as PlusIcon } from "assets/adminPanel/plus.svg";

interface IProps {
  anchorEl: HTMLDivElement | null;
  closeHandler: () => void;
  ignoreFiltersList: string[];
  setItemDataClone: (newValue: IGoodsElement) => void;
  editableFilterId: string | null;
  setEditableFilterId: (newId: string | null) => void;
  itemDataCloneForEdit: IGoodsElement;
  setItemDataCloneForEdit: (newValue: IGoodsElement) => void;
}

const Popover = ({
  anchorEl,
  closeHandler,
  ignoreFiltersList,
  setItemDataClone,
  editableFilterId,
  setEditableFilterId,
  itemDataCloneForEdit,
  setItemDataCloneForEdit,
}: IProps) => {
  // const { filters } = itemDataCloneForEdit;
  const filtersTypes = useSelector((state) => state.filters);

  const optionsForEditFilterSelector = useMemo(() => {
    // get options for filter type selector
    return filtersTypes
      .filter((elem) => !ignoreFiltersList.includes(elem.type))
      .map((elem) => {
        const { name, type } = elem;

        return {
          label: name,
          value: type,
        };
      });
  }, [filtersTypes, ignoreFiltersList]);

  const changedTypeOfFilter = useMemo(() => {
    // changed value for filter type selector
    const changedFilter = filtersTypes.find(
      (filter) => filter.type === editableFilterId
    );

    if (changedFilter) {
      return {
        label: changedFilter.name,
        value: changedFilter.type,
      };
    } else {
      return {
        label: "",
        value: "",
      };
    }
  }, [editableFilterId, filtersTypes]);

  const changedFilter = useMemo(() => {
    // changed filter from item data
    const { filters } = itemDataCloneForEdit;

    if (editableFilterId) {
      const filter = filters[editableFilterId];

      if (Array.isArray(filter)) {
        return filter;
      }
    }
  }, [editableFilterId, itemDataCloneForEdit]);

  const isBlockedSubmitButton = useMemo(() => {
    const { filters } = itemDataCloneForEdit;

    if (editableFilterId) {
      const changedFilter = filters[editableFilterId];

      if (Array.isArray(changedFilter)) {
        if (changedFilter.length < 1 || changedFilter.includes("")) {
          return true;
        }
      }
    }
    return false;
  }, [editableFilterId, itemDataCloneForEdit]);

  const changeTypeFilter = (newValue: IOption) => {
    // handler for filter type selector
    const itemClone = { ...itemDataCloneForEdit };
    const { filters } = itemClone;

    if (editableFilterId) {
      const oldFilterValue = filters[editableFilterId];
      delete filters[editableFilterId];
      filters[newValue.value] = oldFilterValue;
      setEditableFilterId(newValue.value);
      setItemDataCloneForEdit(itemClone);
    }
  };

  const onInputFilterElement = (e: BaseSyntheticEvent) => {
    // handler for filter value inputs
    const { value, name } = e.target;

    const itemClone = { ...itemDataCloneForEdit };
    const { filters } = itemClone;
    if (editableFilterId) {
      const changedFilter = filters[editableFilterId];

      if (Array.isArray(changedFilter)) {
        changedFilter[name] = value;
        setItemDataCloneForEdit(itemClone);
      }
    }
  };

  const deleteFilterHandler = (key: number) => {
    // delete handler for filter values
    const itemClone = { ...itemDataCloneForEdit };
    const { filters } = itemClone;

    if (editableFilterId) {
      const changedFilter = filters[editableFilterId];

      if (Array.isArray(changedFilter)) {
        changedFilter.splice(key, 1);
        setItemDataCloneForEdit(itemClone);
      }
    }
  };

  const addNewFilterValue = () => {
    // add new filter value handler
    const itemClone = { ...itemDataCloneForEdit };
    const { filters } = itemClone;

    if (editableFilterId) {
      const changedFilter = filters[editableFilterId];

      if (Array.isArray(changedFilter)) {
        changedFilter.push("");
        setItemDataCloneForEdit(itemClone);
      }
    }
  };

  const submitHandler = () => {
    if (!isBlockedSubmitButton) {
      setItemDataClone({
        ...itemDataCloneForEdit,
      });
      closeHandler();
    }
  };

  return (
    <StyledPopover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={closeHandler}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
    >
      <MainPopoverContainer>
        <InputLabel>Тип фильтра</InputLabel>
        <SelectorContainer>
          <Selector
            StyledInputContainer={StyledSelectorInput}
            StyledOptionContainer={StyledSelectorOptions}
            StyledOption={StyledSelectorOption}
            options={optionsForEditFilterSelector}
            changedValue={changedTypeOfFilter}
            setNewValue={changeTypeFilter}
            arrowIcon={arrowDown}
          />
        </SelectorContainer>
        {changedFilter &&
          changedFilter.map((elem, key) => (
            <InputContainer>
              <Input
                StyledComponent={StyledInput}
                name={`${key}`}
                type={"text"}
                value={elem}
                onInput={onInputFilterElement}
              />
              <Button right={"-40px"} onClick={() => deleteFilterHandler(key)}>
                <DeleteIcon />
              </Button>
            </InputContainer>
          ))}
        <PlusButton onClick={addNewFilterValue}>
          <PlusIcon />
        </PlusButton>
        <SubmitButton isBlocked={isBlockedSubmitButton} onClick={submitHandler}>
          Обновить
        </SubmitButton>
      </MainPopoverContainer>
    </StyledPopover>
  );
};

export default Popover;
