import { Center, Flex } from "@chakra-ui/react";
import AdminSidebar from "../components/admin-sidebar";
import AdminOrderDetail from "../components/admin-order-detail";
import { useParams } from "react-router-dom";

export default function AdminOrderDetailPage() {
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
            <Flex maxW={"910px"} w={"100%"}>
              <AdminOrderDetail />
            </Flex>
          </Flex>
        </Center>
      ) : (
        <>
          <AdminOrderDetail />
        </>
      )}
    </>
  );
}
