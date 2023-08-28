import axios from "axios";
const secret = process.env.secret;

export function api() {
  const headers = {
    ["x-secret-key"]: secret,
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
