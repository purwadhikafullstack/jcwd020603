import { Box, Container, Flex, Image } from "@chakra-ui/react";
import logo from "../assets/SVG/2.svg";

export default function SideComp() {
  return (
    <>
      <Flex
        h={"100%"}
        maxH={"100vh"}
        w={"30%"}
        maxW={"50vw"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          src={logo}
          h={"92%"}
          w={"80%"}
          border={"3px double #199950"}
          borderTopLeftRadius={40}
          borderBottomRightRadius={40}
        ></Image>
      </Flex>
    </>
  );
}
