import React, { ReactType } from "react";
import { Dialog } from "@material-ui/core";
import { MainContainer, SubmitButton } from "./styles";

interface IProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
  completedOrderId: string;
  setStep: (step: number) => void;
}

const ConfirmedOrder = ({
  open,
  onClose,
  completedOrderId,
  setStep,
}: IProps) => {
  return (
    <Dialog open={open} fullWidth={true} maxWidth={"sm"}>
      <MainContainer>
        <h1>Спасибо за ваш заказ</h1>
        <h2>Наши менеджеры скоро свяжутся с вами</h2>
        <h3>
          Идентификатор заказа: <span>{completedOrderId}</span>
        </h3>
        <SubmitButton
          onClick={() => {
            onClose(true);
            setStep(0);
          }}
        >
          Вернутся на главную страницу
        </SubmitButton>
      </MainContainer>
    </Dialog>
  );
};

export default ConfirmedOrder;
