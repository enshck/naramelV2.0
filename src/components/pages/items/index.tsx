import React from "react";
import styled from "styled-components";

import { useGetFirebaseData } from "../../../customHooks/useGetFirebaseData";
import Filter from "./filter";
import GoodsContainer from "./goodsContainer";
import { MainContainer } from "./styles";

const Items = () => {
  const [getGoods, goodsData] = useGetFirebaseData();
  // const [getOrders, ordersData] = useGetFirebaseData();
  // const profile = useSelector<IProfileReducers, IProfile>(
  //   state => state.profile
  // );
  // const dispatch = useDispatch();

  if (!goodsData.called) {
    getGoods({
      collection: "category"
      // actionHandler: goods => dispatch(setGoodsList(goods))
    });
  }

  // console.log(
  //   goodsData.data.map((element: any) =>
  //     element.references.map((elem: any) =>
  //       elem.get().then(res => {
  //         console.log(res.data());
  //       })
  //     )
  //   )
  // );

  // if (!ordersData.called && profile.uid) {
  //   getOrders({
  //     collection: "orders",
  //     singleDoc: profile.uid,
  //     actionHandler: orders => dispatch(setOrders(orders))
  //   });

  // }

  return (
    <MainContainer>
      <Filter />
      <GoodsContainer />
      {/* <Header mode={"items"} />
      <GoodsContainer /> */}
    </MainContainer>
  );
};

export default Items;
