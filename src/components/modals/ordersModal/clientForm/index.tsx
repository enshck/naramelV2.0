import React, { BaseSyntheticEvent } from "react";
import { Dialog } from "@material-ui/core";

import {
  FormContainer,
  StyledInput,
  MainContainer,
  Label,
  InputContainer
} from "./styles";
import Input from "components/inputs";
import { ICustomerData } from "../";

interface IProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
  customerData: ICustomerData;
  customerDataHandler: (e: BaseSyntheticEvent, name: string) => void;
}

const Step2 = ({
  open,
  onClose,
  customerData,
  customerDataHandler
}: IProps) => {
  const { name, patronymic, phone } = customerData;
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"sm"}>
      <MainContainer>
        <FormContainer>
          <InputContainer>
            <Label htmlFor={"name"}>Имя</Label>
            <Input
              StyledComponent={StyledInput}
              name={"name"}
              type={"text"}
              value={name}
              onInput={customerDataHandler}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor={"patronymic"}>Отчество</Label>
            <Input
              StyledComponent={StyledInput}
              name={"patronymic"}
              type={"text"}
              value={patronymic}
              onInput={customerDataHandler}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor={"patronymic"}>Номер</Label>
            <Input
              StyledComponent={StyledInput}
              name={"phone"}
              type={"text"}
              value={phone}
              onInput={customerDataHandler}
            />
          </InputContainer>
        </FormContainer>
      </MainContainer>
    </Dialog>
  );
};

export default Step2;
