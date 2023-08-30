import { useDispatch } from "react-redux";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import Loading from "../components/loading";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  async function get() {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      if (token) {
        const dataUser = await api()
          .get("user/id-token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
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
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    get();
  }, []);
  return <>{isLoading ? <Loading /> : children}</>;
}
