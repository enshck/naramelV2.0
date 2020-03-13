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

export interface IOrderElement {
  count: number;
  goodsData: IGoodsData;
}

export interface IProfile {
  email: string;
  displayName: string;
  uid: string;
  phoneNumber: string;
}

export interface ISuccessOrders {
  orders: IOrderElement[];
  status: string;
  userName: string;
  summaryOrder: number;
  date: any;
  id: string;
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

export interface IRootState {
  goods: IGoodsData[];
  sortType: string;
  orders: IOrderElement[];
  adminOrders: ISuccessOrders[];
  isOpenBasketModal: boolean;
  profile: IProfile;
  isAdmin: boolean;
  isAuth: boolean;
  menuCategory: ICategory[];
  filters: IFilter[];
}
