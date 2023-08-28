import { API } from "../baseUrl";

export const getStatisticUsers = async () => {
  try {
    const response = await API.get(`/api/v1/statistic/user`);
    return response;
  } catch (error) {}
};

export const getStatisticProducts = async () => {
  try {
    const response = await API.get(`/api/v1/statistic/product`);
    return response;
  } catch (error) {}
};

export const getStatisticSales = async () => {
  try {
    const response = await API.get(`/api/v1/statistic/sales`);
    return response;
  } catch (error) {}
};

export const getStatisticBills = async () => {
  try {
    const response = await API.get(`/api/v1/statistic/bill`);
    return response;
  } catch (error) {}
};

export const getStatisticTransaction = async () => {
  try {
    const response = await API.get(`/api/v1/bill/product/payed`);
    return response;
  } catch (error) {}
};

export const getStatisticTimeUSer = async () => {
  try {
    const response = await API.get(`/api/v1/statistic/user/day`);
    return response;
  } catch (error) {}
};

export const getStatisticSaleProduct = async () => {
  try {
    const response = await API.get(`/api/v1/statistic/bill/product/sales`);
    return response;
  } catch (error) {}
};

export const getStatisticSaleDate = async () => {
  try {
    const response = await API.get(`/api/v1/statistic/bill/day`);
    return response;
  } catch (error) {}
};

