import React, { useState, useEffect } from "react";
import querystring from "querystring";

import Filter from "./filter";
import GoodsContainer from "./goodsContainer";
import { MainContainer } from "./styles";
import { getFilteredGoods } from "axiosRequests/goods";
import Spinner from "components/spinner";
import { useGetFirebaseData } from "customHooks/useGetFirebaseData";
import { counterGoodsForFilter } from "utils/handlers";
import firebase from "utils/firebase";

export interface ISubGoodsElement {
  elementValue: {
    type: string;
    value: string;
  };
  image: string;
  price: number;
}

export interface IGoodsElement {
  brand: string;
  description: string;
  groupId: string;
  id: string;
  name: string;
  subName: string;
  subGoods: ISubGoodsElement[];
  filters: {
    [key: string]: any;
  };
}

export interface IFiltersDataElement {
  value: string;
  count: number;
}

interface IFiltersData {
  [key: string]: IFiltersDataElement[];
}

interface IFilterData {
  groupId?: string;
}

const Items = () => {
  const [goods, setGoods] = useState<IGoodsElement[]>([]);
  const [allGoods, setAllGoods] = useState<IGoodsElement[]>([]);
  const [filterData, setFilterData] = useState<IFilterData>({});
  const [filtersData, setFiltersData] = useState<IFiltersData>({});
  const [isMountedComponent, setMountedComponent] = useState(false);
  const [isFetching, setFetching] = useState<boolean>(true);
  const { search } = window.location;

  // if (!allGoodsData.called) {
  //   getAllGoods({
  //     collection: "goods"
  //   });
  // }

  // async function effectHandler() {

  //   const goodsData = filterData.groupId
  //     ? await firebase
  //         .firestore()
  //         .collection("goods")
  //         .where("groupId", "==", filterData.groupId)
  //         .get()
  //     : await firebase
  //         .firestore()
  //         .collection("goods")
  //         .get();
  //   const unpackedGoodsData: any = goodsData.docs.map(item => item.data())
  //   setAllGoods(unpackedGoodsData);
  // }

  useEffect(() => {
    setMountedComponent(true);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      const searchData = search.slice(1);
      const parsedQuery = querystring.parse(searchData);
      setFilterData(parsedQuery);
    } else {
      setFilterData({});
    }
  }, [search]);

  useEffect(() => {
    async function effectHandler() {
      const result = await getFilteredGoods(filterData);
      setGoods(result);
      setFetching(false);
    }

    if (isMountedComponent) {
      setFetching(true);
      effectHandler();
    }
  }, [filterData]);

  // useEffect(() => {
  //   if (data.length > 0) {
  //     console.log(counterGoodsForFilter(data), ">>.");
  //     // console.log(filterData, "><<<><<>");
  //   }
  // }, [data]);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <MainContainer>
      <Filter />
      <GoodsContainer goods={goods} />
    </MainContainer>
  );
};

export default Items;
