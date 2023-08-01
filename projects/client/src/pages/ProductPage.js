import { Box, Center, Flex } from "@chakra-ui/react";
import Footer from "../components/footer";
import Product from "../components/product";
import Sidebar from "../components/sidebar";
import { useLocation } from "react-router-dom";
import SidebarMini from "../components/sidebar-mini";

export default function ProductPage() {
  const windowWidth = window.innerWidth;
  return (
    <>
      {windowWidth > 600 ? (
        <Center>
          <Flex maxWidth={"1212px"} w={"100%"}>
            <Flex>{windowWidth > 750 ? <Sidebar /> : <SidebarMini />}</Flex>
            <Flex>
              <Product />
            </Flex>
          </Flex>
        </Center>
      ) : (
        <>
          <Product />
          <Footer />
        </>
      )}
    </>
    // <>
    //   {windowWidth > 850 ? (
    //     <Center>
    //       <Box>
    //         <Sidebar />
    //       </Box>
    //       <Box paddingLeft={"250px"}>
    //         <Product />
    //       </Box>
    //     </Center>
    //   ) : (
    //     <>
    //       <Product />
    //       <Footer />
    //     </>
    //   )}
    // </>
  );
}
