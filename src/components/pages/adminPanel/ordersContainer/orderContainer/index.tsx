import React, { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";

import { MainContainer, SubmitButtonContainer, SubmitButton } from "./styles";
import { ICompletedOrderData } from "utils/interfaces";
import CustomerDataForm from "./customerDataForm";
import OrdersContainer from "./ordersContainer";
import AddGoodsModal from "./addGoodsModal";

interface IProps {
  changedOrder: ICompletedOrderData;
}

const OrderContainer = ({ changedOrder }: IProps) => {
  const [orderClone, setOrderClone] = useState(cloneDeep(changedOrder));
  const [isOpenAddGoodsModal, setOpenAddGoodsModal] = useState(true);

  useEffect(() => {
    setOrderClone(cloneDeep(changedOrder));
  }, [changedOrder]);

  const onCloseAddGoodsModal = () => {
    setOpenAddGoodsModal(false);
  };

  return (
    <MainContainer>
      <CustomerDataForm orderClone={orderClone} setOrderClone={setOrderClone} />
      <OrdersContainer
        changedOrder={changedOrder}
        setOrderClone={setOrderClone}
      />
      <AddGoodsModal
        open={isOpenAddGoodsModal}
        onCloseAddGoodsModal={onCloseAddGoodsModal}
      />
      <SubmitButtonContainer>
        <SubmitButton onClick={() => setOpenAddGoodsModal(true)}>
          Добавить товар
        </SubmitButton>
        <SubmitButton>Сохранить</SubmitButton>
      </SubmitButtonContainer>
    </MainContainer>
  );
};

export default OrderContainer;
