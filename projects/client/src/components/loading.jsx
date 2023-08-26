import { Box, Center, Flex, Icon, Image } from "@chakra-ui/react";
import logo from "../assets/SVG/2.svg";

export default function Loading() {
  return (
    <>
      <Center w={"100vw"} h={"100vh"}>
        <Center maxW={"100px"} w={"100%"} h={"100%"} maxH={"120px"}>
          <Image src={logo} />
        </Center>
      </Center>
    </>
  );
}
