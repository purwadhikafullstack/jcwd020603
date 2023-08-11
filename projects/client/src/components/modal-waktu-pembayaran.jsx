import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ModalWaktuPemabayaran(props) {
  const nav = useNavigate();

  return (
    <>
      <Flex padding={"20px"} flexDir={"column"} rowGap={"20px"}>
        <Flex fontWeight={"600"}>
          Waktu pembayaran habis, pesanan otomatis dibatalkan. Silahkan
          melakukan pesanan ulang.
        </Flex>
        <Flex justifyContent={"right"} gap={"20px"}>
          <Button
            color={"grey"}
            onClick={() => {
              props.cancelOrder();
            }}
          >
            OK
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
