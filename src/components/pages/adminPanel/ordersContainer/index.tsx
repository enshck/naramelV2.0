import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import qs from "qs";

import { MainContainer, GridElement } from "./styles";
import { useAsyncMemo } from "customHooks/useAsyncMemo";
import { IOrderData } from "utils/interfaces";
import firebase from "utils/firebase";
import { getOrders, IGetOrdersParams } from "axiosRequests/adminPanel";
import { debounce } from "utils/handlers";
import ItemsList from "./itemsList";

const OrdersContainer = () => {
  const history = useHistory();
  const { search } = history.location;
  const [filters, setFilters] = useState<IGetOrdersParams>({});
  const debounceForItemSearch = useCallback(debounce(800), []);

  const [ordersData] = useAsyncMemo<IOrderData[]>(
    async () => {
      const token = (await firebase.auth().currentUser?.getIdTokenResult())
        ?.token;
      return token
        ? getOrders(filters, token)
        : new Promise((resolve) => {
            resolve([]);
          });
    },
    [],
    []
  );

  console.log(filters, "data");

  //   const changedItem = useMemo(() => {
  //     const { id } = qs.parse(search.slice(1));
  //     const changedItemData = filteredGoodsData.find((elem) => elem.id === id);

  //     if (!changedItemData) {
  //       return null;
  //     }

  //     return changedItemData;
  //   }, [filteredGoodsData, search]);

  return (
    <MainContainer>
      <GridElement>
        <ItemsList filters={filters} setFilters={setFilters} />
      </GridElement>
      <GridElement>
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
