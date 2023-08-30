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
  InputGroup,
  InputRightElement,
  Icon,
  Image,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/api";
import logo from "../assets/SVG/1.svg";
import logo2 from "../assets/SVG/2.svg";
import "../css/indexR.css";

export default function Verify() {
  const userSelector = useSelector((state) => state.auth);
  const location = useLocation();
  const toast = useToast();
  const nav = useNavigate();
  const dispatch = useDispatch();

  console.log(userSelector);

  const verify = async () => {
    try {
      const { pathname } = location;
      console.log(pathname);
      const token = pathname.split("/")[2];
      console.log(userSelector.verification);

      if (userSelector.verification == false) {
        await api()
          .patch("user/verify?token=" + token, null)
          .then((result) => {
            console.log(result.data);
            dispatch({
              type: "login",
              payload: result.data,
            });
            toast({
              title: "Selamat.. verifikasi akun kamu berhasil.",
              status: "success",
              position: "top",
              duration: "3000",
              isClosable: true,
            });

            nav("/");
          });
      } else {
        toast({
          title: "Verifikasi gagal.. Akun ini sudah terverifikasi",
          status: "error",
          position: "top",
          duration: "3000",
          isClosable: true,
        });
        nav("/");
      }
    } catch (err) {
      console.log(err.message);
      toast({
        title: "Maaf link ini telah expired, silahkan verifikasi ulang",
        status: "error",
        position: "top",
        duration: "3000",
        isClosable: true,
      });
      nav("/");
    }
  };

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
          gap={10}
          justifyContent={"space-between"}
        >
          <Image src={logo} w={"100%"} h={"40%"} className="logo_atas"></Image>
          <Stack spacing={4}>
            <Heading fontSize={50} textAlign={"center"}>
              Verifikasi Akun
            </Heading>
            <Button
              bg={"#199950"}
              color={"white"}
              _hover={{
                bg: "#9D9C45",
              }}
              fontWeight={"bolder"}
              fontSize={20}
              onClick={verify}
            >
              Verify
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}
