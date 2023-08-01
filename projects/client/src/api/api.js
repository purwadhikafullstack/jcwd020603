import axios from "axios";
const headers = {
  ["x-secret-key"]: "sahabatsembako",
};
const token = JSON.parse(localStorage.getItem("auth"));
if (token) {
  headers.Authorization = `Bearer ${token}`;
}
export const api = axios.create({
  baseURL: "http://localhost:2000",
  headers: headers,
});
