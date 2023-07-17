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
} from "@chakra-ui/react";
import { BiHome, BiCategory, BiFoodMenu, BiUserCircle } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import "../css/indexG.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import ModalProduct from "./modal-product";

export default function Footer() {
  const nav = useNavigate();
  const [Clicked, setClicked] = useState();
  const handleClick = (e) => {
    setClicked(e.currentTarget.id);
  };
  //modal testing
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                // nav("/product");
              }}
            >
              <Icon
                as={MdOutlineShoppingCart}
                fontSize={"30px"}
                color={"white"}
              />
            </Center>
            <Center className="jumlahOrderG">1</Center>
          </Flex>
          <Flex maxW={"40%"} w={"100%"}>
            <Flex
              id="pesanan"
              className="IconG"
              color={Clicked == "pesanan" ? "#118925" : "black"}
              onClick={(e) => {
                handleClick(e);
                onOpen();
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
              }}
            >
              <Icon as={BiUserCircle} fontSize={"24px"} />
              <Box fontSize={"14px"}>Akun</Box>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </>
  );
}
