import { Center, Flex, Icon } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function NavbarDaftarAlamat() {
  const nav = useNavigate();
  return (
    <>
      <Flex
        w={"910px"}
        h={"60px"}
        color={"#2A960C"}
        fontSize={"20px"}
        fontWeight={"600"}
        alignItems={"center"}
        gap={"20px"}
        padding={"0px 20px"}
        bg={"#EBF5E9"}
        position={"fixed"}
        top="0"
        zIndex={1}
      >
        <Center
          w={"40px"}
          h={"40px"}
          onClick={() => {
            nav("/");
          }}
        >
          <Icon as={BiArrowBack} fontSize={"24px"} />
        </Center>
        Daftar Alamat
      </Flex>
    </>
  );
}
