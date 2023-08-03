import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import NavbarPembayaran from "./navbar-pembayaran";
import PembayaranProduk from "./pembayaran-produk";
import { TbPhotoSearch } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalKonfirmasiPesanan from "./modal-konfirmasi-pesanan";
import { api } from "../api/api";
import moment from "moment";

export default function ContentPembayaran() {
  const nav = useNavigate();
  const produkKeranjang = [
    {
      id: 1,
      name: "Minyak Goreng Rose Brand 1 L",
      weight_desc: "1 liter / pouch",
      price: "18.500",
      isBuy1Get1: "True",
      img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/UK-0048989/bimoli_bimoli-minyak-goreng-pouch--2000-ml-_full04.jpg",
    },
    {
      id: 2,
      name: "Bakso Mutiara Karawaci",
      weight_desc: "500 gram / pack",
      price: "36.900",
      isBuy1Get1: "False",
      img: "data:image/jpeg;base64,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",
    },
    {
      id: 3,
      name: "Kelapa Hijau Giggly Coco 1 Pcs Free Hijau Giggly 1 Pcs",
      weight_desc: "1-1,2 kg / pcs",
      price: "34.500",
      isBuy1Get1: "True",
      img: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/8/11/9f6efd1e-440d-46f5-b433-58e244ed9a34.png",
    },
    {
      id: 4,
      name: "Pakcoy",
      weight_desc: "200-250 gram / pack",
      price: "6.300",
      isBuy1Get1: "False",
      img: "https://s0.bukalapak.com/img/08210771742/s-463-463/data.jpeg.webp",
    },
    {
      id: 5,
      name: "Shampoo Cool Menthol Head & Shoulders 400 ml",
      weight_desc: "400 ml / bottle",
      price: "51.800",
      isBuy1Get1: "True",
      img: "data:image/jpeg;base64,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",
    },
  ];
  // get order
  const [orderValue, setOrderValue] = useState([]);
  const getLatestOrder = async () => {
    const get = await api.get("/order/latest");
    setOrderValue(get.data.result);
    console.log(get.data.result);
  };
  useEffect(() => {
    getLatestOrder();
  }, []);
  //tambahkan waktu 15 menit
  const dateValue = moment(orderValue[0]?.date);
  const validDate = dateValue.clone().add(15, "minutes");
  //timer countdown 15 menit
  // const [countdown, setCountdown] = useState(900);
  // const [timer, setTimer] = useState("15 : 00");
  // // Fungsi untuk menghitung waktu mundur
  // const calculateCountdown = () => {
  //   if (countdown > 0) {
  //     const minutes = Math.floor(countdown / 60);
  //     const seconds = countdown % 60;
  //     setTimer(
  //       `${minutes.toString().padStart(2, "0")} : ${seconds
  //         .toString()
  //         .padStart(2, "0")}`
  //     );
  //     setCountdown((prevCountdown) => prevCountdown - 1);
  //   } else {
  //     // clearInterval(interval);
  //     setTimer("Waktu telah habis");
  //   }
  // };

  // useEffect(() => {
  //   const interval = setInterval(calculateCountdown, 500);
  //   return () => clearInterval(interval);
  // }, []);

  // get orderDetail by order id
  const [orderDetVal, setOrderDetVal] = useState([]);
  const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
  const cost = JSON.parse(localStorage.getItem("cost"));
  const getOrderDetail = async () => {
    const get = await api.get("/order-detail/", {
      params: { id: orderValue[0].id },
    });
    setOrderDetVal(get.data.result);
    console.log(get.data.result);
  };
  useEffect(() => {
    getOrderDetail();
  }, [orderValue]);
  //count total harga belanja
  const totalBelanja = selectedItems.map((val, idx) => {
    const price = selectedItems[idx].discounted_price
      ? selectedItems[idx].discounted_price == 50
        ? Number(selectedItems[idx].Stock.Product.price)
        : Number(selectedItems[idx].discounted_price)
      : Number(selectedItems[idx].Stock.Product.price);
    return price * Number(selectedItems[idx].qty);
  });
  const subtotal = totalBelanja.reduce((a, b) => a + b);
  // pengondisian tombol
  const windowWidth = window.innerWidth;
  // menyimpan file gambar
  const inputFileRef = useRef(null);
  // modal setting
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>
        <NavbarPembayaran />
      </Box>
      <Flex maxW={"910px"} w={"100%"} flexDir={"column"}>
        <Flex
          w={"100%"}
          h={"130px"}
          alignItems={"center"}
          padding={"80px 20px 20px"}
          bg={"#2A960C"}
          position={"sticky"}
          top={0}
        >
          <Flex flexDir={"column"} alignItems={"start"}>
            <Flex fontSize={"18px"} fontWeight={"700"} color={"white"}>
              PEMBAYARAN TRANSFER BANK
            </Flex>
            <Flex fontSize={"16px"} fontWeight={"500"} color={"white"}>
              Bank BCA: 76502431 A.n CV Sahabat Sembako
            </Flex>
          </Flex>
        </Flex>
        <Flex
          w={"100%"}
          flexDir={"column"}
          alignItems={"center"}
          paddingBottom={"80px"}
        >
          <Flex
            w={"100%"}
            padding={"20px 20px 0px"}
            flexDir={"column"}
            rowGap={"20px"}
          >
            <Flex
              w={"100%"}
              justifyContent={"space-between"}
              borderBottom={"2px solid grey"}
              paddingBottom={"20px"}
            >
              <Flex flexDir={"column"} fontSize={"18px"}>
                Lakukan Pembayaran Sebelum
                <Flex fontWeight={"500"}>{validDate.format("lll")}</Flex>
              </Flex>
              <Flex
                fontSize={"18px"}
                fontWeight={"500"}
                color={"red"}
                alignItems={"center"}
              >
                14 : 39
              </Flex>
            </Flex>
          </Flex>
          <Flex
            w={"100%"}
            padding={"20px 20px 0px"}
            flexDir={"column"}
            rowGap={"20px"}
          >
            <Flex fontSize={"18px"} fontWeight={"500"}>
              Pesanan Kamu ({orderDetVal.length})
            </Flex>
            {selectedItems.map((val, idx) => {
              return <PembayaranProduk key={idx} index={idx} {...val} />;
            })}
            <Flex justifyContent={"space-between"} w={"100%"} fontSize={"18px"}>
              <Flex>Subtotal</Flex>
              <Flex>Rp {subtotal.toLocaleString("id-ID")}</Flex>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              w={"100%"}
              fontSize={"18px"}
              color={"#2A960C"}
            >
              <Flex>Potongan Harga</Flex>
              <Flex>Rp 0</Flex>
            </Flex>
            <Flex justifyContent={"space-between"} w={"100%"} fontSize={"18px"}>
              <Flex>Biaya Pengiriman</Flex>
              <Flex>Rp {cost.cost[0]?.value.toLocaleString("id-ID")}</Flex>
            </Flex>
            <Flex h={"0.5px"} border={"1px solid lightgrey"} w={"100%"} />
            <Flex
              justifyContent={"space-between"}
              w={"100%"}
              fontSize={"18px"}
              fontWeight={"500"}
              paddingBottom={"20px"}
              borderBottom={"2px solid grey"}
            >
              <Flex>Total Pembayaran</Flex>
              <Flex>
                Rp {(subtotal + cost.cost[0]?.value).toLocaleString("id-ID")}
              </Flex>
            </Flex>
          </Flex>
          <Flex
            w={"100%"}
            flexDir={"column"}
            rowGap={"20px"}
            padding={"20px 20px 20px"}
          >
            <Flex fontSize={"18px"} fontWeight={"500"}>
              Upload Bukti Pembayaran
            </Flex>
            <Flex
              w={"100%"}
              borderBottom={"2px solid grey"}
              paddingBottom={"20px"}
            >
              <Center
                w={"150px"}
                h={"110px"}
                border={"1px solid grey"}
                borderRadius={"10px"}
                flexDir={"column"}
                rowGap={"10px"}
              >
                <Image />
                <Icon as={TbPhotoSearch} fontSize={"40px"} color={"grey"} />
                <Button
                  w={"60px"}
                  h={"20px"}
                  fontSize={"10px"}
                  onClick={() => inputFileRef.current.click()}
                >
                  Select File
                </Button>
              </Center>
              <Input
                type="file"
                border={"none"}
                accept="image/png,image/jpg"
                ref={inputFileRef}
                display={"none"}
              />
            </Flex>
          </Flex>
          <Flex
            w={"100%"}
            alignItems={"center"}
            flexDir={"column"}
            rowGap={"10px"}
          >
            {windowWidth > 600 ? (
              <>
                <Flex w={"100%"} padding={"0px 20px"} gap={"20px"}>
                  <Center
                    className="tombolMerah70"
                    onClick={() => {
                      onOpen();
                      // nav("/order-detail");
                    }}
                  >
                    BATALKAN PESANAN
                  </Center>
                  <Center
                    className="tombolHijau70"
                    onClick={() => {
                      nav("/order-detail");
                    }}
                  >
                    {" "}
                    KONFIRMASI PEMBAYARAN
                  </Center>
                </Flex>
              </>
            ) : (
              <>
                <Center
                  className="tombolMerah70"
                  onClick={() => {
                    onOpen();
                    // nav("/order-detail");
                  }}
                >
                  BATALKAN PESANAN
                </Center>
                <Center
                  className="tombolHijau70"
                  onClick={() => {
                    nav("/order-detail");
                  }}
                >
                  KONFIRMASI PEMBAYARAN
                </Center>
              </>
            )}
          </Flex>
        </Flex>
        <Center
          className="tombolDaftarPesanan"
          onClick={() => {
            nav("/cart");
          }}
        >
          DAFTAR PESANAN
        </Center>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalKonfirmasiPesanan isOpen={isOpen} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
}
