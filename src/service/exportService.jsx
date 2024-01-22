import { httpRequest } from "~/utils/httprequest";

export const getAll = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await httpRequest.get(`export-stored/get-stored`, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const exportStored = async ({ data }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await httpRequest.put(`export-stored/export-stored`, data, {
      headers: { authorization: "Bearer " + token },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};