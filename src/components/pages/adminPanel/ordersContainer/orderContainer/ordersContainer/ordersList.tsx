import React from "react";

import {
  MainContainer,
  OrderElement,
  OrderInfo,
  OrderInfoContainer,
  Price,
  ImageContainer,
  PlusIcon,
  MinusIcon,
  CountConrolContainer,
  CountControlButton,
} from "./styles";
import { ICompletedOrderData } from "utils/interfaces";
import { useSelector } from "customHooks/useSelector";

interface IProps {
  changedOrder: ICompletedOrderData;
  updateCountOfGoods: (count: number, key: number) => void;
}

const OrdersList = ({ changedOrder, updateCountOfGoods }: IProps) => {
  const { ordersData } = changedOrder;
  const filters = useSelector((state) => state.filters);

  return (
    <MainContainer>
      {ordersData.map((elem, key) => {
        const { images, name, price, elementValue, count } = elem;
        const { value, type } = elementValue;
        const filterForOrderElement = filters.find(
          (elem) => elem.type === type
        );

        return (
          <OrderElement key={key}>
            <OrderInfoContainer>
              <ImageContainer>
                <img
                  src={
                    typeof images[0] === "string"
                      ? images[0]
                      : URL.createObjectURL(images[0])
                  }
                  alt={"itemImage"}
                />
              </ImageContainer>
              <OrderInfo>
                <h2>{name}</h2>
                <span>{`${value} ${filterForOrderElement?.units || ""}`}</span>
                <CountConrolContainer>
                  <CountControlButton
                    onClick={() => count && updateCountOfGoods(count + 1, key)}
                  >
                    <PlusIcon />
                  </CountControlButton>
                  <p>{count}</p>
                  <CountControlButton
                    onClick={() => count && updateCountOfGoods(count - 1, key)}
                  >
                    <MinusIcon />
                  </CountControlButton>
                </CountConrolContainer>
              </OrderInfo>
            </OrderInfoContainer>
            <Price>{count ? (price * count).toFixed(2) : "0"} грн</Price>
          </OrderElement>
        );
      })}
    </MainContainer>
  );
};

export default OrdersList;
