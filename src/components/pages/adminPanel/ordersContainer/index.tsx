import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import qs from "qs";

import { MainContainer, GridElement } from "./styles";
import { useAsyncMemo } from "customHooks/useAsyncMemo";
import { ICompletedOrderData } from "utils/interfaces";
import firebase from "utils/firebase";
import { getOrders, IGetOrdersParams } from "axiosRequests/adminPanel";
import ItemsList from "./itemsList";

const OrdersContainer = () => {
  const history = useHistory();
  // const { search } = history.location;
  const [filters, setFilters] = useState<IGetOrdersParams>({});
  const [filterIdInputData, setFilterIdInputData] = useState<string>("");

  const [ordersData] = useAsyncMemo<ICompletedOrderData[]>(
    async () => {
      const token = (await firebase.auth().currentUser?.getIdTokenResult())
        ?.token;
      return token
        ? getOrders(filters, token)
        : new Promise((resolve) => {
            resolve([]);
          });
    },
    [filters],
    []
  );

  const changedOrder = useMemo(() => {
    const { search } = history.location;
    const { id } = qs.parse(search.slice(1));
    const { data } = ordersData;

    if (id) {
      const changedOrder = data.find((elem) => elem.id === id);

      if (changedOrder) {
        return changedOrder;
      }
    }
    return null;
  }, [ordersData, history]);

  // useEffect(() => {
  //   const { search } = history.location;
  //   const params = qs.parse(search.slice(1));

  //   setFilters(params);
  // }, [history]);

  // useEffect(() => {
  //   history.push({
  //     pathname: "/adminPanel",
  //     search: qs.stringify(filters),
  //     hash: "#0",
  //   });
  // }, [filters]);

  // console.log(filters, "data");

  //   const changedItem = useMemo(() => {
  //     const { id } = qs.parse(search.slice(1));
  //     const changedItemData = filteredGoodsData.find((elem) => elem.id === id);

  //     if (!changedItemData) {
  //       return null;
  //     }

  //     return changedItemData;
  //   }, [filteredGoodsData, search]);

  console.log(changedOrder, "adta");

  return (
    <MainContainer>
      <GridElement>
        <ItemsList
          filters={filters}
          setFilters={setFilters}
          ordersData={ordersData.data}
          filterIdInputData={filterIdInputData}
          setFilterIdInputData={setFilterIdInputData}
        />
      </GridElement>
      <GridElement>
        <div>выберите товар</div>
        {/* {changedItem ? (
        <EditGoodsContainer
          changedItem={changedItem}
          listOfGoodsCategory={listOfGoodsCategory}
          setGoodsData={setGoodsData}
        />
      ) : (
        <EmptyEditGoodsContainer>Выберите товар</EmptyEditGoodsContainer>
      )} */}
      </GridElement>
    </MainContainer>
  );
};

export default OrdersContainer;
