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
import { useState } from "react";
import { api } from "../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProfileVeriPass from "./profileVeriPass";
import "../css/profileR.css";
import moment from "moment";

export default function ProfileData() {
  const userSelector = useSelector((state) => state.auth);
  const formattedDate = moment(userSelector.birth_date).format("YYYY-MM-DD");
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
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
        const dtUser = { user_name, email, gender, birth_date };

        let cekuser;
        await api()
          .get("/user/", {
            params: { getall: dtUser.email } && { getall: dtUser.user_name },
          })
          .then((res) => (cekuser = res.data));
        console.log("ini", cekuser);
        console.log(dtUser);
        console.log("itu", (cekuser.id !== userSelector.id) == false);

        if (cekuser.length === 0 || cekuser.id === userSelector.id) {
          let updated;
          await api()
            .patch("user/" + userSelector.id, dtUser)
            .then((res) => (updated = res.data));

          console.log(updated);

          if (updated) {
            dispatch({
              type: "login",
              payload: updated,
            });
          }
          toast({
            title: "Data berhasil di ubah",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          setEdit(true);
        } else {
          return toast({
            title:
              "Email / Username sudah terdaftar, silahkan gunakan username / email yang lain",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

  });

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
              defaultValue={userSelector.user_name}
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
              defaultValue={userSelector.email}
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
              defaultValue={userSelector.gender}
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
