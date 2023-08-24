import { Center, Flex, Image } from "@chakra-ui/react";
import logo from "../assets/SVG/2.svg";

export default function Loading() {
  return (
    <Center
      h={"100vh"}
      maxW={"100vw"}
      w={"100%"}
      display={"flex"}
      flexDir={"row"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Flex w={"30%"} h={"30%"} justifyContent={"center"} p={4}>
        <Image src={logo} />
      </Flex>
    </Center>
  );
}
