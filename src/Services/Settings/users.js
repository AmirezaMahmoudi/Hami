import httpService from "../httpService";

export const getUsersList = () => {
  return httpService("/getusers", "GET");
};

export const deleteUser = (id) => {
  return httpService(`/deluser?id=${id}`, "GET");
};

export const getUserInfo = (id) => {
  return httpService(`/getuser?id=${id}`, "GET");
};


export const addUser = (data) => {
  return httpService("/adduser", "POST" , data);
};

export const editUser = (data) => {
  return httpService("/setuser", "PUT" , data);
};