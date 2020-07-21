import React, { useCallback, BaseSyntheticEvent } from "react";

import {
  StyledSearchLabel,
  StyledInput,
  SearchContainer,
  ItemsContainer,
  StyledSelectorInput,
  StyledSelectorOption,
  StyledSelectorOptions,
} from "./styles";
import Input from "components/inputs";
import { getOrders, IGetOrdersParams } from "axiosRequests/adminPanel";
import { debounce } from "utils/handlers";
import Selector from "components/inputs/selector";
import arrowDown from "assets/goods/arrowDown.png";
import { orderStatus as orderStatusTemplate } from "utils/constants";
import { StatusType } from "axiosRequests/adminPanel";
interface IProps {
  filters: IGetOrdersParams;
  setFilters: (filters: IGetOrdersParams) => void;
}

interface IOption {
  label: string;
  value: string;
}

const orderStatus: { [key: string]: string } = {
  ...orderStatusTemplate,
  "": "Фильтр не выбран",
};

const ItemsList = ({ filters, setFilters }: IProps) => {
  const debounceForItemSearch = useCallback(debounce(800), []);

  const onInputSearch = (e: BaseSyntheticEvent) => {
    const value: string = e.target.value;
    const newFiltersValue = {
      ...filters,
    };

    if (value.length > 0) {
      newFiltersValue.searchString = value;
    } else {
      delete newFiltersValue.searchString;
    }

    debounceForItemSearch(() => setFilters(newFiltersValue));
  };

  const onChangeFilter = (newValue: IOption) => {
    const value = newValue.value;

    const newFiltersValue = {
      ...filters,
    };

    if (value.length > 0) {
      newFiltersValue.status = value as StatusType;
    } else {
      delete newFiltersValue.status;
    }

    setFilters(newFiltersValue);
  };

  const onChangeDate = (e: BaseSyntheticEvent) => {
    const { value } = e.target;

    const name: "dateFrom" | "dateTo" = e.target.name;

    const newFiltersValue = {
      ...filters,
    };

    newFiltersValue[name] = value;

    setFilters(newFiltersValue);
  };

  return (
    <ItemsContainer>
      <SearchContainer>
        <StyledSearchLabel htmlFor={"searchValue"}>
          Поиск по ID или имени товара
        </StyledSearchLabel>
        <Input
          StyledComponent={StyledInput}
          name={"searchValue"}
          type={"text"}
          value={filters?.searchString || ""}
          onInput={onInputSearch}
        />
        <StyledSearchLabel htmlFor={"searchValue"}>
          Поиск по статусу товара
        </StyledSearchLabel>
        <Selector
          StyledInputContainer={StyledSelectorInput}
          StyledOptionContainer={StyledSelectorOptions}
          StyledOption={StyledSelectorOption}
          options={Object.keys(orderStatus).map((elem) => ({
            label: orderStatus[elem],
            value: elem,
          }))}
          changedValue={{
            label: filters.status
              ? orderStatus[filters.status]
              : "Фильтр не выбран",
            value: filters.status || "",
          }}
          setNewValue={onChangeFilter}
          arrowIcon={arrowDown}
        />
        <Input
          StyledComponent={StyledInput}
          name={"dateFrom"}
          type={"date"}
          value={filters?.dateFrom || ""}
          onInput={onChangeDate}
          min={"2020-07-18"}
        />
        <Input
          StyledComponent={StyledInput}
          name={"dateTo"}
          type={"date"}
          value={filters?.dateTo || ""}
          onInput={onChangeDate}
        />
      </SearchContainer>
      {/* <GoodsListContainer
        filteredGoodsData={filteredGoodsData}
        changedItem={changedItem}
        setOpenAddGoodsModal={setOpenAddGoodsModal}
        deleteItemHandler={deleteItemHandler}
        relatedGoods={relatedGoodsData}
      /> */}
    </ItemsContainer>
  );
};

export default ItemsList;
