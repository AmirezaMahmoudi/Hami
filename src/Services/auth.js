import httpService from "./httpService";

export const getUserService = (data) => {
  return httpService("/CheckLogin", "GET");
};

export const logoutService = (data) => {
  return httpService("/logout", "GET");
};

