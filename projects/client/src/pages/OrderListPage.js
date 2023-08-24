import { Center, Flex } from "@chakra-ui/react";
import ContentPesanan from "../components/content-pesanan";
import Sidebar from "../components/sidebar";
import SidebarMini from "../components/sidebar-mini";

export default function OrderListPage() {
  const windowWidth = window.innerWidth;
  return (
    <>
      {windowWidth > 600 ? (
        <Center borderRight={"1px solid lightgrey"}>
          <Flex
            maxWidth={"1160px"}
            w={"100%"}
            borderRight={"1px solid lightgrey"}
          >
            {windowWidth > 750 ? <Sidebar /> : <SidebarMini />}

            <ContentPesanan />
          </Flex>
        </Center>
      ) : (
        <>
          <ContentPesanan />
        </>
      )}
    </>
  );
}
