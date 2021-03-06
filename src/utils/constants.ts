export const orderStatus: { [key: string]: string } = {
  ordered: "Заказано",
  accepted: "Принято",
  payed: "Оплачено",
  delivered: "Доставлено",
  cancelled: "Отмененно",
};

export const colors: { [key: string]: string } = {
  white: "#fff",
  black: "#000",
  blue: "#2196f3",
  red: "#f44336",
  "deep-orange": "#ff9800",
  green: "#4caf50",
};

export const initialFilterValue = {
  type: "z3Auiup4fZQdpnc8LJ8U",
  value: "100",
};

export const initialItemData = {
  brand: "Naramel",
  description: "",
  groupId: "",
  id: "",
  name: "",
  subName: "",
  subGoods: [
    {
      elementValue: initialFilterValue,
      images: [],
      price: 0,
    },
  ],
  filters: {
    brand: "Naramel",
    [initialFilterValue.type]: [initialFilterValue.value],
    price: "0",
  },
};
