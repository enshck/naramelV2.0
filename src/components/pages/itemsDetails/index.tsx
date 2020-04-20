import React, { useMemo } from "react";
import styled from "styled-components";

import { IProfile } from "utils/interfaces";
import firebase from "utils/firebase";
import { useAsyncMemo } from "customHooks/useAsyncMemo";
import { IGoodsElement } from "components/pages/items";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  const { match } = props;
  const { id } = match.params;
  const [itemData] = useAsyncMemo<IGoodsElement>(
    () => {
      return firebase
        .firestore()
        .collection("goods")
        .where("id", "==", id)
        .get()
        .then((result) => result.docs[0].data());
    },
    [id],
    {
      brand: "",
      description: "",
      groupId: "",
      id: "",
      name: "",
      subName: "",
      filters: {},
      subGoods: [],
    }
  );
  // const {} = itemData.data;

  // const [itemData, setItemData] = useState<IGoodsElement>({});
  // const [getItemData, itemData] = useGetFirebaseData();
  // const itemData = useMemo(async () => {
  //   const getItemDataHandler = async () => {
  //     const result = await firebase
  //       .firestore()
  //       .collection("goods")
  //       .where("id", "==", id)
  //       .get();
  //     const data = await result.docs.map((elem) => elem.data());
  //     return data;
  //   };
  //   // console.log(await getItemDataHandler(), ">>>");
  //   const result = await firebase
  //     .firestore()
  //     .collection("goods")
  //     .where("id", "==", id)
  //     .get();

  //   // return await result;
  //   if (result.docs.length > 0) {
  //     return result.docs[0].data();
  //   } else {
  //     return [];
  //   }

  //   // console.log(data, ">>>");
  //   // return data;
  // }, [id]);
  // const dat = await itemData;

  console.log(itemData.data, ">>");

  // itemData.then(result => console.log(result))

  // if(!itemData.called) {
  //   getItemData({
  //     collection:
  //   })
  // }

  // console.log(itemData, ">>>");

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
      detail Items {id}
      {/* <ButtonBack to={"/items"}>
        <img src={ArrowBack} alt={"back"} />
      </ButtonBack>
      <Header mode={"singleItem"} />
      <ItemsDetailContainer changedProduct={changedProduct} /> */}
    </MainContainer>
  );
};

export default ItemsDetail;
