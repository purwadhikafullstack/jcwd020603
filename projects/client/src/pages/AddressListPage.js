import { Box, Center, Flex } from "@chakra-ui/react";
import ContentDaftarAlamat from "../components/content-daftar-alamat";
import Sidebar from "../components/sidebar";
import SidebarMini from "../components/sidebar-mini";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function AddressListPage() {
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
            <ContentDaftarAlamat />
          </Flex>
        </Center>
      ) : (
        <>
          <ContentDaftarAlamat />
        </>
      )}
    </>
  );
}
