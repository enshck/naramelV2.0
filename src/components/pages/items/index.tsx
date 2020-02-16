import React from "react";
import styled from "styled-components";

import { useGetFirebaseData } from "../../../customHooks/useGetFirebaseData";

const ItemsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
`;

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
    <ItemsContainer>
      Items
      {/* <Header mode={"items"} />
      <GoodsContainer /> */}
    </ItemsContainer>
  );
};

export default Items;
