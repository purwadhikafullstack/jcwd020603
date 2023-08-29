import { Center, Flex } from "@chakra-ui/react";
import ContentPesanan from "../components/content-pesanan";
import Sidebar from "../components/sidebar";
import SidebarMini from "../components/sidebar-mini";

export default function OrderListPage() {
  const windowWidth = window.innerWidth;
  return (
    <>
      {windowWidth > 600 ? (
        <Center>
          <Flex maxWidth={"1160px"} w={"100%"}>
            {windowWidth > 750 ? (
              <Flex maxW={"250px"} w={"100%"}>
                <Sidebar />
              </Flex>
            ) : (
              <SidebarMini />
            )}

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
