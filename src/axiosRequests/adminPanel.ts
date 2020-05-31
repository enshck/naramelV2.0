import axios from "axios";

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
