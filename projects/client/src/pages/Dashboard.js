import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import "../css/indexR.css";
import DashboardContent from "../components/DashboardContent";

export default function Dashboard() {
  const [navLeft, setNavLeft] = useState("minus");

  const toggleSidebar = () => {
    if (navLeft == "" || navLeft == "minus") {
      setNavLeft("plus");
    } else if (navLeft == "plus") {
      setNavLeft("minus");
    }
  };

  return (
    <>
      <Flex className="flex1R">
        <DashboardSidebar navLeft={navLeft} />
        <DashboardNavbar toggleSidebar={toggleSidebar} />
        <DashboardContent />
      </Flex>
    </>
  );
}
