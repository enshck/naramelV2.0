import React from "react";
import { Dialog } from "@material-ui/core";

import { MainContainer, OrderElement, OrdersContainer } from "./styles";
import { useSelector } from "customHooks/useSelector";

interface IProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
}

const OrdersModal = ({ open, onClose }: IProps) => {
  const ordersData = useSelector(state => state.orders);

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"xl"}>
      <MainContainer>
        <h1>Корзина</h1>
        <OrdersContainer>
          {ordersData.map(elem => {
            const {
              brand,
              image,
              name,
              price,
              subName,
              description,
              elementValue,
              filters,
              groupId,
              id,
              count
            } = elem;

            return <OrderElement>{name}</OrderElement>;
          })}
        </OrdersContainer>
      </MainContainer>
    </Dialog>
  );
};

export default OrdersModal;
