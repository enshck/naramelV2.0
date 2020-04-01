import React, {
  useMemo,
  useState,
  useEffect,
  Fragment,
  BaseSyntheticEvent
} from "react";
import { Dialog } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";

import { useSelector } from "customHooks/useSelector";
import { setOrdersData, setOpenedModal } from "store/actions";
import OrdersBasket from "./ordersBasket";
import ClientForm from "./clientForm";
import ConfirmedOrder from "./confirmedOrder";

interface IProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
}

export interface ICustomerData {
  name: string;
  patronymic: string;
  phone: string;
}

const OrdersModal = ({ open, onClose }: IProps) => {
  const [step, setStep] = useState<number>(1);
  const [customerData, setCustomerData] = useState<ICustomerData>({
    name: "",
    patronymic: "",
    phone: ""
  });
  const ordersData = useSelector(state => state.orders);
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

  const customerDataHandler = (e: BaseSyntheticEvent, name: string) => {
    setCustomerData({
      ...customerData,
      [name]: e.target.value
    });
  };

  const submitHandler = () => {};

  return (
    <Fragment>
      <OrdersBasket
        open={open && step === 0}
        onClose={onClose}
        setStep={setStep}
        updateCountOfGoods={updateCountOfGoods}
      />
      <ClientForm
        open={open && step === 1}
        onClose={onClose}
        customerData={customerData}
        customerDataHandler={customerDataHandler}
      />
      <ConfirmedOrder open={open && step === 2} onClose={onClose} />
    </Fragment>
  );
};

export default OrdersModal;
