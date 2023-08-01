import { Center, Flex } from "@chakra-ui/react";
import AdminSidebar from "../components/admin-sidebar";
import SuperAdminProductList from "../components/super-admin-product-list";

export default function SuperAdminProductPage() {
  const windowWidth = window.innerWidth;
  return (
    <>
      {windowWidth > 880 ? (
        <Center borderRight={"1px solid lightgrey"}>
          <Flex
            maxWidth={"1160px"}
            w={"100%"}
            borderRight={"1px solid lightgrey"}
          >
            <AdminSidebar />
            <SuperAdminProductList />
          </Flex>
        </Center>
      ) : (
        <>
          <SuperAdminProductList />
        </>
      )}
    </>
  );
}
