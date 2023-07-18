import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../api/api";
import logo from "../assets/SVG/1.svg";

export default function Dummy() {
  const toast = useToast();
  const nav = useNavigate();

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("green.200", "green.200")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Dummy Landing Page</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("whiteAlpha.400", "gray.100")}
          boxShadow={"lg"}
          p={8}
          h={"400px"}
        >
          <Flex
            spacing={4}
            flexDir={"column"}
            w={"100%"}
            h={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            // border={"1px solid black"}
          >
            <Image src={logo} w={"100%"} h={"20%"}></Image>
            {/* <Flex */}
            {/* flexDir={"column"} */}
            {/* w={"30%"} */}
            {/* justifyContent={"space-around"} */}
            {/* h={"80%"} */}
            {/* columnGap={"10%"} */}
            {/* > */}
            <Button
              bg={useColorModeValue("whiteAlpha.400", "gray.100")}
              h={"20%"}
              mt={"2%"}
              onClick={() => {
                nav("/login");
              }}
            >
              Login
            </Button>
            <Button
              bg={useColorModeValue("whiteAlpha.400", "gray.100")}
              h={"20%"}
              mt={"2%"}
              onClick={() => {
                nav("/register");
              }}
            >
              Register
            </Button>
            <Button
              bg={useColorModeValue("whiteAlpha.400", "gray.100")}
              h={"20%"}
              mt={"2%"}
              onClick={() => {
                nav("/dashboard");
              }}
            >
              dashboard
            </Button>
            <Button
              bg={useColorModeValue("whiteAlpha.400", "gray.100")}
              h={"20%"}
              mt={"2%"}
              onClick={() => {
                nav("/reset");
              }}
            >
              reset pass
            </Button>
            <Button
              bg={useColorModeValue("whiteAlpha.400", "gray.100")}
              h={"20%"}
              mt={"2%"}
              onClick={() => {
                nav("/login");
              }}
            >
              edit profile & change foto profile
            </Button>
            <Button
              bg={useColorModeValue("whiteAlpha.400", "gray.100")}
              h={"20%"}
              mt={"2%"}
              mb={"2%"}
              onClick={() => {
                nav("/login");
              }}
            >
              add, update, delete address
            </Button>
            {/* </Flex> */}
          </Flex>
        </Box>
      </Stack>
    </Flex>
  );
}
