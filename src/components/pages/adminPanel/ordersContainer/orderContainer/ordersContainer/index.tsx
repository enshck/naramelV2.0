import React from "react";

import { ICompletedOrderData } from "utils/interfaces";
import OrdersList from "./ordersList";

interface IProps {
  orderClone: ICompletedOrderData;
  setOrderClone: (newData: ICompletedOrderData) => void;
}

const OrdersMainContainer = ({ orderClone, setOrderClone }: IProps) => {
  const updateCountOfGoods = (count: number, key: number) => {
    const ordersDataClone = { ...orderClone };

    if (count < 1) {
      if (ordersDataClone.ordersData.length <= 1) {
        return;
      }
      ordersDataClone.ordersData.splice(key, 1);
    } else {
      ordersDataClone.ordersData[key].count = count;
    }

    setOrderClone(ordersDataClone);
  };

  return (
    <OrdersList
      orderClone={orderClone}
      updateCountOfGoods={updateCountOfGoods}
    />
  );
};

export default OrdersMainContainer;
