import httpService from "../httpService";

export const getInfo = () => {
  return httpService("/getinfo");
};

export const getUpTime = () => {
  return httpService("/uptime");
};

export const setInfo = (data) => {
  return httpService("/setinfo", "PUT", data);
};

export const addFiles = (data) => {
  return httpService("/files", "POST", data, {
    "Content-Type": "multipart/form-data",
  });
};

// device

export const resetDevice = (data) => {
  return httpService("/device", "POST", data);
};

export const checkDevice = () => {
  return httpService("/checkdevice");
};
