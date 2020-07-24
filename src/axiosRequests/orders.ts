import axios from "axios";

export const getCities = (searchString: string) =>
  axios({
    url: "https://api.novaposhta.ua/v2.0/json/",
    method: "post",
    data: {
      apiKey: "5411d1169492e13a4642ef844f585cc3",
      modelName: "Address",
      calledMethod: "getCities",
      methodProperties: {
        FindByString: `${searchString}`,
      },
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });

export const getWarehouses = (ref: string) =>
  axios({
    url: "https://api.novaposhta.ua/v2.0/json/",
    method: "post",
    data: {
      apiKey: "5411d1169492e13a4642ef844f585cc3",
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        Language: "ru",
        CityRef: ref,
      },
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
