import axios from "axios";
const headers = {
  ["x-secret-key"]: "sahabatsembako",
};
const token = JSON.parse(localStorage.getItem("auth"));
if (token) {
  headers.Authorization = `Bearer ${token}`;
}
export const api = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:2000",
=======
  baseURL: "http://localhost:2000/",
>>>>>>> develop
  headers: headers,
});
