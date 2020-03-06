import React, { useState, useEffect, BaseSyntheticEvent } from "react";
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
  [key: string]: string[] | string;
}

export interface IMinAndMaxPrice {
  min: number;
  max: number;
}

const Items = () => {
  const [goods, setGoods] = useState<IGoodsElement[]>([]);
  const [allGoods, setAllGoods] = useState<IGoodsElement[]>([]);
  const [minAndMaxPrice, setMinAndMaxPrice] = useState<IMinAndMaxPrice>({
    min: 0,
    max: 0
  });
  const [filterData, setFilterData] = useState<IFilterData>({});
  const [filtersData, setFiltersData] = useState<IFiltersData>({});
  const [isMountedComponent, setMountedComponent] = useState(false);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [isFetchingFilter, setFetchingFilter] = useState<boolean>(true);
  const { search } = window.location;
  const { groupId } = filterData;
  const history = useHistory();

  useEffect(() => {
    setMountedComponent(true);
  }, []);

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
    if (search.length > 0) {
      const searchData = search.slice(1);
      const parsedQuery = querystring.parse(searchData);
      setFilterData(parsedQuery);
      if (parsedQuery.price) {
        setMinAndMaxPrice({
          min: parsedQuery.price[0],
          max: parsedQuery.price[1]
        });
      }
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
    const searchData = search.slice(1);
    const parsedQuery = querystring.parse(searchData);
    if (allGoods.length > 0 && !parsedQuery.price) {
      const allGoodsPrices = allGoods.map(elem => elem.filters.price);
      setMinAndMaxPrice({
        min: Math.min(...allGoodsPrices),
        max: Math.max(...allGoodsPrices)
      });
    }
    setFiltersData(counterGoodsForFilter(allGoods));
  }, [allGoods]);

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

  const onInputPrice = (e: BaseSyntheticEvent, name: string) => {
    const value = e.target.value;
    const newFilterData = {
      ...minAndMaxPrice,
      [name]: value
    };
    setMinAndMaxPrice(newFilterData);
    setFilterData({
      ...filterData,
      price: [`${newFilterData.min}`, `${newFilterData.max}`]
    });
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <MainContainer>
      <Filter
        filtersData={filtersData}
        isFetchingFilter={isFetchingFilter}
        filterData={filterData}
        onChangeFilterHandler={onChangeFilterHandler}
        minAndMaxPrice={minAndMaxPrice}
        onInputPrice={onInputPrice}
      />
      <GoodsContainer goods={goods} />
    </MainContainer>
  );
};

export default Items;
