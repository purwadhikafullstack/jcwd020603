import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function ModalAdminDitolak(props) {
  return (
    <>
      <Flex padding={"20px"} flexDir={"column"} rowGap={"20px"}>
        <Flex fontWeight={"600"}>
          Tolak bukti pembayaran dan batalkan pesanan?
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
