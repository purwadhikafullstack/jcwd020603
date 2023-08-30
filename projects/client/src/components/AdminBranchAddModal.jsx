import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import "../css/adminBranchR.css";
import logo from "../assets/SVG/4.svg";
import { api } from "../api/api";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function AddAdminBranch(props) {
  const toast = useToast();
  const [seePass, setSeePass] = useState(false);
  YupPassword(Yup);
  const formik = useFormik({
    initialValues: {
      user_name: "",
      email: "",
      role: "ADMIN",
      password: "",
      phone_number: "",
      branch_name: "",
      address: "",
      district: "",
      city_id: "",
      province: "",
    },

    validationSchema: Yup.object().shape({
      user_name: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ),
      email: Yup.string()
        .required("Gagal disimpan.. kolom ini tidak boleh kosong")
        .email("Invalid. Write like this example@mail.com"),
      password: Yup.string()
        .required("Gagal disimpan.. kolom ini tidak boleh kosong")
        .min(8, "Your Password too short.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
          "Password should including an uppercase letter, symbol, number"
        ),
      phone_number: Yup.string()
        .required("Gagal disimpan.. kolom ini tidak boleh kosong")
        .max(15, "More then maximun characters")
        .matches(
          /^(?!0{4,15}$)(\+\d{9,15}|0\d{9,15})$/,
          "Invalid. Write like this +628xxxxxxxxxx or 08xxxxxxxxxx"
        ),
      branch_name: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ),
      address: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ),
      district: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ),
      city_id: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ),
      province: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ),
    }),

    onSubmit: async () => {
      try {
        const {
          user_name,
          email,
          password,
          phone_number,
          branch_name,
          address,
          district,
          city_id,
          province,
        } = formik.values;
        const newBranchAdmin = {
          user_name,
          email,
          password,
          phone_number,
          branch_name,
          address,
          district,
          city_id,
          province,
        };

        const cekMailResponse = await api().get("/user/", {
          params: { getall: newBranchAdmin.email },
        });

        if (cekMailResponse.data.data.length > 0) {
          return toast({
            title: "Email sudah terdaftar, silahkan gunakan email lain",
            status: "warning",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
        } else {
          await api()
            .post("/branch/", newBranchAdmin)
            .then((res) => {
              return toast({
                title: "Admin dan Cabang berhasil ditambahkan",
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            });
          props.fetchAll();
          return props.onClose();
        }
      } catch (err) {
        console.log(err);
      }
  }
})


  const [province, setProvince] = useState([]);
  async function getProv() {
    try {
      await api()
        .get("/province/")
        .then((res) => {
          setProvince(res.data.result);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProv();
  }, []);

  const [city, setCity] = useState([]);
  const [provId, setProvId] = useState("");
  async function getCity() {
    try {
      await api()
        .get(`/city/${provId}`)
        .then((res) => {
          setCity(res.data.result);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCity();
  }, [provId]);


  function inputHandler(event) {
    const { value, id } = event.target;
    formik.setFieldValue(id, value);
  }

  return (
    <>
      <Flex>
        <Flex className="flex2R-addbranch">
          <Flex className="flex3R-addbranch">
            {/* <AddUser/> */}
            <Flex className="flex3R-input_user-addbranch">
              <Box className="flex3R-input-box-addbranch">Karyawan</Box>
              <FormControl>
                <FormLabel>Nama</FormLabel>
                <Input
                  onChange={inputHandler}
                  id="user_name"
                  type="text"
                  transition={"1s"}
                  _hover={{ borderColor: "#9d9c45", boxShadow: "dark-lg" }}
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
                  id="email"
                  type="email"
                  transition={"1s"}
                  _hover={{ borderColor: "#9d9c45", boxShadow: "dark-lg" }}
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
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={inputHandler}
                    id="password"
                    type={seePass ? "text" : "password"}
                    transition={"1s"}
                    _hover={{ borderColor: "#9d9c45", boxShadow: "dark-lg" }}
                  ></Input>
                  <InputRightElement
                    onClick={() => {
                      setSeePass(!seePass);
                    }}
                  >
                    {seePass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
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
                <FormLabel>Nomor Handphone</FormLabel>
                <Input
                  onChange={inputHandler}
                  id="phone_number"
                  type="text"
                  transition={"1s"}
                  _hover={{ borderColor: "#9d9c45", boxShadow: "dark-lg" }}
                ></Input>
                <Flex
                  display={formik.errors.phone_number ? "flex" : "none"}
                  color={"red"}
                  fontSize={"10px"}
                >
                  {formik.errors.phone_number}
                </Flex>
              </FormControl>
            </Flex>

            <Flex
              w={"10%"}
              h={"auto"}
              flexDir={"column"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Box className="flex3R-box-addbranch"></Box>
              <Flex h={"125px"} w={"100%"}>
                <Image
                  src={logo}
                  display={{
                    base: "none",
                    sm: "none",
                    md: "flex",
                    lg: "flex",
                    xl: "flex",
                  }}
                  w={"100%"}
                  h={"90%"}
                ></Image>
              </Flex>
              <Box className="flex3R-box-addbranch"></Box>
            </Flex>

            {/* <AddBranch/> */}

            <Flex className="flex3R-input_branch-addbranch">
              <Box className="flex3R-input-box-addbranch">Cabang</Box>
              <FormControl>
                <FormLabel>Nama Cabang</FormLabel>
                <Input
                  onChange={inputHandler}
                  id="branch_name"
                  transition={"1s"}
                  _hover={{ borderColor: "#9d9c45", boxShadow: "dark-lg" }}
                ></Input>
                <Flex
                  display={formik.errors.branch_name ? "flex" : "none"}
                  color={"red"}
                  fontSize={"10px"}
                >
                  {formik.errors.branch_name}
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Alamat Cabang</FormLabel>
                {/* <Input transition={"1s"}  _hover={{borderColor : "#9d9c45", boxShadow : "dark-lg"}} ></Input> */}
                <Textarea
                  onChange={inputHandler}
                  name=""
                  id="address"
                  cols="30"
                  rows="2"
                  resize={"none"}
                  size={"sm"}
                  transition={"1s"}
                  _hover={{ borderColor: "#9d9c45", boxShadow: "dark-lg" }}
                ></Textarea>
                <Flex
                  display={formik.errors.branch_address ? "flex" : "none"}
                  color={"red"}
                  fontSize={"10px"}
                >
                  {formik.errors.branch_address}
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Kecamatan</FormLabel>
                <Input
                  onChange={inputHandler}
                  id="district"
                  transition={"1s"}
                  _hover={{ borderColor: "#9d9c45", boxShadow: "dark-lg" }}
                ></Input>
                <Flex
                  display={formik.errors.district ? "flex" : "none"}
                  color={"red"}
                  fontSize={"10px"}
                >
                  {formik.errors.district}
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Provinsi</FormLabel>
                <Select
                  id="province"
                  placeholder="Pilih Provinsi"
                  transition={"1s"}
                  _hover={{ borderColor: "#9d9c45", boxShadow: "dark-lg" }}
                  onChange={(event) => {
                    const { value } = event.target;
                    const selectedProv = province.find(
                      (province) => province.province === value
                    );
                    setProvId(selectedProv.province_id);
                    inputHandler(event);
                  }}
                >
                  {province.map((val) => (
                    <option value={val.province}>{val.province}</option>
                  ))}
                </Select>
                <Flex
                  display={formik.errors.province ? "flex" : "none"}
                  color={"red"}
                  fontSize={"10px"}
                >
                  {formik.errors.province}
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Kabupaten / Kota</FormLabel>
                <Select
                  id="city_id"
                  placeholder="Pilih Kabupaten / Kota"
                  transition={"1s"}
                  _hover={{ borderColor: "#9d9c45", boxShadow: "dark-lg" }}
                  onChange={inputHandler}
                >
                  {city.map((val) => (
                    <option value={val.city_id}>{val.city_name}</option>
                  ))}
                </Select>

                <Flex
                  display={formik.errors.province ? "flex" : "none"}
                  color={"red"}
                  fontSize={"10px"}
                >
                  {formik.errors.province}
                </Flex>
              </FormControl>
            </Flex>
          </Flex>

          <Flex justifyContent={"center"}>
            <Button
              onClick={formik.handleSubmit}
              m={"20px"}
              w={"40%"}
              cursor={"pointer"}
              bgGradient="linear(to-r, #9d9c45, #f0ee93 )"
              transition={"1"}
              fontWeight={"bolder"}
              _hover={{
                bgGradient: "linear(to-l, #9d9c45, #f0ee93 )",
              }}
            >
              Tambah
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
