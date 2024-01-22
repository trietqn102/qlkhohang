import axios from "axios";

export const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
