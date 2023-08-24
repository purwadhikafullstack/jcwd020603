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
import logo from "../assets/logo/vertical.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalProduct from "./modal-product";

export default function SidebarMini() {
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
      <Flex className="miniflexSidebarTerluarG">
        <Center w={"100%"} h={"123px"}>
          <Image src={logo} />
        </Center>
        <Flex
          id="beranda"
          className="minimenuStyleG"
          gap={"10px"}
          onClick={(e) => {
            handleClick(e);
            nav("/");
          }}
          bg={Clicked == "beranda" ? "#ECFFF4" : "white"}
          color={Clicked == "beranda" ? "#199950" : "black"}
        >
          <Icon as={BiHome} className="miniIconG" />
        </Flex>

        <Flex
          id="kategori"
          className="minimenuStyleG"
          gap={"10px"}
          onClick={(e) => {
            handleClick(e);
            nav("/product");
          }}
          bg={Clicked == "kategori" ? "#ECFFF4" : "white"}
          color={Clicked == "kategori" ? "#199950" : "black"}
        >
          <Icon as={BiCategory} className="miniIconG" />
        </Flex>
        <Flex
          id="pesanan"
          className="minimenuStyleG"
          gap={"10px"}
          onClick={(e) => {
            handleClick(e);
            nav("/order-list");
          }}
          bg={Clicked == "pesanan" ? "#ECFFF4" : "white"}
          color={Clicked == "pesanan" ? "#199950" : "black"}
        >
          <Icon as={BiFoodMenu} className="miniIconG" />
        </Flex>
        <Flex
          id="akun"
          className="minimenuStyleG"
          gap={"10px"}
          onClick={(e) => {
            handleClick(e);
          }}
          bg={Clicked == "akun" ? "#ECFFF4" : "white"}
          color={Clicked == "akun" ? "#199950" : "black"}
        >
          <Icon as={BiUserCircle} className="miniIconG" />
        </Flex>
        <Flex
          w={"100%"}
          h={"100px"}
          alignItems={"end"}
          justifyContent={"center"}
        >
          <Flex
            id="keranjang"
            className="minimenuSidebarCartG"
            onClick={() => {
              nav("/cart");
            }}
          >
            <Flex gap={"10px"}>
              <Icon as={MdOutlineShoppingCart} className="miniIconG" />
            </Flex>
            <Center className="minijumlahOrderSidebarG">1</Center>
          </Flex>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"700px"} borderRadius={"15px"}>
          <ModalProduct isOpen={isOpen} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
}
