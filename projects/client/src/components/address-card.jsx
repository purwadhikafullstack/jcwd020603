import {
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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  BiRadioCircle,
  BiRadioCircleMarked,
  BiChevronRight,
} from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import ModalEditAddress from "./modal-edit-address";
import { api } from "../api/api";
import ModalKonfirmasiAlamat from "./modal-konfirmasi-alamat";
import { useDispatch, useSelector } from "react-redux";

export default function AddressCard({ val, getAddress, Clicked, setClicked }) {
  const {
    isOpen: isOpenModal1,
    onOpen: onOpenModal1,
    onClose: onCloseModal1,
  } = useDisclosure();
  const {
    isOpen: isOpenModal2,
    onOpen: onOpenModal2,
    onClose: onCloseModal2,
  } = useDisclosure();
  const address = useSelector((state) => state.address);
  console.log(address);
  // Check if address.id exists in localStorage
  const isAddressActiveInLocalStorage = localStorage.getItem("address")
    ? JSON.parse(localStorage.getItem("address")).id === val.id
    : false;
  // Check if the current address is clicked
  const isAddressClicked = Clicked.id == val.id;

  // Determine if BiRadioCircleMarked should be active
  const isBiRadioCircleMarkedActive =
    isAddressActiveInLocalStorage || isAddressClicked;

  //function delete address
  const toast = useToast();
  const deleteAddress = async () => {
    try {
      await api()
        .delete(`/addressG/${val.id}`)
        .then((res) => {
          console.log(res.data.message);
          getAddress();
          toast({
            title: res.data.message,
            status: "success",
            position: "top",
            duration: 3000,
          });
        });
    } catch (err) {
      const response = err.response;
      toast({
        title: response.data.message,
        status: "error",
        position: "top",
        duration: 3000,
      });
    }
  };
  //function dispatch address
  // const dispatch = useDispatch();
  // const addressReducer = () => {
  //   if (isAddressClicked) {
  //     localStorage.removeItem("address");
  //   }
  //   dispatch({
  //     type: "address",
  //     payload: Clicked,
  //   });
  // };
  // useEffect(() => {
  //   addressReducer();
  // }, [Clicked]);
  useEffect(() => {
    if (val.current_address) {
      setClicked(val);
    } else if (!val.current_address && val.is_primary) {
      setClicked(val);
    }
  }, []);
  return (
    <>
      <Flex
        w={"100%"}
        border={"1px solid lightgrey"}
        borderRadius={"10px"}
        padding={"16px"}
        gap={"16px"}
        onClick={() => {
          setClicked(val);
        }}
      >
        <Icon
          as={isBiRadioCircleMarkedActive ? BiRadioCircleMarked : BiRadioCircle}
          fontSize={"40px"}
          color={"#2A960C"}
        />
        <Flex w={"100%"} flexDir={"column"} rowGap={"10px"}>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Flex fontSize={"14px"} fontWeight={"500"}>
              {val.address_name} | {val.address_phone}
            </Flex>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<SlOptionsVertical />}
                variant="ghost"
              />
              <MenuList>
                <MenuItem onClick={onOpenModal2}>Edit Alamat</MenuItem>
                <MenuItem onClick={onOpenModal1}>Hapus Alamat</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Flex w={"100%"} fontSize={"14px"} flexDir={"column"}>
            <Flex>
              {val.address}, {val.district}
            </Flex>
            <Flex>
              {val.City?.type} {val.City?.city_name}, {val.City?.postal_code}
            </Flex>
          </Flex>
          {/* <Flex w={"100%"} fontSize={"14px"}>
                        {val.notes}
                      </Flex> */}
        </Flex>
      </Flex>
      <Modal isOpen={isOpenModal2} onClose={onCloseModal2} isCentered>
        <ModalOverlay />
        <ModalContent w={"500px"}>
          <ModalEditAddress
            onClose={onCloseModal2}
            val={val}
            getAddress={getAddress}
          />
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenModal1} onClose={onCloseModal1} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalKonfirmasiAlamat
            isOpen={isOpenModal1}
            onClose={onCloseModal1}
            deleteAddress={deleteAddress}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
