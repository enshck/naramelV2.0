import React, { useMemo, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import qs from "qs";

import { MainContainer } from "./styles";
import { useAsyncMemo } from "customHooks/useAsyncMemo";
import { IOrderData } from "utils/interfaces";
import firebase from "utils/firebase";
import { getOrders, IGetOrdersParams } from "axiosRequests/adminPanel";

const OrdersContainer = () => {
  const history = useHistory();
  const { search } = history.location;
  const [filters, setFlters] = useState<IGetOrdersParams>({});

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

  // console.log(ordersData, "data");

  //   const changedItem = useMemo(() => {
  //     const { id } = qs.parse(search.slice(1));
  //     const changedItemData = filteredGoodsData.find((elem) => elem.id === id);

  //     if (!changedItemData) {
  //       return null;
  //     }

  //     return changedItemData;
  //   }, [filteredGoodsData, search]);

  return <MainContainer>ordersData</MainContainer>;
};

export default OrdersContainer;
