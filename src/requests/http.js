import axios from "axios";

const BaseURL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const axiosRequest = (method, url, params = {}, headers = {}) => {
  return axios({
    method,
    url: `${BaseURL}${url}`,
    ...params,
    headers: {
      ...headers,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

/* ------ Request POST ------ */
export const axiosPost = (url, data = {}, headers = {}) => {
  return axiosRequest("POST", url, { data }, headers);
};

/* ------ Request PUT ------ */
export const axiosPut = (url, data = {}, headers = {}) => {
  return axiosRequest("PUT", url, { data }, headers);
};

/* ------ Request PATCH ------ */
export const axiosPatch = (url, data = {}, headers = {}) => {
  return axiosRequest("PATCH", url, { data }, headers);
};

/* ------ Request GET ------ */
export const axiosGet = (url, params = {}, headers = {}) => {
  return axiosRequest("GET", url, { params }, headers);
};

/* ------ Request DELETE ------ */
export const axiosDelete = (url, params = {}, headers = {}) => {
  return axiosRequest("DELETE", url, { params }, headers);
};
