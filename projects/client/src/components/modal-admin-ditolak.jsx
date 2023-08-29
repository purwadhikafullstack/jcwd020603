import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useEffect } from "react";

export default function ModalAdminDitolak(props) {
  useEffect(() => {
    props.setValueStatus("Menunggu Pembayaran");
  }, []);

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
              props.refuseOrder();
              props.onClose();
            }}
          >
            YA
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
