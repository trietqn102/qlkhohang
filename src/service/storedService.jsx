import { httpRequest } from "~/utils/httprequest";

export const getAll = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await httpRequest.get(`stored/get-stored`, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getStoredImport = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await httpRequest.get(`stored/get-stored-import`, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const postStored = async ({ data }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await httpRequest.post(`stored/post-stored`, data, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error.response;
  }
};

export const exportStored = async ({ data }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await httpRequest.put(`stored/export-stored`, data, {
      headers: { authorization: "Bearer " + token },
    });
    
    return res.data;
  } catch (error) {
    return error;
  }
};

export const editStored = async ({ id, data }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await httpRequest.put(`stored/edit-stored/${id}`, data, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const deleteStored = async ({ data }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await httpRequest.post(`stored/delete-stored`, data, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
