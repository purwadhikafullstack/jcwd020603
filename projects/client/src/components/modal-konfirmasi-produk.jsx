import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ModalKonfirmasiProduk(props) {
  const nav = useNavigate();

  return (
    <>
      <Flex padding={"20px"} flexDir={"column"} rowGap={"20px"}>
        <Flex fontWeight={"600"}>
          Apakah Anda yakin ingin menghapus produk ini?
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
              props.delCart(props.stock_id);
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
