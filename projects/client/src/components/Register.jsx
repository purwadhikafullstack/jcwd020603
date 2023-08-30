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
  background,
  useToast,
  InputGroup,
  InputRightElement,
  Icon,
  Image,
  Center,
} from "@chakra-ui/react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/api";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import logo from "../assets/SVG/1.svg";

export default function Register() {
  const toast = useToast();
  const nav = useNavigate();
  const [seepass, setSeepass] = useState(false);
  YupPassword(Yup);
  const formik = useFormik({
    initialValues: {
      user_name: "",
      email: "",
      password: "",
      phone_number: "",
    },

    validationSchema: Yup.object().shape({
      user_name: Yup.string().required("Required..!"),
      email: Yup.string()
        .required("Required..!")
        .email("Invalid. Write like this example@mail.com"),
      password: Yup.string()
        .required("Required..!")
        .min(8, "Your Password too short.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
          "Password should including an uppercase letter, symbol, number"
        ),
      phone_number: Yup.string()
        .required("Required..!")
        .max(15, "More then maximun characters")
        .matches(
          /^(?!0{4,15}$)(\+\d{9,15}|0\d{9,15})$/,
          "Invalid. Write like this +628xxxxxxxxxx or 08xxxxxxxxxx"
        ),
    }),

    onSubmit: async () => {
      try {
        const { user_name, email, password, phone_number } = formik.values;
        const account = { user_name, email, password, phone_number };

        const cekMail = await api()
          .get("/user/", { params: { getall: account.email } })
          .then((res) => {
            if (res.data.email) {
              return true;
            } else {
              return false;
            }
          });
        if (cekMail) {
          return toast({
            title: "Email sudah terdaftar, siilahkan gunakan email yang lain",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        } else {
          await api()
            .post("/user/reg", account)
            .then((res) => {
              toast({
                title: "Register berhasil",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              nav("/login");
            });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  function inputHandler(event) {
    const { value, id } = event.target;
    formik.setFieldValue(id, value);
  }

  return (
    <Flex maxW={"100vw"} align={"center"} justify={"center"} bgColor={"white"}>
      <Stack
        maxH={"100vh"}
        h={"100vh"}
        w={"400px"}
        maxW={"1200px"}
        py={4}
        pt={2}
        bgColor={"white"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Box h={"auto"} maxH={"100vh"} p={6} border={"1px solid #efefef"}>
          <Flex
            w={"100%"}
            h={"10%"}
            flexDir={"row"}
            justifyContent={"space-between"}
            mb={"7%"}
          >
            <Image
              src={logo}
              w={"40%"}
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
              w={"40%"}
              h={"100%"}
              fontSize={"100%"}
              p={0}
              color={"#199950"}
              alignItems={"center"}
              fontWeight={"bolder"}
              justifyContent={"center"}
            >
              Sign up
            </Flex>
          </Flex>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                id="user_name"
                type="text"
                color={"black"}
                fontWeight={"bolder"}
                _hover={{ borderColor: "#199950" }}
                onChange={inputHandler}
              />
              <Flex
                display={formik.errors.user_name ? "flex" : "none"}
                color={"red"}
                fontSize={"10px"}
              >
                {formik.errors.user_name}
              </Flex>
            </FormControl>

            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                type="email"
                color={"black"}
                fontWeight={"bolder"}
                _hover={{ borderColor: "#199950" }}
                onChange={inputHandler}
              />
              <Flex
                display={formik.errors.email ? "flex" : "none"}
                color={"red"}
                fontSize={"10px"}
              >
                {formik.errors.email}
              </Flex>
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={seepass ? "text" : "password"}
                  color={"black"}
                  fontWeight={"bolder"}
                  _hover={{ borderColor: "#199950" }}
                  onChange={inputHandler}
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
              <Flex
                display={formik.errors.password ? "flex" : "none"}
                color={"red"}
                fontSize={"10px"}
              >
                {formik.errors.password}
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                id="phone_number"
                type="text"
                color={"black"}
                fontWeight={"bolder"}
                _hover={{ borderColor: "#199950" }}
                onChange={inputHandler}
              />
              <Flex
                display={formik.errors.phone_number ? "flex" : "none"}
                color={"red"}
                fontSize={"10px"}
              >
                {formik.errors.phone_number}
              </Flex>
            </FormControl>
            <Stack spacing={3}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justifyContent={"center"}
              >
                <Box>Have an account?</Box>
                <Link
                  fontWeight={"bolder"}
                  color={"green"}
                  _hover={{ color: "orange.600" }}
                  onClick={() => {
                    nav("/login");
                  }}
                >
                  Sign in
                </Link>
              </Stack>
            </Stack>
          </Stack>
          <Button
            mt={4}
            w={"100%"}
            onClick={formik.handleSubmit}
            bg={"#199950"}
            color={"white"}
            _hover={{
              bg: "#9D9C45",
            }}
            fontWeight={"bolder"}
            fontSize={"100%"}
          >
            Sign up
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
}
