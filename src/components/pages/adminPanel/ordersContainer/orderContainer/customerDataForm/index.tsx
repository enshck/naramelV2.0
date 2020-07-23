import React, { BaseSyntheticEvent, useState, useEffect } from "react";

import Form from "./form";
import { ICompletedOrderData } from "utils/interfaces";
import { StatusType } from "axiosRequests/adminPanel";
import {
  getCities,
  getWarehouses,
  getWarehousesByName,
  getDat,
} from "axiosRequests/orders";

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
  const [dynamicCitySearchValue, setDynamicCitySearchValue] = useState(city);
  const [citiesOptions, setCitiesOptions] = useState<IOption[]>([]);
  const [warehousesOptions, setWarehousesOptions] = useState<IOption[]>([]);

  useEffect(() => {
    // const { value } = changedCity;
    // console.log(citiesOptions, "dat");

    if (city.length > 0) {
      getDat(city).then((result) => {
        const { data } = result;

        console.log(result);

        // console.log(result, "dat");
        // const warehousesData = Array.isArray(data) ? data : [];

        // setWarehousesOptions(
        //   warehousesData.map((elem) => ({
        //     label: elem.DescriptionRu,
        //     value: elem.DescriptionRu,
        //   }))
        // );
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
      [name]: value,
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
        city: data.value,
        warehouse: "",
      },
    });
  };

  const onChangeWarehouse = (value: IOption) => {
    console.log(value, "value");
    // setChangedWarehouse({
    //   ...value,
    //   label: value.label.slice(0, 35) + "...",
    // });
  };

  console.log(dynamicCitySearchValue, "date");

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
