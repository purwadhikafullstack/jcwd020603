import { Box, Center } from "@chakra-ui/react";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import SAdminCategory from "../components/sAdminCategory";
import SAdminProduct from "../components/sAdminProduct";

export default function SAdminCategoryPage() {
  const windowWidth = window.innerWidth;
  return (
    <>
      {windowWidth > 850 ? (
        <Center>
          <Box>
            <Sidebar />
          </Box>
          <Box paddingLeft={"250px"}>
            <SAdminCategory />
          </Box>
        </Center>
      ) : (
        <>
          <SAdminCategory />
        </>
      )}
    </>
  );
}
