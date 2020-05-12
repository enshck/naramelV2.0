import { combineReducers } from "redux";

import types from "./types";

const goodsReducers = (state = [], action: any) => {
  switch (action.type) {
    case types.SET_GOODS_LIST: {
      return action.goodsList;
    }
    default:
      return state;
  }
};

const sortTypeReducers = (state = "list", action: any) => {
  switch (action.type) {
    case types.SET_SORT_GOODS: {
      return action.sortType;
    }
    default:
      return state;
  }
};

const ordersReducers = (state = [], action: any) => {
  switch (action.type) {
    case types.SET_ORDERS: {
      return action.orders || [];
    }
    default:
      return state;
  }
};

const profileReducers = (state = {}, action: any) => {
  switch (action.type) {
    case types.SET_PROFILE: {
      return action.profile;
    }
    default:
      return state;
  }
};

const isLoggedUserReducers = (state = false, action: any) => {
  switch (action.type) {
    case types.SET_IS_LOGGED: {
      return action.isLogged;
    }
    default:
      return state;
  }
};

const menuCategoryReducers = (state = [], action: any) => {
  switch (action.type) {
    case types.SET_MENU_CATEGORY: {
      return action.menuCategory;
    }
    default:
      return state;
  }
};

const filtersReducers = (state = [], action: any) => {
  switch (action.type) {
    case types.SET_FILTERS: {
      return action.filters;
    }
    default:
      return state;
  }
};

const openedModalReducers = (state = "", action: any) => {
  switch (action.type) {
    case types.SET_OPENED_MODAL: {
      return action.openedModal;
    }
    default:
      return state;
  }
};

export const reducers = combineReducers({
  goods: goodsReducers,
  sortType: sortTypeReducers,
  orders: ordersReducers,
  openedModal: openedModalReducers,
  profile: profileReducers,
  isLogged: isLoggedUserReducers,
  menuCategory: menuCategoryReducers,
  filters: filtersReducers,
});
