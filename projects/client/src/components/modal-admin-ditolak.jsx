import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ModalAdminDitolak(props) {
  const nav = useNavigate();

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
