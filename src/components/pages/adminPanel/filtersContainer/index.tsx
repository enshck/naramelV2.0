import React, { Fragment, useMemo, useState, useEffect } from "react";

import { useSelector } from "customHooks/useSelector";
import {
  MainContainer,
  Filters,
  FilterElement,
  Button,
  FilterInfo,
} from "./styles";
import { ReactComponent as EditIcon } from "assets/adminPanel/edit.svg";
import { ReactComponent as DeleteIcon } from "assets/adminPanel/delete.svg";
import firebase from "utils/firebase";
import { IGoodsElement } from "components/pages/items";
import { useAsyncMemo } from "customHooks/useAsyncMemo";
import { useDispatch } from "react-redux";
import { setFilters } from "store/actions";

interface ICustomerData {
  name: string;
  patronymic: string;
  phone: string;
  city: string;
  warehouse: string;
}

interface IOrderData {
  count: number;
  elementValue: {
    type: string;
    value: string;
  };
  id: string;
}

interface IComplateOrders {
  customerData: ICustomerData;
  date: string;
  id: string;
  ordersData: IOrderData;
}

const FiltersContainer = () => {
  const filters = useSelector((state) => state.filters);
  const [goodsData, setGoodsData] = useState<IGoodsElement[]>([]);
  const [orders, setOrders] = useState<IComplateOrders[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    updateGoodsAndOrdersData();
  }, []);

  const relatedGoodsIdsArray: {
    [key: string]: string[];
  } = useMemo(() => {
    const goodsIdsForEachFilter: { [key: string]: string[] } = {};

    goodsData.forEach((item) => {
      const { filters, id } = item;

      Object.keys(filters).forEach((filterKey) => {
        if (goodsIdsForEachFilter[filterKey]) {
          goodsIdsForEachFilter[filterKey].push(id);
        } else {
          goodsIdsForEachFilter[filterKey] = [id];
        }
      });
    });
    return goodsIdsForEachFilter;
  }, [goodsData]);

  const relatedOrdersIdsArray: {
    [key: string]: string[];
  } = useMemo(() => {
    const ordersIdsForEachFilter: { [key: string]: string[] } = {};

    filters.forEach((filter) => {
      const { type, id } = filter;

      console.log(filter, "val");
    });

    return ordersIdsForEachFilter;

    // goodsData.forEach((item) => {
    //   const { filters, id } = item;

    //   Object.keys(filters).forEach((filterKey) => {
    //     if (goodsIdsForEachFilter[filterKey]) {
    //       goodsIdsForEachFilter[filterKey].push(id);
    //     } else {
    //       goodsIdsForEachFilter[filterKey] = [id];
    //     }
    //   });
    // });
    // return goodsIdsForEachFilter;
  }, [orders, filters]);

  const updateGoodsAndOrdersData = async () => {
    const goodsData: any = (
      await firebase.firestore().collection("goods").get()
    ).docs.map((elem) => elem.data());
    const ordersData: any = (
      await firebase.firestore().collection("orders").get()
    ).docs.map((elem) => elem.data());
    const filters: any = (
      await firebase.firestore().collection("filters").get()
    ).docs.map((elem) => elem.data());

    dispatch(setFilters(filters));
    setGoodsData(goodsData);
    setOrders(ordersData);
  };

  // const i = async () => {

  // };

  // i();

  const deleteFilter = async (id: string) => {
    // const dat = await firebase
    //   .firestore()
    //   .collection("goods")
    //   .where(`filters.${id}`, "==", true)
    //   .get();
    // console.log(dat.docs.map((elem) => elem.data()));
  };
  // console.log(relatedGoodsIdsArray, "><<>>");

  return (
    <MainContainer>
      <Filters>
        {filters.map((elem) => {
          const { name, id, type, units } = elem;
          return (
            <FilterElement key={id}>
              {name}{" "}
              <span>
                (
                {units.length > 0
                  ? `Ед. измерения: ${units}`
                  : "Нет единиц измерения"}
                )
              </span>{" "}
              <FilterInfo>
                -{" "}
                {relatedGoodsIdsArray[type] &&
                  `${relatedGoodsIdsArray[type].length} товар(a)`}
              </FilterInfo>
              {type !== "price" && type !== "brand" && (
                <Fragment>
                  <Button right={"60px"}>
                    <EditIcon />
                  </Button>
                  <Button right={"20px"} onClick={() => deleteFilter(id)}>
                    <DeleteIcon />
                  </Button>
                </Fragment>
              )}
            </FilterElement>
          );
        })}
      </Filters>
    </MainContainer>
  );
};

export default FiltersContainer;
