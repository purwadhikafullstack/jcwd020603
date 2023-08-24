import { Center, Flex } from "@chakra-ui/react";
import AdminSidebar from "../components/admin-sidebar";
import AdminStockList from "../components/admin-stock-list";

export default function AdminStockPage() {
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
            <AdminStockList />
          </Flex>
        </Center>
      ) : (
        <>
          <AdminStockList />
        </>
      )}
    </>
  );
}
