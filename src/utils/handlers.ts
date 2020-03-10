import firebase from "./firebase";
import {
  IErrorsObject,
  IOrderElement,
  IGoodsData,
  IProfile,
  IGoodsDataValidation,
  ISuccessOrders
} from "./interfaces";
import { IFiltersDataElement, IGoodsElement } from "components/pages/items";

export const signOutHandler = () => {
  firebase
    .auth()
    .signOut()
    .then(res => {})
    .catch(error => {
      console.log(error);
    });
};

export const getOrders = (
  userId: string,
  setOrdersHandler: (data: any) => void,
  setFetching?: (status: boolean) => void
) => {
  firebase
    .firestore()
    .collection("orders")
    .doc(userId)
    .get()
    .then(elem => {
      setOrdersHandler(elem.data());
      setFetching && setFetching(false);
    });
};

export const getSuccessOrders = async ({
  handler
}: {
  handler: (data: ISuccessOrders[]) => void;
}) => {
  const collection = await firebase
    .firestore()
    .collection("successOrders")
    .get();
  const data: any = collection.docs.map(elem => elem.data());
  handler(data);
};

export const buyButtonHandler = ({
  orders,
  singleGood,
  profile,
  setOrders,
  setOpenBasketModal
}: {
  orders: IOrderElement[];
  singleGood: IGoodsData;
  profile: IProfile;
  setOrders: (orders: IOrderElement[]) => void;
  setOpenBasketModal: (status: boolean) => void;
}) => {
  const isCreated = orders.some(
    elem => elem.goodsData.goodId === singleGood.goodId
  );

  if (isCreated) {
    orders.forEach((elem, item) => {
      const { goodsData } = elem;
      if (goodsData.goodId === singleGood.goodId) {
        orders[item].count++;
      }
    });
  } else {
    orders.push({
      count: 1,
      goodsData: singleGood
    });
  }

  firebase
    .firestore()
    .collection("orders")
    .doc(profile.uid)
    .set({
      ordersData: orders
    })
    .then(result => {
      getOrders(profile.uid, setOrders);
      setOpenBasketModal(true);
    })
    .catch(err => console.log(err));
};

export const recalculationSummaryOrder = ({
  changedOrder
}: {
  changedOrder: ISuccessOrders;
}) => {
  const { orders } = changedOrder;
  let sum: number = 0;
  orders.forEach(({ count, goodsData }: IOrderElement) => {
    sum = sum + +goodsData.price * count;
  });

  return +sum.toFixed(2);
};

export const createProductValidation = (form: IGoodsDataValidation) => {
  const { goodName, parametrs, pictureUrl, price } = form;
  const { internalMem, ram, sizeScreen, weight } = parametrs;
  const errors: IErrorsObject = {};

  if (!goodName || goodName.length < 1 || goodName.length > 20) {
    errors.goodName = "Ошибка. Имя должно содержать от 1 до 20 символов";
  }

  if (!pictureUrl || pictureUrl.length < 1) {
    errors.pictureUrl = "Вы не загрузили фотографию";
  }

  if (!price || price.length > 9 || price.length < 1) {
    errors.price = "Ошибка. Цена не указана или слишком велика";
  }

  if (!internalMem || internalMem.length < 1 || internalMem.length > 5) {
    errors.internalMem = "Ошибка. Длина поля от 1 до 5 символов";
  }

  if (!ram || ram.length < 1 || ram.length > 5) {
    errors.ram = "Ошибка. Длина поля от 1 до 5 символов";
  }

  if (!sizeScreen || sizeScreen.length < 1 || sizeScreen.length > 5) {
    errors.sizeScreen = "Ошибка. Длина поля от 1 до 5 символов";
  }

  if (!weight || weight.length < 1 || weight.length > 5) {
    errors.weight = "Ошибка. Длина поля от 1 до 5 символов";
  }

  return errors;
};

export const counterGoodsForFilter = (goodsData: IGoodsElement[]) => {
  const filterData: { [key: string]: IFiltersDataElement[] } = {};

  goodsData.forEach((goodsItem: IGoodsElement) => {
    const { filters } = goodsItem;

    Object.keys(filters).forEach((filterKey: string) => {
      const countedValue: IFiltersDataElement[] = Array.isArray(
        filters[filterKey]
      )
        ? filters[filterKey].map((elem: string) => ({
            value: elem,
            count: 1
          }))
        : [
            {
              value: filters[filterKey],
              count: 1
            }
          ];
      if (!filterData[filterKey]) {
        filterData[filterKey] = countedValue;
      } else {
        filterData[filterKey].forEach(elem => {
          countedValue.forEach(countedValueElem => {
            if (elem.value === countedValueElem.value) {
              elem.count = elem.count + countedValueElem.count;
            } else {
              filterData[filterKey].push(countedValueElem);
            }
          });
        });
      }
    });
  });

  return filterData;
};

export const debounce = (delay: number) => {
  let debounceTimer: any;
  return (onClickHandler: (...args: any[]) => void) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout((...args) => onClickHandler(...args), delay);
  };
};
