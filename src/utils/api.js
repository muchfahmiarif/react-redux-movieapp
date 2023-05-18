import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3"; // base url for all api calls
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN; // get token from .env file

const headers = {
  Authorization: `Bearer ${TMDB_TOKEN}`,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(`${BASE_URL}${url}`, {
      header: headers,
      params: params,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
