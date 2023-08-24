import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { useState } from "react";
import { Center, Flex } from "@chakra-ui/react";
import "../css/indexR.css";
// import "../css/profileR.css"
import DashboardContent from "../components/DashboardContent";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import Profile from "../components/ProfileUser";
import SidebarMini from "../components/sidebar-mini";

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
      {windowWidth > 600 ? (
        <Center borderRight={"1px solid lightgrey"}>
          <Flex
            maxWidth={"1160px"}
            w={"100%"}
            borderRight={"1px solid lightgrey"}
          >
            {windowWidth > 750 ? (
              <Flex maxW={"250px"} w={"100%"}>
                <Sidebar navLeft={navLeft} />
              </Flex>
            ) : (
              <SidebarMini navLeft={navLeft} />
            )}
            <DashboardNavbar toggleSidebar={toggleSidebar} />
            <Profile />
          </Flex>
        </Center>
      ) : (
        <>
          <Profile />
          <Footer />
        </>
      )}
    </>
    // <>
    //   {windowWidth > 850 ? (
    //     <Flex className="flex1R">
    //       <Sidebar navLeft={navLeft} />
    //       <DashboardNavbar toggleSidebar={toggleSidebar} />
    //       <Profile />
    //     </Flex>
    //   ) : (
    //     <Flex className="flex1R">
    //       <Profile />
    //       <Footer />
    //     </Flex>
    //   )}
    // </>
  );
}
