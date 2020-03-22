import React, { useMemo, useState, useEffect } from "react";
import { Dialog } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";

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
  CloseButton,
  ConfirmButton
} from "./styles";
import { useSelector } from "customHooks/useSelector";
import { setOrdersData, setOpenedModal } from "store/actions";
import { getSummaryOrder } from "utils/handlers";

interface IProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
}

const OrdersModal = ({ open, onClose }: IProps) => {
  const [step, setStep] = useState<number>(0);
  const ordersData = useSelector(state => state.orders);
  const filters = useSelector(state => state.filters);
  const summaryValue = useMemo(() => getSummaryOrder(ordersData), [ordersData]);
  const dispatch = useDispatch();

  const updateCountOfGoods = (newCount: number, key: number) => {
    const newOrdersData = [...ordersData];

    if (newCount < 1) {
      newOrdersData.splice(key, 1);
    } else {
      newOrdersData[key].count = newCount;
    }
    localStorage.setItem("ordersData", JSON.stringify(ordersData));
    dispatch(setOrdersData(newOrdersData));
    if (newOrdersData.length < 1) {
      onClose(false);
    }
  };

  const submitHandler = () => {};

  if (step === 2) {
    return (
      <Dialog open={open} fullWidth={true} maxWidth={"md"}>
        step 3
      </Dialog>
    );
  }

  if (step === 1) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>
        step 2
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>
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
                  count
                } = elem;
                const { value, type } = elementValue;
                const filterForOrderElement = filters.find(
                  elem => elem.type === type
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
                        <span>{`${value} ${filterForOrderElement?.units ||
                          ""}`}</span>
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

export default OrdersModal;
