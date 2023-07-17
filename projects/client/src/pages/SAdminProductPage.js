import { Box, Center } from "@chakra-ui/react";
import Footer from "../components/footer";
import Product from "../components/product";
import Sidebar from "../components/sidebar";
import SAdminProduct from "../components/sAdminProduct";

export default function SAProductPage() {
  const windowWidth = window.innerWidth;
  return (
    <>
      {windowWidth > 850 ? (
        <Center>
          <Box>
            <Sidebar />
          </Box>
          <Box paddingLeft={"250px"}>
            <SAdminProduct />
          </Box>
        </Center>
      ) : (
        <>
          <SAdminProduct />
        </>
      )}
    </>
  );
}
