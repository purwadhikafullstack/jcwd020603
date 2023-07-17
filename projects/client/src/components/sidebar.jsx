import {
  Box,
  Flex,
  Icon,
  Center,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { BiHome, BiCategory, BiFoodMenu, BiUserCircle } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../assets/logo/horizontal.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import ModalProduct from "./modal-product";

export default function Sidebar() {
  const nav = useNavigate();
  //style untuk setiap menu sidebar
  //merubah warna saat di click
  const [Clicked, setClicked] = useState("");
  const handleClick = (e) => {
    setClicked(e.currentTarget.id);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex className="flexSidebarTerluarG">
        <Flex w={"100%"} h={"123px"} padding={"25px 10px"}>
          <Image src={logo} />
        </Flex>
        <Flex
          id="beranda"
          className="menuStyleG"
          gap={"10px"}
          onClick={(e) => {
            handleClick(e);
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
            onOpen();
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
              nav("/product");
            }}
          >
            <Flex gap={"10px"}>
              <Icon as={MdOutlineShoppingCart} fontSize={"28px"} />
              Keranjang
            </Flex>
            <Center className="jumlahOrderSidebarG">1</Center>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
