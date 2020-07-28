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

export const getRedirectButton = (data: any) =>
  axios({
    url: "http://localhost:5001/naramel/us-central1/getPageOfPayment",
    method: "post",
    params: {
      public_key: "sandbox_i42722830834",
    },
    data: data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
