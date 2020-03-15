import React, { useState, useEffect, useCallback } from "react";
import querystring from "qs";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import Filter from "./filter";
import GoodsContainer from "./goodsContainer";
import { MainContainer } from "./styles";
import { getFilteredGoods } from "axiosRequests/goods";
import Spinner from "components/spinner";
import { counterGoodsForFilter, debounce, itemHandler } from "utils/handlers";
import firebase from "utils/firebase";
import { IOrderData } from "utils/interfaces";
import { useSelector } from "customHooks/useSelector";
import { setOrdersData } from "store/actions";

export interface ICommonGoodsElement {
  brand: string;
  description: string;
  groupId: string;
  id: string;
  name: string;
  subName: string;
  filters: {
    [key: string]: any;
  };
}

export interface ISubGoodsElement {
  elementValue: {
    type: string;
    value: string;
  };
  image: string;
  price: number;
}

export interface IGoodsElement extends ICommonGoodsElement {
  subGoods: ISubGoodsElement[];
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
  const ordersData = useSelector(state => state.orders);
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
  const onInputPriceDebounceHandler = useCallback(debounce(1000), []);
  const { search } = window.location;
  const { groupId } = filterData;
  const history = useHistory();
  const dispatch = useDispatch();

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

  const onInputPrice = (value: string, name: string) => {
    const newFilterData = {
      ...minAndMaxPrice,
      [name]: value
    };
    setMinAndMaxPrice(newFilterData);

    onInputPriceDebounceHandler(() => {
      setFilterData({
        ...filterData,
        price: [`${newFilterData.min}`, `${newFilterData.max}`]
      });
    });
  };

  const buyButtonHandler = (item: IOrderData) => {
    itemHandler({
      ordersData: ordersData.length > 0 ? ordersData : null,
      item: item,
      setDataToStateHandler: newData => dispatch(setOrdersData(newData))
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
      <GoodsContainer goods={goods} buyButtonHandler={buyButtonHandler} />
    </MainContainer>
  );
};

export default Items;
