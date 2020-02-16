import React from "react";
import styled from "styled-components";

import { IProfile } from "../../../utils/interfaces";

const MainContainer = styled.div``;

interface IProps {
  profile: IProfile;
}

const AdminPanel = (props: IProps) => {
  // const { profile } = props;
  // const [changedMode, setChangedMode] = useState("orders");
  // const [getAdminOrdersData, adminOrdersData] = useGetFirebaseData();
  // const [getGoodsData, goodsData] = useGetFirebaseData();
  // const [getOrders, ordersData] = useGetFirebaseData();
  // const dispatch = useDispatch();

  // if (!adminOrdersData.called) {
  //   getAdminOrdersData({
  //     collection: "successOrders",
  //     actionHandler: orders => dispatch(setAdminOrders(orders))
  //   });
  // }

  // if (!goodsData.called) {
  //   getGoodsData({
  //     collection: "goods",
  //     actionHandler: goods => dispatch(setGoodsList(goods))
  //   });
  // }

  // if (!ordersData.called && profile) {
  //   getOrders({
  //     collection: "orders",
  //     singleDoc: profile.uid,
  //     actionHandler: orders => dispatch(setOrders(orders))
  //   });
  // }

  return (
    <MainContainer>
      admin panel
      {/* <ButtonBack to={"/items"}>
        <img src={ArrowBack} alt={"back"} />
      </ButtonBack>
      <Header mode={"adminPanel"} />
      <AdminContainer
        changedMode={changedMode}
        setChangedMode={setChangedMode}
      /> */}
    </MainContainer>
  );
};

export default AdminPanel;
