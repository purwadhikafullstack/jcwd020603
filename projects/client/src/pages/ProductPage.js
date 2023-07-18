import { Box, Center } from "@chakra-ui/react";
import Footer from "../components/footer";
import Product from "../components/product";
import Sidebar from "../components/sidebar";
import { useLocation } from "react-router-dom";

export default function ProductPage() {
  const windowWidth = window.innerWidth;
  return (
    <>
      {windowWidth > 850 ? (
        <Center>
          <Box>
            <Sidebar />
          </Box>
          <Box paddingLeft={"250px"}>
            <Product />
          </Box>
        </Center>
      ) : (
        <>
          <Product />
          <Footer />
        </>
      )}
    </>
  );
}
