import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { api } from "../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ModalAddAddress(props) {
  //get all city dan province
  const [allProvince, setAllProvince] = useState([]);
  const fetchProvince = async () => {
    try {
      await api()
        .get("/province")
        .then((res) => {
          console.log(res.data.result);
          setAllProvince(res.data.result);
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchProvince();
  }, []);
  const [allCity, setAllCity] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const fetchCity = async () => {
    try {
      await api()
        .get(`/city/${provinceId}`)
        .then((res) => {
          console.log(res.data.result);
          setAllCity(res.data.result);
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchCity();
  }, [provinceId]);

  const inputHandler = async (e) => {
    const { id, value } = e.target;
    formik.setFieldValue(id, value);
    console.log(formik.values);
  };

  //post address ke database
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      address: "",
      district: "",
      province: "",
      address_name: "",
      address_phone: "",
      city_id: "",
    },

    validationSchema: Yup.object().shape({
      address: Yup.string().required("Required..!"),
      district: Yup.string().required("Required..!"),
      province: Yup.string().required("Required..!"),
      address_name: Yup.string().required("Required..!"),
      address_phone: Yup.string()
        .required("Required..!")
        .max(13, "More then maximun characters")
        .matches(
          /^(?!0{4,15}$)(\+\d{9,15}|0\d{9,15})$/,
          "Invalid. Write like this 08xxxxxxxxxx"
        ),
      city_id: Yup.string().required("Required..!"),
    }),

    onSubmit: async () => {
      try {
        const {
          address,
          district,
          province,
          address_name,
          address_phone,
          city_id,
        } = formik.values;
        const input = {
          address,
          district,
          province,
          address_name,
          address_phone,
          city_id,
        };
        const create = await api().post("/addressG", input);
        props.getAddress();
        props.onClose();
        toast({
          title: create.data.message,
          status: "success",
          position: "top",
          duration: 3000,
        });
      } catch (err) {
        console.log(err);
        toast({
          title: err.response.data.message,
          status: "error",
          position: "top",
          duration: 3000,
        });
      }
    },
  });
  return (
    <>
      <Flex w={"100%"} padding={"20px"} flexDir={"column"} rowGap={"10px"}>
        <Flex
          fontSize={"18px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Flex>Tambah Alamat Pengiriman</Flex>
          <Flex onClick={props.onClose}>
            <Icon as={RxCross2} />
          </Flex>
        </Flex>
        <Flex paddingTop={"20px"} flexDir={"column"} rowGap={"10px"}>
          <FormControl>
            <Input
              placeholder={"Nama"}
              id="address_name"
              onChange={inputHandler}
            />
            <Flex
              display={formik.errors.address_name ? "flex" : "none"}
              color={"red"}
              fontSize={"10px"}
              paddingLeft={"10px"}
            >
              {formik.errors.address_name}
            </Flex>
          </FormControl>
          <FormControl>
            <Input
              placeholder={"Nomer Telfon"}
              id="address_phone"
              onChange={inputHandler}
              onKeyPress={(e) => {
                if (isNaN(Number(e.key))) {
                  e.preventDefault();
                }
              }}
            />
            <Flex
              display={formik.errors.address_phone ? "flex" : "none"}
              color={"red"}
              fontSize={"10px"}
              paddingLeft={"10px"}
            >
              {formik.errors.address_phone}
            </Flex>
          </FormControl>
          <Flex w={"100%"} gap={"10px"}>
            <FormControl>
              <Select
                w={"100%"}
                placeholder="Provinsi Anda"
                id="province"
                onChange={(e) => {
                  const { value } = e.target;
                  const selectedProvince = allProvince.find(
                    (province) => province.province === value
                  );
                  setProvinceId(selectedProvince.province_id);
                  inputHandler(e);
                }}
              >
                {allProvince.map((val) => (
                  <option value={val.province}>{val.province}</option>
                ))}
              </Select>
              <Flex
                display={formik.errors.province ? "flex" : "none"}
                color={"red"}
                fontSize={"10px"}
                paddingLeft={"10px"}
              >
                {formik.errors.province}
              </Flex>
            </FormControl>
            <FormControl>
              <Select
                w={"100%"}
                placeholder="Kota/Kabupaten Anda"
                id="city_id"
                onChange={inputHandler}
              >
                {allCity.map((val) => (
                  <option value={val.city_id}>
                    {val.type} {val.city_name}
                  </option>
                ))}
              </Select>
              <Flex
                display={formik.errors.city_id ? "flex" : "none"}
                color={"red"}
                fontSize={"10px"}
                paddingLeft={"10px"}
              >
                {formik.errors.city_id}
              </Flex>
            </FormControl>
          </Flex>
          <FormControl>
            <Input
              placeholder={"Kelurahan Anda"}
              id="district"
              onChange={inputHandler}
            />
            <Flex
              display={formik.errors.district ? "flex" : "none"}
              color={"red"}
              fontSize={"10px"}
              paddingLeft={"10px"}
            >
              {formik.errors.district}
            </Flex>
          </FormControl>
          <FormControl>
            <Textarea
              placeholder={"Tuliskan alamat anda..."}
              id="address"
              onChange={inputHandler}
            ></Textarea>
            <Flex
              display={formik.errors.address ? "flex" : "none"}
              color={"red"}
              fontSize={"10px"}
              paddingLeft={"10px"}
            >
              {formik.errors.address}
            </Flex>
          </FormControl>
        </Flex>
        <Checkbox colorScheme="green">Jadikan Alamat Utama</Checkbox>
        <Flex w={"100%"} justifyContent={"right"}>
          <Button
            colorScheme="green"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Simpan
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
