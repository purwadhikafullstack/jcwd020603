import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ModalSetAlamat(props) {
  const nav = useNavigate();

  return (
    <>
      <Flex padding={"20px"} flexDir={"column"} rowGap={"20px"}>
        <Flex flexDir={"column"} rowGap={"10px"}>
          <Flex fontWeight={"600"}>
            Anda perlu login terlebih dahulu untuk mengatur alamat pengiriman
          </Flex>
        </Flex>
        <Flex justifyContent={"right"} gap={"20px"}>
          <Button
            color={"grey"}
            onClick={() => {
              props.onClose();
            }}
          >
            NANTI SAJA
          </Button>
          <Button
            color="green"
            bg={"#BBDEBD"}
            onClick={() => {
              nav("/login");
              props.onClose();
            }}
          >
            LOGIN
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
