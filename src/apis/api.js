import axios from "axios";
import { config } from "../configs";
import { getAccessToken } from "../utils";

export const axiosInstance = async (queryParams, headers = {}) => {
  const accessToken = await getAccessToken();
  return axios.create({
    baseURL: `${config.apiUrl}/api`,
    headers: {
      "x-access-token": config.xAccessToken,
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
    params: queryParams,
  });
};
