import { Center, Image, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/SVG/2.svg";
import Loading from "../components/loading";

export default function ProtectedPage({
  children,
  guestOnly = false,
  needLogin = false,
  adminOnly = false,
  userOnly = false,
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
    // If the user is not logged in and needs login, redirect to "/"
    if (needLogin && !user.role) {
      return nav("/login");
    }

    // If the user is a guest and guestOnly is true, redirect to "/"
    if (guestOnly && user.role === "USER") {
      return nav("/");
    }

    // If the user is not logged in and trying to access /dashboard, redirect to "/"
    if (!user.role && window.location.pathname === "/dashboard") {
      return nav("/login");
    }

    // If the user is not an admin but adminOnly is required, or if the user role is not ADMIN or SUPER ADMIN
    if (adminOnly && user.role !== "ADMIN" && user.role !== "SUPER ADMIN") {
      return nav("/");
    }
    if (userOnly && user.role !== "USER") {
      return nav("/dashboard");
    }
    // If the user role is USER, redirect to "/"
    if (user.role === "USER" && window.location.pathname === "/dashboard") {
      return nav("/");
    }

    // If the user role is ADMIN or SUPER ADMIN, redirect to "/dashboard"
    if (
      (user.role === "ADMIN" || user.role === "SUPER ADMIN") &&
      window.location.pathname === "/"
    ) {
      return nav("/dashboard");
    }

    // Redirect user based on their role
    // if (user.role === "USER") {
    //   nav("/");
    // } else if (user.role === "ADMIN" || user.role === "SUPER ADMIN") {
    //   nav("/dashboard");
    // }
  }, [user, needLogin, guestOnly, adminOnly, nav]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [userSelector]);

  return <>{loading ? <Loading /> : children}</>;
}
