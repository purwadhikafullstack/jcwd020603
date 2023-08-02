import { Box, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import "../css/adminBranchR.css"
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup"
import YupPassword from "yup-password";
import {AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import {api} from "../api/api"

export default function AddUser(){
    const toast = useToast()
    const [seePass, setSeePass] = useState(false)
    YupPassword(Yup)
    const formik = useFormik ({
        initialValues : {
            user_name : "",
            email : "",
            password : "",
            phone_number : "",
        },

        validationSchema : Yup.object().shape({
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
      
              const cekMail = await api
                .get("/user/", { params: { getall: account.email } })
                .then((res) => {
                  console.log(res.data.email);
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
                await api.post("/user/reg", account).then((res) => {
                  toast({
                    title: "Register berhasil",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                });
              }
            } catch (err) {
              console.log(err);
            }
          },
        });

        function inputHandler (event) {
            const {value, id } = event.target
            formik.setFieldValue(id, value)
        }
      
    return (
        <>
        
        <Flex className="flex3R-input_user-addbranch">
                        <Box className="flex3R-input-box-addbranch">Karyawan</Box>
                        <FormControl>
                            <FormLabel>Nama</FormLabel>
                            <Input id="user_name" type="text" transition={"1s"}  _hover={{borderColor : "green", boxShadow : "dark-lg"}} ></Input>
                            <Flex
                                display={formik.errors.user_name ? "flex" : "none"}
                                color={"red"}
                                fontSize={"10px"}
                              >
                                {formik.errors.user_name}
                            </Flex>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input id="email" type="email" transition={"1s"}  _hover={{borderColor : "green", boxShadow : "dark-lg"}}></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                            <Input id="password" type={seePass ? "text" : "password"} transition={"1s"}  _hover={{borderColor : "green", boxShadow : "dark-lg"}} ></Input>
                            <InputRightElement onClick={() => {setSeePass(!seePass)}}>{seePass ? < AiOutlineEye/> : <AiOutlineEyeInvisible/>}</InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Nomor Handphone</FormLabel>
                            <Input id="phone_number" type="text" transition={"1s"}  _hover={{borderColor : "green", boxShadow : "dark-lg"}} ></Input>
                        </FormControl>
                    </Flex>

        </>
    )
}