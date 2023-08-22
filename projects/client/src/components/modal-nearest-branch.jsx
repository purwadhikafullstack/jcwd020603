import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ModalNearestBranch(props) {
  const nav = useNavigate();

  return (
    <>
      <Flex padding={"20px"} flexDir={"column"} rowGap={"20px"}>
        <Flex fontWeight={"600"}>
          Oops... Layanan Sahabat Sembako tidak tersedia di lokasi anda saat
          ini.
        </Flex>
        <Flex justifyContent={"right"} gap={"20px"}>
          <Button
            color={"grey"}
            onClick={() => {
              props.onClose();
            }}
          >
            OK
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
