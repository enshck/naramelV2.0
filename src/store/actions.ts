import types from "./types";
import {
  IOrderData,
  IGoodsData,
  ICategory,
  IFilter,
  IProfile,
} from "utils/interfaces";

export const setSortGoods = (sortType: string) => ({
  type: types.SET_SORT_GOODS,
  sortType,
});

export const setGoodsList = (goodsList: IGoodsData[]) => ({
  type: types.SET_GOODS_LIST,
  goodsList,
});

export const setProfileData = (profile: IProfile | {}) => ({
  type: types.SET_PROFILE,
  profile,
});

export const setIsLogged = (isLogged: boolean) => ({
  type: types.SET_IS_LOGGED,
  isLogged,
});

export const setMenuItems = (menuCategory: ICategory[]) => ({
  type: types.SET_MENU_CATEGORY,
  menuCategory,
});

export const setFilters = (filters: IFilter[]) => ({
  type: types.SET_FILTERS,
  filters,
});

export const setOrdersData = (orders: IOrderData[]) => ({
  type: types.SET_ORDERS,
  orders,
});

export const setOpenedModal = (openedModal: string | null) => ({
  type: types.SET_OPENED_MODAL,
  openedModal,
});
