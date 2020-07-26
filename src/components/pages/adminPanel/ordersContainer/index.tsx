import React, { useMemo, useState } from "react";
import qs from "qs";

import { MainContainer, GridElement } from "./styles";
import { useAsyncMemo } from "customHooks/useAsyncMemo";
import { ICompletedOrderData } from "utils/interfaces";
import firebase from "utils/firebase";
import { getOrders, IGetOrdersParams } from "axiosRequests/adminPanel";
import ItemsList from "./itemsList";
import OrderContainer from "./orderContainer";

const OrdersContainer = () => {
  const { search } = window.location;
  const [filters, setFilters] = useState<IGetOrdersParams>({});
  const [filtersForInputs, setFiltersForInputs] = useState<IGetOrdersParams>(
    {}
  );

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
    const { id } = qs.parse(search.slice(1));
    const { data } = ordersData;

    if (id) {
      const changedOrder = data.find((elem) => elem.id === id);

      if (changedOrder) {
        return changedOrder;
      }
    }
    return null;
  }, [ordersData, search]);

  return (
    <MainContainer>
      <GridElement>
        <ItemsList
          setFilters={setFilters}
          ordersData={ordersData.data}
          filtersForInputs={filtersForInputs}
          setFiltersForInputs={setFiltersForInputs}
          changedOrder={changedOrder}
        />
      </GridElement>
      <GridElement>
        {changedOrder ? (
          <OrderContainer changedOrder={changedOrder} />
        ) : (
          <div>выберите товар</div>
        )}
      </GridElement>
    </MainContainer>
  );
};

export default OrdersContainer;
