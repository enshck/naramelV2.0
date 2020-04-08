import React, {
  useState,
  useEffect,
  Fragment,
  BaseSyntheticEvent,
} from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "customHooks/useSelector";
import { setOrdersData } from "store/actions";
import OrdersBasket from "./ordersBasket";
import ClientForm from "./clientForm";
import ConfirmedOrder from "./confirmedOrder";
import { getCities, getWarehouses } from "axiosRequests/orders";

interface IProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
}

export interface ICustomerData {
  name: string;
  patronymic: string;
  phone: string;
}

export interface ICityData {
  DescriptionRu: string;
  Ref: string;
}

export interface IOption {
  label: string;
  value: string;
}

const OrdersModal = ({ open, onClose }: IProps) => {
  const [step, setStep] = useState<number>(0);
  const [citiesOptions, setCitiesOptions] = useState<IOption[]>([]);
  const [warehousesOptions, setWarehousesOptions] = useState<IOption[]>([]);
  const [changedCity, setChangedCity] = useState<IOption>({
    label: "",
    value: "",
  });
  const [changedWarehouse, setChangedWarehouse] = useState<IOption>({
    label: "",
    value: "",
  });
  const [dynamicCitySearchValue, setDynamicCitySearchValue] = useState<string>(
    ""
  );
  const [customerData, setCustomerData] = useState<ICustomerData>({
    name: "",
    patronymic: "",
    phone: "",
  });
  const ordersData = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const { value } = changedCity;

    if (value.length > 0) {
      getWarehouses(value).then((result) => {
        const { data } = result;
        const warehousesData = Array.isArray(data) ? data : [];

        setWarehousesOptions(
          warehousesData.map((elem) => ({
            label: elem.DescriptionRu,
            value: elem.DescriptionRu,
          }))
        );
      });
    }
  }, [changedCity]);

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
      [name]: e.target.value,
    });
  };

  const customerPhoneInputHandler = (value: string) => {
    setCustomerData({
      ...customerData,
      phone: value.slice(0, 19),
    });
  };

  const citySearchHandler = async (value: string) => {
    setDynamicCitySearchValue(value);
    const { data } = await getCities(value);
    const citiesData = Array.isArray(data) ? data.slice(0, 99) : [];

    setCitiesOptions(
      citiesData.map((elem) => {
        const type =
          elem.SettlementTypeDescriptionRu &&
          elem.SettlementTypeDescriptionRu.slice(0, 1);

        return {
          label: `${type}. ${elem.DescriptionRu}`,
          value: elem.Ref,
        };
      })
    );
  };

  const onChangeCityHandler = (data: IOption) => {
    setDynamicCitySearchValue(data.label);
    setChangedCity(data);
    setChangedWarehouse({
      label: "",
      value: "",
    });
  };

  const onChangeWarehouse = (value: IOption) => {
    setChangedWarehouse({
      ...value,
      label: value.label.slice(0, 40) + "...",
    });
  };

  const submitHandler = () => {
    const { name, patronymic, phone } = customerData;

    if (
      name.length >= 1 &&
      patronymic.length >= 1 &&
      phone.length === 19 &&
      changedCity.value.length >= 1 &&
      changedWarehouse.value.length >= 1
    ) {
      console.log(name, patronymic, phone, "<<<");
    }
  };

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
        setStep={setStep}
        submitHandler={submitHandler}
        customerPhoneInputHandler={customerPhoneInputHandler}
        citySearchHandler={citySearchHandler}
        citiesOptions={citiesOptions}
        onChangeCityHandler={onChangeCityHandler}
        dynamicSearchValue={dynamicCitySearchValue}
        warehousesOptions={warehousesOptions}
        changedWarehouse={changedWarehouse}
        onChangeWarehouse={onChangeWarehouse}
        changedCity={changedCity}
      />
      <ConfirmedOrder open={open && step === 2} onClose={onClose} />
    </Fragment>
  );
};

export default OrdersModal;
