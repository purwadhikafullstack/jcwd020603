import { Center, Flex, Icon } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function NavbarPembayaran() {
  const nav = useNavigate();
  const windowWidth = window.innerWidth;
  return (
    <>
      <Flex
        w={"910px"}
        h={"60px"}
        fontSize={"20px"}
        fontWeight={"600"}
        alignItems={"center"}
        gap={"20px"}
        padding={"0px 20px"}
        position={"fixed"}
        top="0"
        zIndex={1}
        bg={"#f6f6f7"}
      >
        <Center
          w={"40px"}
          h={"40px"}
          onClick={() => {
            nav("/orders");
          }}
        >
          <Icon as={BiArrowBack} fontSize={"24px"} />
        </Center>
        Menunggu Pembayaran
      </Flex>
    </>
  );
}
