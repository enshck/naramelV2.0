import React, { BaseSyntheticEvent, useMemo } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import qs from "qs";

import {
  StyledSearchLabel,
  StyledInput,
  SearchContainer,
  ItemsContainer,
  StyledSelectorInput,
  StyledSelectorOption,
  StyledSelectorOptions,
  OrderElement,
  OrdersList,
  StyledOrderStatusContainer,
  DateContainer,
  InputContainer,
  SelectorContainer,
  ClearFilterButton,
} from "./styles";
import Input from "components/inputs";
import { IGetOrdersParams } from "axiosRequests/adminPanel";
import Selector from "components/inputs/selector";
import arrowDown from "assets/goods/arrowDown.png";
import { orderStatus as orderStatusTemplate } from "utils/constants";
import { StatusType } from "axiosRequests/adminPanel";
import { ICompletedOrderData } from "utils/interfaces";

interface IProps {
  filters: IGetOrdersParams;
  setFilters: (filters: IGetOrdersParams) => void;
  ordersData: ICompletedOrderData[];
  filterIdInputData: string;
  setFilterIdInputData: (filterId: string) => void;
}

interface IOption {
  label: string;
  value: string;
}

const orderStatus: { [key: string]: string } = {
  "": "Фильтр не выбран",
  ...orderStatusTemplate,
};

type IRangeOfDate = [string?, string?];

const ItemsList = ({
  filters,
  setFilters,
  ordersData,
  filterIdInputData,
  setFilterIdInputData,
}: IProps) => {
  const history = useHistory();
  const [minOfDateToInput, maxOfDateToInput]: IRangeOfDate = useMemo(() => {
    const { dateFrom } = filters;

    if (dateFrom) {
      const toDateMax = moment(dateFrom).add("M", 6).format("YYYY-MM-DD");
      const toDateMin = moment(dateFrom)
        .add("M", 1)
        .add("d", 1)
        .format("YYYY-MM-DD");
      return [toDateMin, toDateMax];
    }

    return [undefined, undefined];
  }, [filters]);
  const [minOfDateFromInput, maxOfDateFromInput]: IRangeOfDate = useMemo(() => {
    const { dateTo } = filters;

    if (dateTo) {
      const fromDateMax = moment(dateTo).add("d", -1).format("YYYY-MM-DD");
      const fromDateMin = moment(dateTo).add("M", -6).format("YYYY-MM-DD");

      return [fromDateMin, fromDateMax];
    }

    return [undefined, undefined];
  }, [filters]);

  const onInputSearch = (e: BaseSyntheticEvent) => {
    setFilterIdInputData(e.target.value);
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

  const submitFilterHandler = () => {
    if (filterIdInputData.length < 1) {
      const cloneOfFilters = {
        ...filters,
      };
      delete cloneOfFilters.searchString;
      setFilters(cloneOfFilters);
    } else {
      setFilters({
        ...filters,
        searchString: filterIdInputData,
      });
    }
  };

  const clearFilterHandler = () => {
    setFilters({});
    setFilterIdInputData("");
  };

  return (
    <ItemsContainer>
      <SearchContainer>
        <InputContainer>
          <StyledSearchLabel htmlFor={"searchValue"}>
            Поиск по ID заказа
          </StyledSearchLabel>
          <Input
            StyledComponent={StyledInput}
            name={"searchValue"}
            type={"text"}
            value={filterIdInputData}
            onInput={onInputSearch}
          />
        </InputContainer>
        <ClearFilterButton onClick={submitFilterHandler}>
          Фильтровать по id
        </ClearFilterButton>
        <InputContainer>
          <StyledSearchLabel htmlFor={"searchValue"}>
            Поиск по статусу заказа
          </StyledSearchLabel>
          <SelectorContainer>
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
          </SelectorContainer>
        </InputContainer>
        <InputContainer>
          <StyledSearchLabel htmlFor={"dateFrom"}>От даты:</StyledSearchLabel>
          <Input
            StyledComponent={StyledInput}
            name={"dateFrom"}
            type={"date"}
            value={filters?.dateFrom || ""}
            onInput={onChangeDate}
            min={minOfDateFromInput}
            max={maxOfDateFromInput}
          />
        </InputContainer>
        <InputContainer>
          <StyledSearchLabel htmlFor={"dateTo"}>До даты:</StyledSearchLabel>
          <Input
            StyledComponent={StyledInput}
            name={"dateTo"}
            type={"date"}
            value={filters?.dateTo || ""}
            onInput={onChangeDate}
            min={minOfDateToInput}
            max={maxOfDateToInput}
          />
        </InputContainer>
        <ClearFilterButton onClick={clearFilterHandler}>
          Очистить фильтр
        </ClearFilterButton>
      </SearchContainer>
      <OrdersList>
        {ordersData.map((elem) => {
          const { id, status, date } = elem;

          return (
            <OrderElement
              onClick={() =>
                history.push({
                  pathname: "/adminPanel",
                  hash: "#0",
                  search: qs.stringify({
                    id,
                  }),
                })
              }
            >
              {id}
              <DateContainer>
                <p>{date}</p>
                <StyledOrderStatusContainer status={status}>
                  {orderStatusTemplate[status]}
                </StyledOrderStatusContainer>
              </DateContainer>
            </OrderElement>
          );
        })}
      </OrdersList>
    </ItemsContainer>
  );
};

export default ItemsList;
