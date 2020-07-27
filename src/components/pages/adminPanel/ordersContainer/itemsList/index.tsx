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
  setFilters: (filters: IGetOrdersParams) => void;
  ordersData: ICompletedOrderData[];
  filtersForInputs: IGetOrdersParams;
  setFiltersForInputs: (newValue: IGetOrdersParams) => void;
  changedOrder: ICompletedOrderData | null;
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
  setFilters,
  ordersData,
  changedOrder,
  filtersForInputs,
  setFiltersForInputs,
}: IProps) => {
  const history = useHistory();
  const [minOfDateToInput, maxOfDateToInput]: IRangeOfDate = useMemo(() => {
    const { dateFrom } = filtersForInputs;

    if (dateFrom) {
      const toDateMax = moment(dateFrom).add(6, "M").format("YYYY-MM-DD");
      const toDateMin = moment(dateFrom)
        .add(1, "M")
        .add(1, "d")
        .format("YYYY-MM-DD");
      return [toDateMin, toDateMax];
    }

    return [undefined, undefined];
  }, [filtersForInputs]);
  const [minOfDateFromInput, maxOfDateFromInput]: IRangeOfDate = useMemo(() => {
    const { dateTo } = filtersForInputs;

    if (dateTo) {
      const fromDateMax = moment(dateTo).add(-1, "d").format("YYYY-MM-DD");
      const fromDateMin = moment(dateTo).add(-6, "M").format("YYYY-MM-DD");

      return [fromDateMin, fromDateMax];
    }

    return [undefined, undefined];
  }, [filtersForInputs]);

  const onInputSearch = (e: BaseSyntheticEvent) => {
    const { value } = e.target;

    const newFiltersValue = {
      ...filtersForInputs,
    };

    if (value.length > 0) {
      newFiltersValue.searchString = value;
    } else {
      delete newFiltersValue.searchString;
    }

    setFiltersForInputs(newFiltersValue);
  };

  const onChangeFilter = (newValue: IOption) => {
    const value = newValue.value;

    const newFiltersValue = {
      ...filtersForInputs,
    };

    if (value.length > 0) {
      newFiltersValue.status = value as StatusType;
    } else {
      delete newFiltersValue.status;
    }

    setFiltersForInputs(newFiltersValue);
  };

  const onChangeDate = (e: BaseSyntheticEvent) => {
    const { value } = e.target;

    const name: "dateFrom" | "dateTo" = e.target.name;

    const newFiltersValue = {
      ...filtersForInputs,
    };

    newFiltersValue[name] = value;

    setFiltersForInputs(newFiltersValue);
  };

  const submitFilterHandler = () => {
    setFilters(filtersForInputs);
  };

  const clearFilterHandler = () => {
    setFilters({});
    setFiltersForInputs({});
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
            value={filtersForInputs?.searchString || ""}
            onInput={onInputSearch}
          />
        </InputContainer>
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
                label: filtersForInputs.status
                  ? orderStatus[filtersForInputs.status]
                  : "Фильтр не выбран",
                value: filtersForInputs.status || "",
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
            value={filtersForInputs?.dateFrom || ""}
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
            value={filtersForInputs?.dateTo || ""}
            onInput={onChangeDate}
            min={minOfDateToInput}
            max={maxOfDateToInput}
          />
        </InputContainer>
        <ClearFilterButton onClick={clearFilterHandler}>
          Очистить фильтры
        </ClearFilterButton>
        <ClearFilterButton onClick={submitFilterHandler}>
          Применить фильтры
        </ClearFilterButton>
      </SearchContainer>
      <OrdersList>
        {ordersData.map((elem) => {
          const { id, status, date } = elem;

          return (
            <OrderElement
              isChanged={Boolean(changedOrder && id === changedOrder.id)}
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
