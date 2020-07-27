import React, { BaseSyntheticEvent, useState, useEffect } from "react";

import Form from "./form";
import { ICompletedOrderData } from "utils/interfaces";
import { StatusType } from "axiosRequests/adminPanel";
import { getCities, getWarehouses } from "axiosRequests/orders";

export interface IOption {
  label: string;
  value: string;
}

interface IProps {
  orderClone: ICompletedOrderData;
  setOrderClone: (newData: ICompletedOrderData) => void;
}

const CustomerDataForm = ({ orderClone, setOrderClone }: IProps) => {
  const { city } = orderClone.customerData;
  const [dynamicCitySearchValue, setDynamicCitySearchValue] = useState(
    city.cityName
  );
  const [citiesOptions, setCitiesOptions] = useState<IOption[]>([]);
  const [warehousesOptions, setWarehousesOptions] = useState<IOption[]>([]);

  useEffect(() => {
    if (city) {
      getWarehouses(city.cityId).then((result) => {
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
  }, [city]);

  const onChangeStatus = (newValue: IOption) => {
    setOrderClone({
      ...orderClone,
      status: newValue.value as StatusType,
    });
  };

  const onInputHandler = (e: BaseSyntheticEvent) => {
    const { value, name } = e.target;

    setOrderClone({
      ...orderClone,
      customerData: {
        ...orderClone.customerData,
        [name]: value,
      },
    });
  };

  const citySearchHandler = async (value: string) => {
    console.log(value);
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
    setOrderClone({
      ...orderClone,
      customerData: {
        ...orderClone.customerData,
        city: {
          cityId: data.value,
          cityName: data.label,
        },
        warehouse: "",
      },
    });
  };

  const onChangeWarehouse = (value: IOption) => {
    setOrderClone({
      ...orderClone,
      customerData: {
        ...orderClone.customerData,
        warehouse: value.label,
      },
    });
  };

  return (
    <Form
      onChangeStatus={onChangeStatus}
      orderClone={orderClone}
      onInputHandler={onInputHandler}
      citySearchHandler={citySearchHandler}
      citiesOptions={citiesOptions}
      onChangeCityHandler={onChangeCityHandler}
      dynamicCitySearchValue={dynamicCitySearchValue}
      warehousesOptions={warehousesOptions}
      onChangeWarehouse={onChangeWarehouse}
    />
  );
};

export default CustomerDataForm;
