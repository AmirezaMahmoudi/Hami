import httpService from "../httpService";

export const netTools = (data) => {
  return httpService("/nettools", "POST", data);
};
