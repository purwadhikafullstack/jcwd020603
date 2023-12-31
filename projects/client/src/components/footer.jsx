import {
  Box,
  Center,
  Container,
  Flex,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  flexbox,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BiHome, BiCategory, BiFoodMenu, BiUserCircle } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import "../css/indexG.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import ModalProduct from "./modal-product";
import { api } from "../api/api";
import ModalAlamatPengiriman from "./modal-alamat-pengiriman";
import { useSelector } from "react-redux";

export default function Footer(props) {
  const nav = useNavigate();
  const { setLengthCart, nearestBranchSet } = props;
  const cartSelector = useSelector((state) => state.cart);
  const userSelector = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("auth"));
  const [Clicked, setClicked] = useState();
  const handleClick = (e) => {
    setClicked(e.currentTarget.id);
  };
  const toast = useToast();
  //modal testing
  const { isOpen, onOpen, onClose } = useDisclosure();
  //function login
  const akunnav = () => {
    if (user) {
      nav("/profile");
    } else {
      toast({
        title: "Maaf Anda belum login, silahkan login dulu",
        status: "warning",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      nav("/login");
    }
  };
  //get jumlah keranjang
  const [countAll, setCountAll] = useState(0);
  const getCount = async () => {
    await api()
      .get("/cart")
      .then((res) => {
        setCountAll(res.data.total);
        setLengthCart(res.data.total);
      });
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
    if (nearestBranchSet) {
      getCount();
    }
  }, [nearestBranchSet]);

  useEffect(() => {
    getSelectedAddress();
  }, [userSelector.user_name]);

  return (
    <>
      <Center>
        <Flex className="flexterluarG">
          <Flex maxW={"40%"} w={"100%"}>
            <Flex
              id="beranda"
              className="IconG"
              color={Clicked == "beranda" ? "#118925" : "black"}
              onClick={(e) => {
                handleClick(e);
                nav("/");
                localStorage.removeItem("searchTerm");
              }}
              zIndex={2}
            >
              <Icon as={BiHome} fontSize={"24px"} />
              <Box fontSize={"14px"}>Beranda</Box>
            </Flex>
            <Flex
              id="kategori"
              className="IconG"
              color={Clicked == "kategori" ? "#118925" : "black"}
              onClick={(e) => {
                handleClick(e);
                nav("/product");
              }}
            >
              <Icon as={BiCategory} fontSize={"24px"} />
              <Box fontSize={"14px"}>Kategori</Box>
            </Flex>
          </Flex>
          <Flex flexDir={"column"} alignItems={"end"} w={"60px"} h={"100%"}>
            <Center
              className="cartCircleG"
              onClick={() => {
                if (
                  selectedAddress &&
                  Object.keys(selectedAddress).length > 0
                ) {
                  onOpen();
                } else {
                  toast({
                    title: "Tentukan alamat pengiriman terlebih dahulu",
                    status: "warning",
                    position: "top",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              }}
            >
              <Icon
                as={MdOutlineShoppingCart}
                fontSize={"30px"}
                color={"white"}
              />
            </Center>
            <Center
              className="jumlahOrderG"
              display={cartSelector.total == 0 ? "none" : "center"}
            >
              {cartSelector.total}
            </Center>
          </Flex>
          <Flex maxW={"40%"} w={"100%"}>
            <Flex
              id="pesanan"
              className="IconG"
              color={Clicked == "pesanan" ? "#118925" : "black"}
              onClick={(e) => {
                handleClick(e);
                nav("/orders");
              }}
            >
              <Icon as={BiFoodMenu} fontSize={"24px"} />
              <Box fontSize={"14px"}>Pesanan</Box>
            </Flex>
            <Flex
              id="akun"
              className="IconG"
              color={Clicked == "akun" ? "#118925" : "black"}
              onClick={(e) => {
                handleClick(e);
                akunnav();
              }}
            >
              <Icon as={BiUserCircle} fontSize={"24px"} />
              <Box fontSize={"14px"}>Akun</Box>
            </Flex>
          </Flex>
        </Flex>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalAlamatPengiriman
            onClose={onClose}
            isOpen={isOpen}
            selectedAddress={selectedAddress}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
