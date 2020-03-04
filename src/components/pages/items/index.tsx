import React, { useState, useEffect } from "react";
import querystring from "qs";
import { useHistory } from "react-router-dom";

import Filter from "./filter";
import GoodsContainer from "./goodsContainer";
import { MainContainer } from "./styles";
import { getFilteredGoods } from "axiosRequests/goods";
import Spinner from "components/spinner";
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

export interface IFiltersData {
  [key: string]: IFiltersDataElement[];
}

export interface IFilterData {
  // groupId?: string;
  [key: string]: string[] | string;
}

const Items = () => {
  const [goods, setGoods] = useState<IGoodsElement[]>([]);
  const [allGoods, setAllGoods] = useState<IGoodsElement[]>([]);
  const [filterData, setFilterData] = useState<IFilterData>({});
  const [filtersData, setFiltersData] = useState<IFiltersData>({});
  const [isMountedComponent, setMountedComponent] = useState(false);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [isFetchingFilter, setFetchingFilter] = useState<boolean>(true);
  const { search } = window.location;
  const { groupId } = filterData;
  const history = useHistory();

  useEffect(() => {
    async function effectHandler() {
      setFetchingFilter(true);
      const goodsData = filterData.groupId
        ? await firebase
            .firestore()
            .collection("goods")
            .where("groupId", "==", filterData.groupId)
            .get()
        : await firebase
            .firestore()
            .collection("goods")
            .get();
      const unpackedGoodsData: any = goodsData.docs.map(item => item.data());
      setAllGoods(unpackedGoodsData);
      setFetchingFilter(false);
    }

    effectHandler();
  }, [groupId]);

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
      const stringifyParams = querystring.stringify(filterData);
      history.push({ pathname: "/items", search: `${stringifyParams}` });
      const result = await getFilteredGoods(filterData);
      setGoods(result);
      setFetching(false);
    }

    if (isMountedComponent) {
      setFetching(true);
      effectHandler();
    }
  }, [filterData]);

  useEffect(() => {
    setFiltersData(counterGoodsForFilter(allGoods));
  }, [allGoods]);

  if (isFetching) {
    return <Spinner />;
  }

  const onChangeFilterHandler = (filterKey: string, value: string) => {
    const filterDataClone = { ...filterData };
    const filterElement = filterDataClone[filterKey];
    if (filterElement) {
      const valueIndex = filterElement.indexOf(value);
      if (Array.isArray(filterElement)) {
        if (valueIndex !== -1) {
          filterElement.splice(valueIndex, 1);
        } else {
          filterElement.push(value);
        }
      }
    } else {
      filterDataClone[filterKey] = [value];
    }
    setFilterData(filterDataClone);
  };

  return (
    <MainContainer>
      <Filter
        filtersData={filtersData}
        isFetchingFilter={isFetchingFilter}
        filterData={filterData}
        onChangeFilterHandler={onChangeFilterHandler}
      />
      <GoodsContainer goods={goods} />
    </MainContainer>
  );
};

export default Items;
