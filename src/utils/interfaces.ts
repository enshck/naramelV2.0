import { ICommonGoodsElement, ISubGoodsElement } from "components/pages/items";

import { StatusType } from "axiosRequests/adminPanel";

export interface IGoodsData {
  goodId: string;
  goodName: string;
  isSale: boolean;
  id?: string;
  parametrs: {
    color: string;
    internalMem: string;
    ram: string;
    sizeScreen: string;
    weight: string;
  };
  pictureUrl: string;
  price: string;
}

export interface IProfile {
  email: string;
  displayName: string;
  uid: string;
  phoneNumber: string;
}

export interface IErrorsObject {
  [key: string]: string;
}

export interface IGoodsDataValidation {
  goodId: string;
  goodName: string;
  isSale: boolean;
  id?: string;
  parametrs: {
    color: string;
    internalMem: string;
    ram: string;
    sizeScreen: string;
    weight: string;
  };
  pictureUrl: string;
  price: string;
}

export interface ISubCategory {
  id: string;
  name: string;
}

export interface ICategory {
  id: string;
  name: string;
  subCategories: ISubCategory[];
}

export interface IFilter {
  id: string;
  name: string;
  type: string;
  units: string;
}

export interface IFiltersReducers {
  filters: IFilter[];
}

export interface IOrderData extends ICommonGoodsElement, ISubGoodsElement {
  count?: number;
}

export interface IRootState {
  goods: IGoodsData[];
  sortType: string;
  orders: IOrderData[];
  openedModal: string | null;
  profile: IProfile;
  isLogged: boolean;
  menuCategory: ICategory[];
  filters: IFilter[];
}

export interface IItemInCompletedOrder {
  count: number;
  elementValue: {
    value: string;
    type: string;
  };
  id: string;
  images: string[];
  name: string;
}

export interface ICustomerData {
  city: string;
  name: string;
  patronymic: string;
  phone: string;
  warehouse: string;
}

export interface ICompletedOrderData {
  customerData: ICustomerData;
  date: string;
  id: string;
  ordersData: IItemInCompletedOrder[];
  status: StatusType;
}
