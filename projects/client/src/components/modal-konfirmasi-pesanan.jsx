import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ModalKonfirmasiPesanan(props) {
  const nav = useNavigate();

  return (
    <>
      <Flex padding={"20px"} flexDir={"column"} rowGap={"20px"}>
        <Flex fontWeight={"600"}>
          Apakah Anda yakin ingin membatalkan pesanan ini?
        </Flex>
        <Flex justifyContent={"right"} gap={"20px"}>
          <Button
            color={"grey"}
            onClick={() => {
              props.onClose();
            }}
          >
            TIDAK
          </Button>
          <Button
            bg={" #f7d1d5"}
            color={"red"}
            onClick={() => {
              props.cancelOrder();
            }}
          >
            YA
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
