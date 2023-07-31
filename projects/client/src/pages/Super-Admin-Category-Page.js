import { Center, Flex } from "@chakra-ui/react";
import AdminSidebar from "../components/admin-sidebar";
import SuperAdminCategoryList from "../components/super-admin-category-list";

export default function SuperAdminCategoryPage() {
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
            <SuperAdminCategoryList />
          </Flex>
        </Center>
      ) : (
        <>
          <SuperAdminCategoryList />
        </>
      )}
    </>
  );
}
