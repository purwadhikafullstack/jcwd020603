import { Center, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/SVG/2.svg";

export default function ProtectedPage({
  children,
  needLogin,
  guestOnly,
  // adminOnly = false,
  userOnly,
}) {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  console.log(guestOnly);
  console.log(needLogin);
  useEffect(() => {
    console.log(userSelector);

    if (guestOnly && userSelector.role) {
      if (userSelector.role == "USER") {
        return nav("/");
      } else if (
        userSelector.role == "ADMIN" ||
        userSelector.role == "SUPER ADMIN"
      ) {
        return nav("");
      }
    } else if (
      userOnly &&
      guestOnly &&
      needLogin &&
      userSelector.role != "USER"
    ) {
      return nav("");
    } else {
      return nav("");
    }
  }, [userSelector]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [userSelector]);

  return (
    <>
      {loading ? (
        <Center
          h={"100vh"}
          w={"100%"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
        >
          <Image src={logo} w={"30%"} h={"30%"} />
        </Center>
      ) : (
        children
      )}
    </>
  );
}
