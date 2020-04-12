import React, { useMemo } from "react";
import { Dialog } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";

import { useSelector } from "customHooks/useSelector";
import { getSummaryOrder } from "utils/handlers";
import {
  MainContainer,
  OrderElement,
  OrdersContainer,
  OrderInfo,
  OrderInfoContainer,
  Price,
  ImageContainer,
  PlusIcon,
  MinusIcon,
  CountConrolContainer,
  CountControlButton,
  Orders,
  SummaryOrderPrice,
  ControlContainer,
} from "./styles";
import { ConfirmButton, CloseButton } from "../styles";

interface IProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
  updateCountOfGoods: (newCount: number, key: number) => void;
  setStep: (step: number) => void;
}

const Step1 = ({ open, onClose, updateCountOfGoods, setStep }: IProps) => {
  const ordersData = useSelector((state) => state.orders);
  const filters = useSelector((state) => state.filters);
  const summaryValue = useMemo(() => getSummaryOrder(ordersData), [ordersData]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"sm"}>
      <MainContainer>
        <h1>Корзина</h1>
        <OrdersContainer>
          <Scrollbars autoHeight autoHeightMax={400}>
            <Orders>
              {ordersData.map((elem, key) => {
                const {
                  image,
                  name,
                  price,
                  subName,
                  elementValue,
                  count,
                } = elem;
                const { value, type } = elementValue;
                const filterForOrderElement = filters.find(
                  (elem) => elem.type === type
                );

                return (
                  <OrderElement>
                    <OrderInfoContainer>
                      <ImageContainer>
                        <img src={image} alt={"itemImage"} />
                      </ImageContainer>
                      <OrderInfo>
                        <h2>{name}</h2>
                        <p>{subName}</p>
                        <span>{`${value} ${
                          filterForOrderElement?.units || ""
                        }`}</span>
                        <CountConrolContainer>
                          <CountControlButton
                            onClick={() =>
                              count && updateCountOfGoods(count + 1, key)
                            }
                          >
                            <PlusIcon />
                          </CountControlButton>
                          <p>{count}</p>
                          <CountControlButton
                            onClick={() =>
                              count && updateCountOfGoods(count - 1, key)
                            }
                          >
                            <MinusIcon />
                          </CountControlButton>
                        </CountConrolContainer>
                      </OrderInfo>
                    </OrderInfoContainer>
                    <Price>
                      {count ? (price * count).toFixed(2) : "0"} грн
                    </Price>
                  </OrderElement>
                );
              })}
            </Orders>
          </Scrollbars>
        </OrdersContainer>
        <SummaryOrderPrice>
          <span>Итого:</span>
          <p>
            <span>{summaryValue}</span> грн
          </p>
        </SummaryOrderPrice>
        <ControlContainer>
          <CloseButton onClick={() => onClose(false)}>
            Продолжить покупки
          </CloseButton>
          <ConfirmButton onClick={() => setStep(1)}>
            Оформить заказ
          </ConfirmButton>
        </ControlContainer>
      </MainContainer>
    </Dialog>
  );
};

export default Step1;
