import { Center, Flex } from "@chakra-ui/react";
import AdminOrderList from "../components/admin-order-content";
import AdminSidebar from "../components/admin-sidebar";

export default function AdminOrderPage() {
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
            <Flex w={"250px"}>
              <AdminSidebar />
            </Flex>
            <Flex>
              <AdminOrderList />
            </Flex>
          </Flex>
        </Center>
      ) : (
        <>
          <AdminOrderList />
        </>
      )}
    </>
  );
}
