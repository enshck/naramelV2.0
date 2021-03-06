import React, { BaseSyntheticEvent } from "react";

import {
  MainForm,
  InputContainer,
  StyledInput,
  StyledPhoneInput,
  DynamicSearchInput,
  StyledOption,
  StyledSearchList,
  SelectorInput,
  Label,
} from "./styles";
import Selector from "components/inputs/selector";
import { orderStatus } from "utils/constants";
import { IOption } from "./";
import { ICompletedOrderData } from "utils/interfaces";
import arrowDown from "assets/goods/arrowDown.png";
import Input from "components/inputs";
import DynamicSearcher from "components/inputs/dynamicSearch";

interface IProps {
  onChangeStatus: (newValue: IOption) => void;
  orderClone: ICompletedOrderData;
  onInputHandler: (e: BaseSyntheticEvent) => void;
  citySearchHandler: (value: string) => void;
  citiesOptions: IOption[];
  onChangeCityHandler: (newValue: IOption) => void;
  dynamicCitySearchValue: string;
  warehousesOptions: IOption[];
  onChangeWarehouse: (newValue: IOption) => void;
}

const Form = ({
  onChangeStatus,
  orderClone,
  onInputHandler,
  citySearchHandler,
  citiesOptions,
  onChangeCityHandler,
  dynamicCitySearchValue,
  warehousesOptions,
  onChangeWarehouse,
}: IProps) => {
  const { status, customerData } = orderClone;
  const { warehouse, phone, patronymic, name } = customerData;
  return (
    <MainForm>
      <InputContainer>
        <Label>Статус заказа</Label>
        <Selector
          StyledInputContainer={SelectorInput}
          StyledOptionContainer={StyledSearchList}
          StyledOption={StyledOption}
          options={Object.keys(orderStatus).map((elem) => ({
            label: orderStatus[elem],
            value: elem,
          }))}
          changedValue={{
            label: orderStatus[status] || "",
            value: status || "",
          }}
          setNewValue={onChangeStatus}
          arrowIcon={arrowDown}
        />
      </InputContainer>
      <InputContainer>
        <Label>Имя</Label>
        <Input
          StyledComponent={StyledInput}
          name={"name"}
          type={"text"}
          value={name}
          onInput={onInputHandler}
        />
      </InputContainer>
      <InputContainer>
        <Label>Отчество</Label>
        <Input
          StyledComponent={StyledInput}
          name={"patronymic"}
          type={"text"}
          value={patronymic}
          onInput={onInputHandler}
        />
      </InputContainer>
      <InputContainer>
        <Label>Телефон</Label>
        <Input
          StyledComponent={StyledPhoneInput}
          name={"phone"}
          type={"text"}
          value={phone}
          onInput={onInputHandler}
          mask={"+38 (999) 999 99 99"}
          maskChar={null}
          autoComplete={"off"}
        />
      </InputContainer>
      <InputContainer>
        <Label>Город</Label>
        <DynamicSearcher
          StyledComponent={DynamicSearchInput}
          StyledSearchList={StyledSearchList}
          StyledSearchElement={StyledOption}
          name={"city"}
          searchHandler={citySearchHandler}
          options={citiesOptions}
          onChange={onChangeCityHandler}
          value={dynamicCitySearchValue}
        />
      </InputContainer>
      <InputContainer>
        <Label>Отделение</Label>
        <Selector
          StyledInputContainer={SelectorInput}
          StyledOptionContainer={StyledSearchList}
          StyledOption={StyledOption}
          options={warehousesOptions}
          changedValue={{
            label: warehouse,
            value: warehouse,
          }}
          setNewValue={onChangeWarehouse}
          arrowIcon={arrowDown}
        />
      </InputContainer>
    </MainForm>
  );
};

export default Form;
