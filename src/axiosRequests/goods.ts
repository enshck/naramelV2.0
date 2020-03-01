import axios from "axios";

interface IParams {
  groupId?: string;
  brand?: string;
  price?: string;
  volume?: string;
}

export const getFilteredGoods = (params: IParams) =>
  axios
    .get("https://us-central1-naramel.cloudfunctions.net/filterGoodsData/", {
      params
    })
    .then(result => {
      return result.data;
    })
    .catch(err => {
      console.log(err, "error");
    });
