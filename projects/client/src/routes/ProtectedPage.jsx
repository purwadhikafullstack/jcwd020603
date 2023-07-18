import { Center, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/SVG/2.svg";

export default function ProtectedPage({
  children,
  needLogin = false,
  guestOnly = false,
  // adminOnly = false,
  userOnly = false,
}) {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(userSelector);

    if (needLogin) {
      return nav("/");
    } else if (guestOnly && userSelector.role) {
      if (userSelector.role == "USER") {
        return nav("/");
      } else if (
        userSelector.role == "ADMIN" ||
        userSelector.role == "SUPER ADMIN"
      ) {
        return nav("/dashboard");
      }
    } else if (userOnly && userSelector.role != "USER") {
      return nav("/dashboard");
    } else {
      return nav("/");
    }

    // else if (
    // userSelector.role == "ADMIN" ||
    // userSelector.role == "SUPER ADMIN"
    // ) {
    // return "/dashboard";
    // }

    // if (guestOnly && userSelector.role) {
    // if (userSelector.role == "ADMIN" || userSelector.role == "SUPER ADMIN") {
    // return nav("/dashboard");
    // } else if (userSelector.role == "USER") {
    // return nav("/");
    // }
    // } else if (userOnly && userSelector.role) {
    // if (userSelector.role == "USER") {
    // return nav("/");
    // } else if (
    // userSelector.role == "ADMIN" ||
    // userSelector.role == "SUPER ADMIN"
    // ) {
    // return nav("/dashboard");
    // }
    // } else if (needLogin && !userSelector.role) {
    // return nav("/");
    // } else if (!adminOnly && userSelector.role != "USER") {
    // return nav("/dashboard");
    // }
  }, []);

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
