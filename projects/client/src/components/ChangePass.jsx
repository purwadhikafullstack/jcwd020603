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
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function ChangePass() {
  const userSelector = useSelector((state) => state.auth);
  const location = useLocation();
  const toast = useToast();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [seepass, setSeepass] = useState(false);
  // YupPassword(Yup);
  const formik = useFormik({
    initialValues: {
      password: "",
    },

    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required("Required..!")
        .min(8, "Your Password too short.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
          "Password should including an uppercase letter, symbol, number"
        ),
      password2: Yup.string()
        .required("Required..!")
        .oneOf([Yup.ref("password"), null], "Password tidak sama"),
    }),

    onSubmit: async () => {
      try {
        const { password } = formik.values;
        const account = { password };

        await api
          .patch("/user/change-pass/" + userSelector.id, account)
          .then((res) => {
            toast({
              title: "Ganti Password Berhasil",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            nav("/");
          });
      } catch (err) {
        console.log(err);
      }
    },
  });

  function inputHandler(event) {
    const { value, id } = event.target;
    formik.setFieldValue(id, value);
    console.log(formik.values);
  }

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
        maxW={"400px"}
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
          columnGap={"20%"}
          justifyContent={"space-between"}
        >
          <Image src={logo} w={"100%"} h={"40%"} className="logo_atas"></Image>
          <Stack spacing={4}>
            <Heading fontSize={30} textAlign={"center"}>
              Ganti Password
            </Heading>

            <Flex flexDir={"column"} gap={10}>
              <FormControl>
                <FormLabel>Password Baru</FormLabel>
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
                <FormLabel>Masukkan ulang password baru</FormLabel>
                <InputGroup>
                  <Input
                    id="password2"
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
                  display={formik.errors.password2 ? "flex" : "none"}
                  color={"red"}
                  fontSize={"10px"}
                >
                  {formik.errors.password2}
                </Flex>
              </FormControl>

              <Button
                bg={"#199950"}
                color={"white"}
                _hover={{
                  bg: "#9D9C45",
                }}
                fontWeight={"bolder"}
                fontSize={20}
                onClick={formik.handleSubmit}
              >
                Simpan
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
}
