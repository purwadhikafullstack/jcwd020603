import { Box, Center, Flex } from "@chakra-ui/react";
import ContentPembayaran from "../components/content-pembayaran";
import Sidebar from "../components/sidebar";
import SidebarMini from "../components/sidebar-mini";

export default function PaymentPage() {
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

            <Flex w={"100%"}>
              <ContentPembayaran />
            </Flex>
          </Flex>
        </Center>
      ) : (
        <>
          <ContentPembayaran />
        </>
      )}
    </>
  );
}
