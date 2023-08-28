import {
  Button,
  Checkbox,
  Flex,
  FormControl,
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

export default function ModalEditAddress(props) {
  const [selectedProvince, setSelectedProvince] = useState(props.val.province);
  const [selectedCity, setSelectedCity] = useState(`${props.val.city_id}`);
  const [selectedType, setSelectedType] = useState();

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
    fetchCity();
    console.log(props.val);
  }, []);
  const [allCity, setAllCity] = useState([]);
  const [provinceId, setProvinceId] = useState(props.val.province);
  const fetchCity = async () => {
    try {
      console.log(provinceId);
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
  //function edit is_primary
  const [primary, setPrimary] = useState(props.val.is_primary);
  const updatePrimary = async () => {
    if (!props.val.is_primary && primary) {
      await api().patch(`/addressG/primary/${props.val.id}`);
    }
  };
  useEffect(() => {
    updatePrimary();
  }, [primary]);
  //edit value address
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      address: props.val.address,
      district: props.val.district,
      province: props.val.province,
      address_name: props.val.address_name,
      address_phone: props.val.address_phone,
      city_id: props.val.city_id,
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
        setIsLoading(true);
        await api()
          .patch(`/addressG/${props.val.id}`, input)
          .then((res) => {
            setIsLoading(false);
            props.getAddress();
            props.onClose();
            toast({
              title: res.data.message,
              status: "success",
              position: "top",
              duration: 3000,
            });
          });
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast({
          title: err.response.data.message,
          status: "error",
          position: "top",
          duration: 3000,
        });
      }
    },
  });
  //loading button
  const [isLoading, setIsLoading] = useState(false);

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
              defaultValue={props.val.address_name}
            ></Input>
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
              defaultValue={props.val.address_phone}
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
                value={selectedProvince}
                onChange={(e) => {
                  const { value } = e.target;
                  const cuaks = allProvince.find(
                    (province) => province.province === value
                  );
                  setProvinceId(cuaks.province_id);
                  setSelectedProvince(value);
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
                onChange={(e) => {
                  inputHandler(e);
                  setSelectedCity(e.target.value);
                  console.log(`${selectedCity}`);
                }}
                value={`${selectedCity}`}
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
              defaultValue={props.val.district}
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
              defaultValue={props.val.address}
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
        <Checkbox
          colorScheme="green"
          onChange={() => setPrimary(!primary)}
          isChecked={primary}
        >
          Jadikan Alamat Utama
        </Checkbox>
        <Flex w={"100%"} justifyContent={"right"}>
          <Button
            colorScheme="green"
            onClick={() => {
              formik.handleSubmit();
            }}
            isLoading={isLoading}
          >
            Simpan
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
