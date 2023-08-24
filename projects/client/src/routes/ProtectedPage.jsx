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
  console.log(!user.role);

  useEffect(() => {
    if (loading) return; // Wait until loading is done

    if (guestOnly && user.role) {
      return nav("/");
    } else if (needLogin && !user.role) {
      return nav("/");
    } else if (adminOnly && (!user.role || (user.role !== "ADMIN" && user.role !== "SUPER ADMIN"))) {
      return nav("/");
    }
  }, [loading, user.role, guestOnly, needLogin, adminOnly, nav]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [userSelector]);

  useEffect(() => {
    // When loading is done, check the access restrictions
    if (!loading) {
      // Handle unauthorized access based on role
      if (guestOnly && user.role) {
        nav("/");
      } else if (needLogin && !user.role) {
        nav("/");
      } else if (adminOnly && (!user.role || (user.role !== "ADMIN" && user.role !== "SUPER ADMIN"))) {
        nav("/");
      }
    }
  }, [loading, user.role, guestOnly, needLogin, adminOnly, nav]);

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
