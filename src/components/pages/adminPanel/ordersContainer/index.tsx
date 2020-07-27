import React, { useMemo, useState } from "react";
import qs from "qs";

import { MainContainer, GridElement, EmptyEditOrdersContainer } from "./styles";
import { ICompletedOrderData } from "utils/interfaces";
import firebase from "utils/firebase";
import { getOrders, IGetOrdersParams } from "axiosRequests/adminPanel";
import ItemsList from "./itemsList";
import OrderContainer from "./orderContainer";

const OrdersContainer = () => {
  const { search } = window.location;
  const [filters, setFilters] = useState<IGetOrdersParams>({});
  const [ordersData, setOrdersData] = useState<ICompletedOrderData[]>([]);
  const [isFetching, setFetching] = useState(false);
  const [filtersForInputs, setFiltersForInputs] = useState<IGetOrdersParams>(
    {}
  );

  const updateOrdersData = async () => {
    const token = (await firebase.auth().currentUser?.getIdTokenResult())
      ?.token;

    if (token) {
      try {
        const data = await getOrders(filters, token);
        setOrdersData(data);
      } catch (err) {
        console.log(err, "error");
      }
    }
  };

  useMemo(() => {
    setFetching(true);
    updateOrdersData();
    setFetching(false);
  }, [filters]);

  const changedOrder = useMemo(() => {
    const { id } = qs.parse(search.slice(1));

    if (id) {
      const changedOrder = ordersData.find((elem) => elem.id === id);

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
          ordersData={ordersData}
          filtersForInputs={filtersForInputs}
          setFiltersForInputs={setFiltersForInputs}
          changedOrder={changedOrder}
        />
      </GridElement>
      <GridElement>
        {changedOrder ? (
          <OrderContainer
            changedOrder={changedOrder}
            updateOrdersData={updateOrdersData}
            isFetching={isFetching}
            setFetching={setFetching}
          />
        ) : (
          <EmptyEditOrdersContainer>Выберите заказ</EmptyEditOrdersContainer>
        )}
      </GridElement>
    </MainContainer>
  );
};

export default OrdersContainer;
