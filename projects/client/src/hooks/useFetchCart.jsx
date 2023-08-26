import { useEffect, useState } from "react";
import { api } from "../api/api";

export const useFetchCart = () => {
  const nearestBranch = JSON.parse(localStorage.getItem("nearestBranch"));
  const [countAll, setCountAll] = useState("");

  const fetch = async () => {
    try {
      const res = await api().get("/cart", {
        params: { branch_id: nearestBranch },
      });
      setCountAll(res.data.total);
      // console.log("tot", res.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return { countAll, fetch };
};
