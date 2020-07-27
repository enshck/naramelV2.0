import React, { useState, useEffect } from "react";
import cloneDeep from "lodash.clonedeep";

import { MainContainer, SubmitButtonContainer, SubmitButton } from "./styles";
import { ICompletedOrderData } from "utils/interfaces";
import CustomerDataForm from "./customerDataForm";
import OrdersContainer from "./ordersContainer";
import AddGoodsModal from "./addGoodsModal";
import firebase from "utils/firebase";
import Loading from "components/spinner";

interface IProps {
  changedOrder: ICompletedOrderData;
  updateOrdersData: () => void;
  isFetching: boolean;
  setFetching: (newValue: boolean) => void;
}

const OrderContainer = ({
  changedOrder,
  updateOrdersData,
  isFetching,
  setFetching,
}: IProps) => {
  const [orderClone, setOrderClone] = useState(cloneDeep(changedOrder));
  const [isOpenAddGoodsModal, setOpenAddGoodsModal] = useState(false);

  useEffect(() => {
    setOrderClone(cloneDeep(changedOrder));
  }, [changedOrder]);

  const onCloseAddGoodsModal = () => {
    setOpenAddGoodsModal(false);
  };

  const saveOrderHandler = async () => {
    const { id } = orderClone;

    try {
      setFetching(true);
      await firebase
        .firestore()
        .collection("orders")
        .doc(id)
        .update(orderClone);
      updateOrdersData();
      setFetching(false);
    } catch (err) {
      console.log(err, "error");
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <MainContainer>
      <AddGoodsModal
        open={isOpenAddGoodsModal}
        onCloseAddGoodsModal={onCloseAddGoodsModal}
        orderClone={orderClone}
        setOrderClone={setOrderClone}
      />
      <CustomerDataForm orderClone={orderClone} setOrderClone={setOrderClone} />
      <OrdersContainer orderClone={orderClone} setOrderClone={setOrderClone} />
      <SubmitButtonContainer>
        <SubmitButton onClick={() => setOpenAddGoodsModal(true)}>
          Добавить товар
        </SubmitButton>
        <SubmitButton onClick={saveOrderHandler}>Сохранить</SubmitButton>
      </SubmitButtonContainer>
    </MainContainer>
  );
};

export default OrderContainer;
