import axiosClient from "./axiosClient";

export const productApi = {
  getAll(params) {
    const url = "/products";
    axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/products/${id}`;
    axiosClient.get(url);
  },
  add(data) {
    const url = "/products";
    axiosClient.post(url, data);
  },
  update(data) {
    const url = `/products/${data.id}`;
    axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `/products/${id}`;
    axiosClient.delete(url);
  },
};
