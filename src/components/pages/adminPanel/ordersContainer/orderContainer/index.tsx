import React, { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";

import { MainContainer } from "./styles";
import { ICompletedOrderData } from "utils/interfaces";
import CustomerDataForm from "./customerDataForm";

interface IProps {
  changedOrder: ICompletedOrderData;
}

const OrderContainer = ({ changedOrder }: IProps) => {
  const [orderClone, setOrderClone] = useState(cloneDeep(changedOrder));

  useEffect(() => {
    setOrderClone(cloneDeep(changedOrder));
  }, [changedOrder]);

  return (
    <MainContainer>
      <CustomerDataForm orderClone={orderClone} setOrderClone={setOrderClone} />
    </MainContainer>
  );
};

export default OrderContainer;
