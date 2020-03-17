import React, { useMemo } from "react";
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
  SummaryOrderPrice
} from "./styles";
import { useSelector } from "customHooks/useSelector";
import { setOrdersData } from "store/actions";
import { getSummaryOrder } from "utils/handlers";

interface IProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
}

const OrdersModal = ({ open, onClose }: IProps) => {
  const ordersData = useSelector(state => state.orders);
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
                const { value } = elementValue;

                return (
                  <OrderElement>
                    <OrderInfoContainer>
                      <ImageContainer>
                        <img src={image} alt={"itemImage"} />
                      </ImageContainer>
                      <OrderInfo>
                        <h2>{name}</h2>
                        <p>{subName}</p>
                        <span>{value}</span>
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
          <p>Итого:</p>
          <span>{summaryValue} грн</span>
        </SummaryOrderPrice>
      </MainContainer>
    </Dialog>
  );
};

export default OrdersModal;
