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
  useToast,
} from "@chakra-ui/react";
import { BiHome, BiCategory, BiFoodMenu, BiUserCircle } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../assets/logo/vertical.png";
import { useState, useEffect } from "react";
import { useFetchCart } from "../hooks/useFetchCart";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalNearestBranch from "./modal-nearest-branch";
import ModalAlamatPengiriman from "./modal-alamat-pengiriman";

export default function SidebarMini(props) {
  const { setLengthCart, nearestBranchSet } = props;
  const cartSelector = useSelector((state) => state.cart);
  const userSelector = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("auth"));
  const nearestBranch = JSON.parse(localStorage.getItem("nearestBranch"));
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
  const nav = useNavigate();
  const toast = useToast();
  const { countAll } = useFetchCart();
  //style untuk setiap menu sidebar
  //merubah warna saat di click
  const [Clicked, setClicked] = useState("");

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

  const handleClick = (e) => {
    setClicked(e.currentTarget.id);
  };
  //get jumlah keranjang
  const getCount = async () => {
    await api()
      .get("/cart", { params: { branch_id: nearestBranch } })
      .then((res) => {
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
            localStorage.removeItem("searchTerm");
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
            akunnav();
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
              if (nearestBranch == null || !nearestBranch) {
                onOpenModal2();
              } else {
                if (
                  selectedAddress &&
                  Object.keys(selectedAddress).length > 0
                ) {
                  onOpenModal1();
                } else {
                  toast({
                    title: "Tentukan alamat pengiriman terlebih dahulu",
                    status: "warning",
                    position: "top",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              }
            }}
          >
            <Flex gap={"10px"}>
              <Icon as={MdOutlineShoppingCart} className="miniIconG" />
            </Flex>
            <Center
              className="minijumlahOrderSidebarG"
              display={cartSelector.total == 0 ? "none" : "center"}
            >
              {cartSelector.total}
            </Center>
          </Flex>
        </Flex>
      </Flex>
      <Modal isOpen={isOpenModal1} onClose={onCloseModal1} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalAlamatPengiriman
            onClose={onCloseModal1}
            isOpen={isOpenModal1}
            selectedAddress={selectedAddress}
          />
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenModal2} onClose={onCloseModal2} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalNearestBranch
            onClose={onCloseModal2}
            isOpen={isOpenModal2}
            selectedAddress={selectedAddress}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
