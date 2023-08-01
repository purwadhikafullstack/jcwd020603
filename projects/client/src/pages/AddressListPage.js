import { Box, Center, Flex } from "@chakra-ui/react";
import ContentDaftarAlamat from "../components/content-daftar-alamat";
import Sidebar from "../components/sidebar";
import SidebarMini from "../components/sidebar-mini";
import { useState } from "react";

export default function AddressListPage() {
  //menyimpan alamat yang dipilih
  const [selectedAddress, setSelectedAddress] = useState({});
  console.log(selectedAddress);
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
            <ContentDaftarAlamat
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          </Flex>
        </Center>
      ) : (
        <>
          <ContentDaftarAlamat
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        </>
      )}
    </>
  );
}
