import httpService from "./httpService";

export const getTimeService = (data) => {
  return httpService("/gettime", "GET");
};