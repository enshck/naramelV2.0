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

export interface IGoodsReducers {
  goods: IGoodsData[];
}

export interface ISortTypeReducers {
  sortType: string;
}

export interface IOrdersReducers {
  orders: IOrderElement[];
}

export interface IAdminOrdersReducers {
  adminOrders: ISuccessOrders[];
}

export interface IIsOpenBasketModalReducers {
  isOpenBasketModal: boolean;
}

export interface IErrorsObject {
  [key: string]: string;
}

export interface IProfileReducers {
  profile: IProfile;
}

export interface IIsAdminReducers {
  isAdmin: boolean;
}

export interface IIsAuthReducers {
  isAuth: boolean;
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

export interface ICategoryReducers {
  menuCategory: ICategory[];
}
