import { Center, Flex } from "@chakra-ui/react";
import AdminSidebar from "../components/admin-sidebar";
import SuperAdminProductList from "../components/super-admin-product-list";
import StockHistoryList from "../components/stock-history-list";

export default function StockHistoryPage() {
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
            <StockHistoryList />
          </Flex>
        </Center>
      ) : (
        <>
          <StockHistoryList />
        </>
      )}
    </>
  );
}
