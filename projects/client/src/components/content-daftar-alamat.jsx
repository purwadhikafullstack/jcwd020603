import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  BiRadioCircle,
  BiRadioCircleMarked,
  BiChevronRight,
} from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import NavbarDaftarAlamat from "./navbar-daftar-alamat";
import ModalAddAddress from "./modal-add-address";
import { api } from "../api/api";
import AddressCard from "./address-card";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function ContentDaftarAlamat() {
  const nav = useNavigate();
  //click radio untuk pilih alamt
  const [Clicked, setClicked] = useState({});
  console.log(Clicked);
  const {
    isOpen: isOpenModal1,
    onOpen: onOpenModal1,
    onClose: onCloseModal1,
  } = useDisclosure();

  //getAll address
  const [allAddress, setAllAddress] = useState([]);
  const getAddress = async () => {
    await api()
      .get("/addressG")
      .then((res) => {
        console.log(res.data.result);
        setAllAddress(res.data.result);
      });
  };
  //edit current address yang dipilih
  const setAddress = async () => {
    const find = await api().patch(`/addressG/current/${Clicked.id}`);

    console.log(find.data);
  };
  //menyimpan alamat yang dipilih
  const [selectedAddress, setSelectedAddress] = useState({});
  const getSelectedAddress = async () => {
    const primary = await api().get("/addressG/primary");
    const selected = await api().get("/addressG/current");
    if (selected.data.result) {
      setSelectedAddress(selected.data.result);
    } else {
      setSelectedAddress(primary.data.result);
    }
  };
  useEffect(() => {
    getAddress();
    getSelectedAddress();
  }, []);
  return (
    <>
      <Box>
        <NavbarDaftarAlamat />
      </Box>
      <Center flexDir={"column"} maxW={"910px"} w={"100%"}>
        <Flex
          maxW={"700px"}
          w={"100%"}
          minH={"100vh"}
          padding={"80px 20px 20px 20px"}
          zIndex={0}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
          rowGap={"20px"}
        >
          <Flex flexDir={"column"} w={"100%"} rowGap={"20px"}>
            {allAddress.map((val) => {
              return (
                <AddressCard
                  val={val}
                  getAddress={getAddress}
                  Clicked={Clicked}
                  setClicked={setClicked}
                  selectedAddress={selectedAddress}
                />
              );
            })}
            <Flex
              w={"100%"}
              h={"52px"}
              borderRadius={"10px"}
              padding={"1px 6px 1px 20px"}
              alignItems={"center"}
              justifyContent={"space-between"}
              bg={"#EBF5E9"}
              color={"#2A960C"}
              onClick={onOpenModal1}
              _hover={{ cursor: "pointer" }}
            >
              <Flex fontSize={"18px"} fontWeight={"500"} letterSpacing={"1px"}>
                TAMBAH ALAMAT PENGIRIMAN
              </Flex>
              <Center w={"50px"} h={"50px"} borderRadius={"50%"}>
                <Icon as={BiChevronRight} fontSize={"28px"} />
              </Center>
            </Flex>
          </Flex>
          <Center
            w={"90%"}
            padding={"5px"}
            bg={"#2A960C"}
            color={"white"}
            fontSize={"16px"}
            fontWeight={"500"}
            borderRadius={"10px"}
            letterSpacing={"1px"}
            onClick={() => {
              setAddress();
              nav("/");
            }}
            _hover={{ cursor: "pointer" }}
          >
            PILIH ALAMAT PENGIRIMAN
          </Center>
        </Flex>
      </Center>
      <Modal isOpen={isOpenModal1} onClose={onCloseModal1} isCentered>
        <ModalOverlay />
        <ModalContent w={"500px"}>
          <ModalAddAddress onClose={onCloseModal1} getAddress={getAddress} />
        </ModalContent>
      </Modal>
    </>
  );
}
