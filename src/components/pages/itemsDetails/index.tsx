import React from "react";
import styled from "styled-components";

import { IProfile } from "../../../utils/interfaces";

const MainContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
`;

interface IProps {
  match: {
    params: {
      id: string;
    };
  };
  profile: IProfile;
}

const ItemsDetail = (props: IProps) => {
  // const { match, profile } = props;
  // const [changedProduct, changeProduct] = useState<any>({
  //   parametrs: {}
  // });
  // const [getGoods, goodsData] = useGetFirebaseData();
  // const [getOrders, ordersData] = useGetFirebaseData();
  // const dispatch = useDispatch();
  // const goods = useSelector<IGoodsReducers, IGoodsData[]>(state => state.goods);

  // if (!goodsData.called) {
  //   getGoods({
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

  // useEffect(() => {
  //   goods.forEach((elem: { goodId: string }) => {
  //     const { goodId } = elem;

  //     goodId === match.params.id && changeProduct(elem);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [goods]);

  return (
    <MainContainer>
      detail Items
      {/* <ButtonBack to={"/items"}>
        <img src={ArrowBack} alt={"back"} />
      </ButtonBack>
      <Header mode={"singleItem"} />
      <ItemsDetailContainer changedProduct={changedProduct} /> */}
    </MainContainer>
  );
};

export default ItemsDetail;
