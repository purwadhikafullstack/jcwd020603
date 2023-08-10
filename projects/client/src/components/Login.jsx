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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../api/api";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import logo from "../assets/SVG/1.svg";

export default function Login() {
  const toast = useToast();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [seepass, setSeepass] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { value, id } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    console.log(tempUser);
    setUser(tempUser);
  };

  const login = async () => {
    toast.closeAll();

    await api
      .post("/user/auth", user)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("auth", JSON.stringify(res.data.token));
        dispatch({
          type: "login",
          payload: res.data.value,
        });

        toast({
          title: "Selamat Datang di Sahabat Sembako",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        if (
          res.data.value.role == "SUPER ADMIN" ||
          res.data.value.role == "ADMIN"
        ) {
          return nav("/dashboard");
        } else if (res.data.value.role == "USER") {
          return nav("/");
        }
      })
      .catch((err) => {
        console.log(err.message);

        return toast({
          title: "Maaf Login gagal, pastikan email/password benar ",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const respass = async () => {
    const email = user.email

    if (email){
      toast({
        title: "Silahkan cek email Anda untuk link reset password",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      try {
        await api.get("/user/send-email-respass", {params : {email : email}})
        .then((res)=> {
          console.log(res.message);
        })
      } catch (error) {
        console.log(error);
      }
        
    } else {
      toast({
        title: "Masukkan alamat Email Anda",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
    }
  }
   

  return (
    <Flex maxW={"100vw"} align={"center"} bgColor={"white"} justify={"center"}>
      <Stack
        maxH={"100vh"}
        h={"100vh"}
        w={"360px"}
        maxW={"1200px"}
        py={4}
        pt={8}
        bgColor={"white"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Box
          border={"1px solid #efefef"}
          h={"auto"}
          maxH={"100vh"}
          p={6}
          pt={6}
        >
          <Flex
            w={"100%"}
            h={"15%"}
            justify={"center"}
            mb={"10%"}
            justifyContent={"space-between"}
          >
            <Image
              src={logo}
              w={"50%"}
              h={"100%"}
              cursor={"pointer"}
              onClick={() => {
                nav("/");
              }}
            ></Image>
            <Flex
              w={"0.05%"}
              h={"100%"}
              border={"1px solid #199950"}
              alignItems={"center"}
              justify={"center"}
            ></Flex>
            <Flex
              w={"50%"}
              h={"100%"}
              fontSize={"100%"}
              color={"#199950"}
              alignItems={"center"}
              fontWeight={"bolder"}
              justifyContent={"center"}
            >
              Sign in
            </Flex>
          </Flex>
          <Stack spacing={3}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                // h={"90%"}
                type="email"
                id="email"
                fontWeight={"bolder"}
                onChange={inputHandler}
                _hover={{ borderColor: "#199950" }}
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={seepass ? "text" : "password"}
                  id="password"
                  fontWeight={"bolder"}
                  onChange={inputHandler}
                  _hover={{ borderColor: "#199950" }}
                />
                <InputRightElement>
                  <Icon
                    as={seepass ? AiFillEye : AiFillEyeInvisible}
                    onClick={() => {
                      setSeepass(!seepass);
                    }}
                  ></Icon>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                {/* <Checkbox fontWeight={"bolder"}>Remember me</Checkbox> */}
                <Link fontWeight={"bolder"} onClick={respass}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"#199950"}
                color={"white"}
                _hover={{
                  bg: "#9D9C45",
                }}
                fontWeight={"bolder"}
                fontSize={"100%"}
                onClick={login}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>

          <Flex
            rounded={"lg"}
            // bgColor={"blue.100"}
            p={"8px"}
            alignItems={"center"}
            justifyContent={"center"}
            color={"black"}
            fontWeight={"bolder"}
          >
            Don't have an acoount?{" "}
            <Link
              color={"#199950"}
              ml={"1%"}
              fontWeight={"bolder"}
              onClick={() => {
                nav("/register");
              }}
            >
              Sign up
            </Link>
          </Flex>
        </Box>
      </Stack>
    </Flex>
  );
}
