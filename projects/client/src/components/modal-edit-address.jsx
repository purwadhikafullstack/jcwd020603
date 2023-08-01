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

export default function ModalEditAddress(props) {
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
    console.log(props.val);
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
    city: "",
    province: "",
    user_id: 1,
    address_name: "",
    address_phone: "",
  });
  const inputHandler = async (e) => {
    const { id, value } = e.target;
    const tempAdd = { ...address };
    tempAdd[id] = value;
    setAddress(tempAdd);
    console.log(tempAdd);
  };
  //function edit is_primary
  const [primary, setPrimary] = useState(props.val.is_primary);
  const updatePrimary = async () => {
    if (!props.val.is_primary && primary) {
      await api.patch(`/addressG/primary/${props.val.id}`);
    }
  };
  useEffect(() => {
    updatePrimary();
  }, [primary]);
  //edit value address
  const toast = useToast();
  const editAddress = async () => {
    setIsLoading(true);
    await api.patch(`/addressG/${props.val.id}`, address).then((res) => {
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
  };
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
          <Input
            placeholder={"Nama"}
            id="address_name"
            onChange={inputHandler}
            defaultValue={props.val.address_name}
          ></Input>
          <Input
            placeholder={"Nomer Telfon"}
            id="address_phone"
            onChange={inputHandler}
            defaultValue={props.val.address_phone}
          />
          <Flex w={"100%"} gap={"10px"}>
            <Select
              w={"50%"}
              placeholder="Provinsi Anda"
              id="province"
              defaultValue={props.val.province}
              onChange={(e) => {
                const { value } = e.target;
                const selectedProvince = allProvince.find(
                  (province) => province.province === value
                );
                setProvinceId(selectedProvince.id);
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
              id="city"
              onChange={inputHandler}
              defaultValue={props.val.city_name}
            >
              {allCity.map((val) => (
                <option value={val.city_name}>
                  {val.type} {val.city_name}
                </option>
              ))}
            </Select>
          </Flex>
          <Input
            placeholder={"Kelurahan Anda"}
            id="district"
            onChange={inputHandler}
            defaultValue={props.val.district}
          />
          <Textarea
            placeholder={"Tuliskan alamat anda..."}
            id="address"
            onChange={inputHandler}
            defaultValue={props.val.address}
          ></Textarea>
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
              editAddress();
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
