import {
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { api } from "../api/api";

export default function ModalAddAddress(props) {
  //get all city dan province
  const [allProvince, setAllProvince] = useState([]);
  const fetchProvince = async () => {
    try {
      await api.get("/province").then((res) => {
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
      await api.get(`/city/${provinceId}`).then((res) => {
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

  const [address, setAddress] = useState({
    address: "",
    district: "",
    province: "",
    address_name: "",
    address_phone: "",
    city_id: "",
  });
  const inputHandler = async (e) => {
    const { id, value } = e.target;
    const tempAdd = { ...address };
    tempAdd[id] = value;
    setAddress(tempAdd);
    console.log(tempAdd);
  };
  const toast = useToast(); //post address ke database
  const postAddress = async () => {
    const token = JSON.parse(localStorage.getItem("auth"));
    await api.post("/addressG", address).then((res) => {
      props.getAddress();
      toast({
        title: res.data.message,
        status: "success",
        position: "top",
        duration: 3000,
      });
    });
  };
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
          <Input
            placeholder={"Nama"}
            id="address_name"
            onChange={inputHandler}
          />
          <Input
            placeholder={"Nomer Telfon"}
            id="address_phone"
            onChange={inputHandler}
          />
          <Flex w={"100%"} gap={"10px"}>
            <Select
              w={"50%"}
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
            <Select
              w={"50%"}
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
          </Flex>
          <Input
            placeholder={"Kelurahan Anda"}
            id="district"
            onChange={inputHandler}
          />
          <Textarea
            placeholder={"Tuliskan alamat anda..."}
            id="address"
            onChange={inputHandler}
          ></Textarea>
        </Flex>
        <Checkbox colorScheme="green">Jadikan Alamat Utama</Checkbox>
        <Flex w={"100%"} justifyContent={"right"}>
          <Button
            colorScheme="green"
            onClick={() => {
              postAddress();
              props.getAddress();
              props.onClose();
            }}
          >
            Simpan
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
