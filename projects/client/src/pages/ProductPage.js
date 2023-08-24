import { Box, Center, Flex } from "@chakra-ui/react";
import Footer from "../components/footer";
import Product from "../components/product";
import Sidebar from "../components/sidebar";
import { useLocation } from "react-router-dom";
import SidebarMini from "../components/sidebar-mini";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [nearestBranch, setNearestBranch] = useState();
  console.log("fakkk", nearestBranch);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("nearestBranch"))) {
      setNearestBranch(JSON.parse(localStorage.getItem("nearestBranch")));
    }
  }, []);
  const windowWidth = window.innerWidth;
  return (
    <>
      {windowWidth > 600 ? (
        <Center>
          <Flex maxWidth={"1212px"} w={"100%"}>
            <Flex>{windowWidth > 750 ? <Sidebar /> : <SidebarMini />}</Flex>
            <Flex>
              <Product nearestBranch={nearestBranch} />
            </Flex>
          </Flex>
        </Center>
      ) : (
        <>
          <Product nearestBranch={nearestBranch} />
          <Footer />
        </>
      )}
    </>
  );
}
