import axios from "axios";
import qs from "qs";

export const getIdsForCategories = async (token: string | null) => {
  return axios
    .get("https://us-central1-naramel.cloudfunctions.net/idsForCategories", {
      headers: {
        Authorization: token,
      },
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err, "error");
    });
};

export const getIdsForFilters = async (token: string | null) => {
  return axios
    .get("https://us-central1-naramel.cloudfunctions.net/idsForFilters", {
      headers: {
        Authorization: token,
      },
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err, "error");
    });
};

interface IDeleteGoodsParams {
  goodsIds: string[];
}

export const deleteGoods = async (
  params: IDeleteGoodsParams,
  token: string | null
) => {
  return axios
    .get("https://us-central1-naramel.cloudfunctions.net/deleteGoods", {
      headers: {
        Authorization: token,
      },
      params,
    })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err, "error");
    });
};
