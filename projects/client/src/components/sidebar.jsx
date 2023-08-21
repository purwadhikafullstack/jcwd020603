import {
  Box,
  Flex,
  Icon,
  Center,
  Image,
  useDisclosure,
  useToast,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { BiHome, BiCategory, BiFoodMenu, BiUserCircle } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../assets/logo/horizontal.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { warning } from "framer-motion";
import { api } from "../api/api";
import ModalAlamatPengiriman from "./modal-alamat-pengiriman";
// import ModalProduct from "./modal-product";

export default function Sidebar(props) {
  const { setLengthCart, setGetFunction } = props;
  const user = JSON.parse(localStorage.getItem("auth"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();
  const toast = useToast();
  //style untuk setiap menu sidebar
  //merubah warna saat di click
  const [Clicked, setClicked] = useState("");

  const akunnav = () => {
    console.log(user);
    if (user) {
      nav("/profile");
    } else {
      toast({
        title: "Maaf Anda belum login, silahkan login dulu",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      nav("/login");
    }
  };

  const handleClick = (e) => {
    setClicked(e.currentTarget.id);
  };
  //get jumlah keranjang
  const [countAll, setCountAll] = useState(0);
  const getCount = async () => {
    await api()
      .get("/cart")
      .then((res) => {
        setCountAll(res.data.total);
        setLengthCart(res.data.total);
        console.log(res.data.result);
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
    getCount();
    getSelectedAddress();
  }, []);

  return (
    <>
      <Flex
        className="flexSidebarTerluarG"
        display={{
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: props.navLeft == "minus" || props.navLeft == "" ? "none" : "flex",
          base:
            props.navLeft == "minus" || props.navLeft == "" ? "none" : "flex",
        }}
      >
        <Flex w={"100%"} h={"123px"} padding={"25px 10px"}>
          <Image src={logo} />
        </Flex>
        <Flex
          id="beranda"
          className="menuStyleG"
          gap={"10px"}
          onClick={(e) => {
            handleClick(e);
            nav("/");
          }}
          bg={Clicked == "beranda" ? "#ECFFF4" : "white"}
          color={Clicked == "beranda" ? "#199950" : "black"}
        >
          <Icon as={BiHome} fontSize={"28px"} />
          Beranda
        </Flex>

        <Flex
          id="kategori"
          className="menuStyleG"
          gap={"10px"}
          onClick={(e) => {
            handleClick(e);
            nav("product");
          }}
          bg={Clicked == "kategori" ? "#ECFFF4" : "white"}
          color={Clicked == "kategori" ? "#199950" : "black"}
        >
          <Icon as={BiCategory} fontSize={"28px"} />
          Kategori
        </Flex>
        <Flex
          id="pesanan"
          className="menuStyleG"
          gap={"10px"}
          onClick={(e) => {
            handleClick(e);
            nav("/orders");
          }}
          bg={Clicked == "pesanan" ? "#ECFFF4" : "white"}
          color={Clicked == "pesanan" ? "#199950" : "black"}
        >
          <Icon as={BiFoodMenu} fontSize={"28px"} />
          Pesanan
        </Flex>
        <Flex
          id="akun"
          className="menuStyleG"
          gap={"10px"}
          onClick={(e) => {
            handleClick(e);
            akunnav();
          }}
          bg={Clicked == "akun" ? "#ECFFF4" : "white"}
          color={Clicked == "akun" ? "#199950" : "black"}
        >
          <Icon as={BiUserCircle} fontSize={"28px"} />
          Akun
        </Flex>
        <Flex
          w={"100%"}
          h={"200px"}
          alignItems={"end"}
          justifyContent={"center"}
        >
          <Flex
            id="keranjang"
            className="menuSidebarCartG"
            onClick={() => {
              if (selectedAddress && Object.keys(selectedAddress).length > 0) {
                onOpen();
              } else {
                toast({
                  title: "Tentukan alamat pengiriman terlebih dahulu",
                  status: "warning",
                  duration: 3000,
                  isClosable: true,
                });
              }
            }}
          >
            <Flex gap={"10px"}>
              <Icon as={MdOutlineShoppingCart} fontSize={"28px"} />
              Keranjang
            </Flex>
            <Center
              className="jumlahOrderSidebarG"
              display={countAll == 0 ? "none" : "center"}
            >
              {countAll}
            </Center>
          </Flex>
        </Flex>
      </Flex>
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
