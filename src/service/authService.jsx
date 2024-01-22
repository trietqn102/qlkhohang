import { httpRequest } from "~/utils/httprequest";

export const login = async ({ data }) => {
  try {
    const res = await httpRequest.post(`auth/login`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getAll = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await httpRequest.get(`auth/get-all`, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const currentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await httpRequest.get(`auth/get-current`, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const addUser = async ({ data }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await httpRequest.post(`auth/register`, data, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const editUser = async ({ data }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await httpRequest.put(`auth/edit-user`, data, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
