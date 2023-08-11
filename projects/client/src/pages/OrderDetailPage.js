import { Center, Flex } from "@chakra-ui/react";
import ContentDetailPesanan from "../components/content-detail-pesanan";
import Sidebar from "../components/sidebar";
import SidebarMini from "../components/sidebar-mini";

export default function OrderDetailPage() {
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
            <Flex>{windowWidth > 750 ? <Sidebar /> : <SidebarMini />}</Flex>
            <ContentDetailPesanan />
          </Flex>
        </Center>
      ) : (
        <>
          <ContentDetailPesanan />
        </>
      )}
    </>
  );
}
