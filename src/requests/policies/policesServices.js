import { axiosPost, axiosGet, axiosPatch, axiosDelete } from "../http";

export const getAllPolicies = (page = 1, limit = 10, filters = {}) => {
  console.log(filters, "filters");
  const queryParams = new URLSearchParams({
    page,
    limit,
    ...filters,
  }).toString();

  return axiosGet(`/policy?${queryParams}`);
};

export const getPolicy = (id) => axiosGet(`/policy/${id}`);
export const addPolicy = (data) => axiosPost("/policy", data);
export const updatePolicy = (id, data) => axiosPatch(`/policy/${id}`, data);
export const deletePolicy = (id) => axiosDelete(`/policy/${id}`);
