import axios from "axios";

export function api() {
  console.log("ini envvv", process.env.REACT_APP_API_SECRET_KEY);
  const headers = {
    ["x-secret-key"]: "sahabatsembako",
  };
  const token = JSON.parse(localStorage.getItem("auth"));
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: headers,
  });
  return api;
}
