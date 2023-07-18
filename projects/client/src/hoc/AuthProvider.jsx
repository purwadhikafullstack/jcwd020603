import { useDispatch } from "react-redux";
import { api } from "../api/api";
import { useEffect } from "react";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  async function get() {
    try {
      const token = JSON.parse(localStorage.setItem("auth"));
      if (token) {
        const dataUser = await api
          .get("user/id-token", { params: { token } })
          .then((res) => res.data);
        if (dataUser) {
          dispatch({
            type: "login",
            payload: dataUser,
          });
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    get();
  }, []);
  return <>{children}</>;
}
