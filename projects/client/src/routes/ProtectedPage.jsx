import { Center, Image, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/SVG/2.svg";

export default function ProtectedPage({
  children,
  guestOnly,
  needLogin,
  adminOnly,
}) {
  let userSelector = useSelector((state) => state.auth);
  const user = userSelector;
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  console.log(guestOnly);
  console.log(needLogin);
  console.log(adminOnly);
  console.log(userSelector);
  console.log(userSelector.role);
  console.log(user.role);

  useEffect(() => {
    if (guestOnly && user.role) {
      if (user.role == "USER") {
        return nav("/");
      } else {
        return nav("/dashboard");
      }
    } else if (needLogin && !user.role) {
      return nav("/");
    } else if (
      needLogin &&
      adminOnly &&
      (user.role != "ADMIN" || user.role != "SUPER ADMIN")
    ) {
      return nav("/");
    }
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
          maxW={"100vw"}
          w={"100%"}
          display={"flex"}
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex w={"30%"} h={"30%"} justifyContent={"center"} p={4}>
            <Image src={logo} />
          </Flex>
        </Center>
      ) : (
        children
      )}
    </>
  );
}
