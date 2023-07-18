import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Image,
  Center,
  Stack,
} from "@chakra-ui/react";
import logo from "../assets/SVG/1.svg";
import logo2 from "../assets/SVG/2.svg";
import { useNavigate } from "react-router-dom";
import "../css/indexR.css";

export default function NotFoundComp() {
  const nav = useNavigate();

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bgColor={"white"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        w={"22%"}
        h={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        className="logo_samping"
      >
        <Image
          src={logo2}
          w={"80%"}
          h={"48%"}
          className="logo_samping"
          p={4}
        ></Image>
      </Box>
      <Flex
        spacing={8}
        h={"100vh"}
        w={"95%"}
        minW={"245px"}
        maxW={"300px"}
        py={12}
        px={2}
        bgColor={"white"}
        alignItems={"center"}
      >
        <Box
          rounded={"lg"}
          p={8}
          h={"auto"}
          display={"flex"}
          flexDir={"column"}
          columnGap={"10%"}
          gap={5}
          justifyContent={"space-between"}
        >
          <Image
            src={logo}
            w={"100%"}
            h={"40%"}
            className="logo_atas"
            pb={4}
            borderBottom={"3px solid #199950"}
          ></Image>

          <Stack spacing={4}>
            <Heading
              fontSize={100}
              textAlign={"center"}
              bgGradient="linear(to-r, orange.200, orange.400, orange.600)"
              bgClip={"text"}
            >
              404
            </Heading>
            <Text fontSize={20} textAlign={"center"}>
              Maaf, alamat yang Anda masukkan tidak valid
            </Text>
            <Button
              bgGradient="linear(to-r, orange.200, orange.400, orange.600)"
              color={"white"}
              transition={"0.5"}
              _hover={{
                bgGradient: "linear(to-l, orange.200, orange.400, orange.600)",
              }}
              fontWeight={"bolder"}
              fontSize={"100%"}
              onClick={() => {
                nav("/");
              }}
            >
              Back to Home
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}
