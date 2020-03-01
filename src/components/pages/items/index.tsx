import React, { useState, useEffect } from "react";
import querystring from "querystring";

import Filter from "./filter";
import GoodsContainer from "./goodsContainer";
import { MainContainer } from "./styles";
import { getFilteredGoods } from "axiosRequests/goods";
import Spinner from "components/spinner";

interface ISubGoodsElement {
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

const Items = () => {
  const [goods, setGoods] = useState<IGoodsElement[]>([]);
  const [filterData, setFilterData] = useState<{ [key: string]: string } | {}>(
    {}
  );
  const [isMountedComponent, setMountedComponent] = useState(false);
  const [isFetching, setFetching] = useState<boolean>(true);
  const { search } = window.location;

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
