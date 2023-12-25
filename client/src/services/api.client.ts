import axios, { AxiosRequestConfig } from "axios";
import { Filters } from "../components/Records";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000/api/v1",
});

class APIClient {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAllRecords = (
    filters?: string[],
    queries?: Filters,
    config?: AxiosRequestConfig
  ) => {
    var queryStr = "";
    filters?.forEach((filter, i) => {
      queryStr += `col${i}=${filter}&`;
    });
    const filterArr = Object.entries(queries!);
    filterArr.forEach((filter, i) => {
      if (filter[1]) queryStr += `${filter[0]}=${filter[1]}&`;
    });
    if (queryStr)
      return axiosInstance
        .get(`${this.endpoint}?${queryStr}`, config)
        .then((res) => res.data);

    return axiosInstance
      .get(`${this.endpoint}`, config)
      .then((res) => res.data);
  };
  getRecords = (
    page: number,
    sortBy?: string,
    sortOrder?: string,
    filters?: Filters
  ) => {
    const filterArr = Object.entries(filters!);
    var filterStr = "";
    filterArr.forEach((filter, i) => {
      if (filter[1]) filterStr += `&${filter[0]}=${filter[1]}`;
    });

    return axiosInstance
      .get(
        `${this.endpoint}/${page}?sortBy=${sortBy}&sortOrder=${sortOrder}${filterStr}`
      )
      .then((res) => res.data);
  };
  getColumns = (isDistinct?: boolean) => {
    if (isDistinct)
      return axiosInstance
        .get(`${this.endpoint}?distinctValues=true`)
        .then((res) => res.data);
    return axiosInstance.get(`${this.endpoint}`).then((res) => res.data);
  };
}
export default APIClient;
