import React, { BaseSyntheticEvent, ReactType, useRef, useEffect } from "react";
import { Dialog } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import {
  FormContainer,
  StyledInput,
  MainContainer,
  Label,
  InputContainer,
  ConfirmButton,
  StyledPhoneInput,
  CloseButton,
  DynamicSearchInput,
  StyledOption,
  StyledSearchList,
  SelectorInput,
} from "./styles";
import Input from "components/inputs";
import { ICustomerData, IOption } from "../";
import DynamicSearcher from "components/inputs/dynamicSearch";
import Selector from "components/inputs/selector";
import arrowDown from "assets/goods/arrowDown.png";

interface IProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
  customerData: ICustomerData;
  customerDataHandler: (e: BaseSyntheticEvent, name: string) => void;
  setStep: (step: number) => void;
  submitHandler: () => void;
  customerPhoneInputHandler: (value: string) => void;
  citySearchHandler: (value: string) => void;
  citiesOptions: IOption[];
  onChangeCityHandler: (data: IOption) => void;
  dynamicSearchValue: string;
  warehousesOptions: IOption[];
  changedWarehouse: IOption;
  onChangeWarehouse: (value: IOption) => void;
  changedCity: IOption;
  result: string;
}

const Step2 = ({
  open,
  onClose,
  customerData,
  customerDataHandler,
  setStep,
  submitHandler,
  customerPhoneInputHandler,
  citiesOptions,
  citySearchHandler,
  onChangeCityHandler,
  dynamicSearchValue,
  warehousesOptions,
  changedWarehouse,
  onChangeWarehouse,
  changedCity,
  result,
}: IProps) => {
  const { name, patronymic, phone } = customerData;
  const history = useHistory();

  const res = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!res.current) {
      return;
    }
    res.current.innerHTML = result;
  }, [result]);

  // console.log(Result, "res");

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"sm"}>
      <MainContainer>
        <h1>Данные заказчика</h1>
        <FormContainer>
          <InputContainer>
            <Label htmlFor={"name"}>Имя</Label>
            <Input
              StyledComponent={StyledInput}
              name={"name"}
              type={"text"}
              defaultValue={name}
              onInput={customerDataHandler}
              autoComplete={"off"}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor={"patronymic"}>Отчество</Label>
            <Input
              StyledComponent={StyledInput}
              name={"patronymic"}
              type={"text"}
              defaultValue={patronymic}
              onInput={customerDataHandler}
              autoComplete={"off"}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor={"phone"}>Телефон</Label>
            <Input
              StyledComponent={StyledPhoneInput}
              name={"phone"}
              type={"text"}
              defaultValue={phone}
              onInput={(e) => customerPhoneInputHandler(e.target.value)}
              mask={"+38 (999) 999 99 99"}
              maskChar={null}
              autoComplete={"off"}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor={"citySearch"}>Населенный пункт</Label>
            <DynamicSearcher
              StyledComponent={DynamicSearchInput}
              StyledSearchList={StyledSearchList}
              StyledSearchElement={StyledOption}
              name={"citySearch"}
              searchHandler={citySearchHandler}
              options={citiesOptions}
              onChange={onChangeCityHandler}
              value={dynamicSearchValue}
            />
          </InputContainer>
          {warehousesOptions.length > 0 && (
            <InputContainer>
              <Label htmlFor={"citySearch"}>Отделение Новой Почты</Label>
              <Selector
                StyledInputContainer={SelectorInput}
                StyledOptionContainer={StyledSearchList}
                StyledOption={StyledOption}
                options={warehousesOptions}
                changedValue={changedWarehouse}
                setNewValue={onChangeWarehouse}
                arrowIcon={arrowDown}
              />
            </InputContainer>
          )}
          <ConfirmButton
            onClick={submitHandler}
            isBlocked={
              name.length < 1 ||
              patronymic.length < 1 ||
              phone.length !== 19 ||
              changedCity.value.length < 1 ||
              changedWarehouse.value.length < 1
            }
          >
            Сделать заказ
          </ConfirmButton>
          <CloseButton onClick={() => setStep(0)}>
            Продолжить покупки
          </CloseButton>
        </FormContainer>
        <div dangerouslySetInnerHTML={{ __html: result }} />
      </MainContainer>
    </Dialog>
  );
};

export default Step2;
