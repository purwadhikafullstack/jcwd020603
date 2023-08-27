import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useDispatch } from "react-redux";

export const useFetchCart = () => {
  const nearestBranch = JSON.parse(localStorage.getItem("nearestBranch"));
  const dispatch = useDispatch();
  const [countAll, setCountAll] = useState("");

  const fetch = async (nearestBranch) => {
    try {
      const res = await api().get("/cart", {
        params: { branch_id: nearestBranch },
      });
      setCountAll(res.data.total);
      dispatch({
        type: "cart",
        payload: { total: res.data.total },
      });
      console.log("tot", res.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch(nearestBranch);
  }, []);
  return { countAll, fetch };
};
