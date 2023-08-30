import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputRightElement,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { MdOutlineSaveAs } from "react-icons/md";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProfileVeriPass from "./profileVeriPass";
import "../css/profileR.css";
import moment from "moment";
import { update } from "lodash";

export default function ProfileData() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const [user, setUser] = useState(userSelector);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const formattedDate = moment(user?.birth_date).format("YYYY-MM-DD");
  const [bd, setBd] = useState(formattedDate);

  const formik = useFormik({
    initialValues: {
      user_name: userSelector.user_name,
      email: userSelector.email,
      gender: userSelector.gender,
      birth_date: userSelector.birth_date,
    },

    validationSchema: Yup.object().shape({
      user_name: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ),
      email: Yup.string()
        .required("Gagal disimpan.. kolom ini tidak boleh kosong")
        .email("Masukan Email dengan format seperti example@mail.com"),
      gender: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ),
      birth_date: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ),
    }),

    onSubmit: async () => {
      try {
        const { user_name, email, gender, birth_date } = formik.values;
        const dtUser = { user_name, email: email ? email : userSelector.email, gender, birth_date };
    
        // Cek apakah email yang diinputkan sudah ada di database selain email user saat ini
        const cekMailResponse = await api().get("/user/", {
          params: { getall: dtUser.email },
        });
    
        if (cekMailResponse.data.data.length > 0 && cekMailResponse.data.data[0].email !== userSelector.email) {
          return toast({
            title: "Email sudah terdaftar, silahkan gunakan email lain",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        } else {
          const updateUserResponse = await api().patch("user/" + userSelector.id, dtUser);
          const updatedUser = updateUserResponse.data.data;
    
          if (updatedUser) {
            dispatch({
              type: "login",
              payload: updatedUser,
            });
          }
    
          toast({
            title: "Data berhasil diubah",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          
          setUser(updatedUser)
          setEdit(true);
          // getUser(); // Pastikan Anda memiliki fungsi getUser yang sesuai
        }
      } catch (error) {
        console.log(error);
      }
    },

  });
  useEffect(() => {
    setUser(userSelector);
  }, [userSelector]);

  const inputHandler = (e) => {
    const { value, id } = e.target;
    formik.setFieldValue(id, value);
    console.log(formik.values);
  };

  return (
    <>
      <Flex
        flexDir={"column"}
        justifyContent={"space-between"}
        w={"100%"}
        rowGap={"20px"}
      >
        <Flex
          w={"100%"}
          h={"68%"}
          rounded={10}
          p={6}
          boxShadow={"lg"}
          flexDir={"column"}
          rowGap={"10px"}
          bgColor={"gray.100"}
          justifyContent={"space-between"}
        >
          <Flex
            className="flex2R"
            display={edit == true ? "flex" : "none"}
            onClick={() => {
              setEdit(false);
            }}
          >
            <Icon as={HiMiniPencilSquare} h={"100%"} cursor={"pointer"}></Icon>
            Edit
          </Flex>
          <Flex
            className="flex2R"
            display={edit == false ? "flex" : "none"}
            onClick={formik.handleSubmit}
          >
            <Icon as={MdOutlineSaveAs} h={"100%"}></Icon>Simpan
          </Flex>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              onChange={inputHandler}
              disabled={edit == true ? true : false}
              defaultValue={user?.user_name}
              id="user_name"
              type="text"
              transform={"1s"}
              outlineColor="green"
              _hover={{
                boxShadow: "dark-lg",
              }}
            ></Input>
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
            <Input
              onChange={inputHandler}
              disabled={edit == true ? true : false}
              defaultValue={user?.email}
              id="email"
              type="text"
              transform={"1s"}
              outlineColor="green"
              _hover={{
                boxShadow: "dark-lg",
              }}
            ></Input>
            <Flex
              display={formik.errors.email ? "flex" : "none"}
              color={"red"}
              fontSize={"10px"}
            >
              {formik.errors.email}
            </Flex>
          </FormControl>

          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select
              onChange={inputHandler}
              disabled={edit == true ? true : false}
              defaultValue={user?.gender}
              id="gender"
              type="text"
              transform={"1s"}
              outlineColor="green"
              _hover={{
                boxShadow: "dark-lg",
              }}
            >
              <option value={"MALE"}>Male</option>
              <option value={"FEMALE"}>Female</option>
            </Select>
            <Flex
              display={formik.errors.gender ? "flex" : "none"}
              color={"red"}
              fontSize={"10px"}
            >
              {formik.errors.gender}
            </Flex>
          </FormControl>

          <FormControl>
            <FormLabel>Birthdate</FormLabel>
            <Input
              onChange={inputHandler}
              disabled={edit == true ? true : false}
              defaultValue={bd}
              id="birth_date"
              type="date"
              transform={"1s"}
              outlineColor="green"
              _hover={{
                boxShadow: "dark-lg",
              }}
            ></Input>
            <Flex
              display={formik.errors.birth_date ? "flex" : "none"}
              color={"red"}
              fontSize={"10px"}
            >
              {formik.errors.birth_date}
            </Flex>
          </FormControl>
        </Flex>
        <ProfileVeriPass />
      </Flex>
    </>
  );
}
