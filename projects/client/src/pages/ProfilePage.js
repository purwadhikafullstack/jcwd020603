import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import "../css/indexR.css";
// import "../css/profileR.css"
import DashboardContent from "../components/DashboardContent";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import Profile from "../components/ProfileUser";

// Profile
export default function ProfilePage() {
  const [navLeft, setNavLeft] = useState("minus");

  const toggleSidebar = () => {
    if (navLeft == "" || navLeft == "minus") {
      setNavLeft("plus");
    } else if (navLeft == "plus") {
      setNavLeft("minus");
    }
  };

  const windowWidth = window.innerWidth;

  return (
    <>
      {windowWidth > 850 ? (
        <Flex className="flex1R">
          <Sidebar navLeft={navLeft} />
          <DashboardNavbar toggleSidebar={toggleSidebar} />
          <Profile />
        </Flex>
      ) : (
        <Flex className="flex1R">
          <Profile />
          <Footer />
        </Flex>
      )}
    </>
  );
}
