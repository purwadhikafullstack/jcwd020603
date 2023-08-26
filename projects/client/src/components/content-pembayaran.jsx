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
  useToast,
} from "@chakra-ui/react";
import NavbarPembayaran from "./navbar-pembayaran";
import PembayaranProduk from "./pembayaran-produk";
import { TbPhotoSearch } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModalKonfirmasiPesanan from "./modal-konfirmasi-pesanan";
import { api } from "../api/api";
import moment from "moment";
import ModalWaktuPemabayaran from "./modal-waktu-pembayaran";
import "moment/locale/id";

export default function ContentPembayaran() {
  moment.locale("id");
  const nav = useNavigate();
  const order_number = useParams();
  console.log(order_number);
  // get order
  const [orderValue, setOrderValue] = useState([]);
  const [orderDetVal, setOrderDetVal] = useState([]);
  const getLatestOrder = async () => {
    const order = await api().get("/order/latest", {
      params: { order_number: order_number.order_number },
    });
    setOrderValue(order.data.result);
    console.log(order.data.result);

    const orderDetail = await api().get("/order-detail/", {
      params: { id: order.data.result[0]?.id },
    });
    setOrderDetVal(orderDetail.data.result);
    console.log(orderDetail.data.result);
  };
  useEffect(() => {
    getLatestOrder();
  }, []);
  console.log("ini orval", orderValue);

  // menyimpan shipping_cost
  const [shippingCost, setShippingCost] = useState({});
  useEffect(() => {
    if (orderValue.length > 0) {
      const parsedShippingCost = JSON.parse(orderValue[0]?.shipping_cost);
      setShippingCost(parsedShippingCost);
    }
  }, [orderValue]);
  //count total harga belanja

  const calculateSubtotal = () => {
    if (orderValue.length > 0 && shippingCost !== {}) {
      return (
        orderValue[0]?.total -
        (shippingCost?.cost[0]?.value - orderValue[0]?.discount_voucher)
      );
    }
    return 0;
  };
  //tambahkan waktu 15 menit
  const [difference, setDifference] = useState(1);
  const validDate = moment(orderValue[0]?.date).clone();
  const [countdown, setCountdown] = useState("00:00");

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (minutes < 0) minutes = 0;
    if (seconds < 0) seconds = 0;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
  };

  useEffect(() => {
    if (difference >= 0) {
      setCountdown(formatTime(difference));
    } else {
      onOpenModal2();
    }
  }, [difference]);

  useEffect(() => {
    if (orderValue[0]?.date) {
      setInterval(() => {
        setDifference(moment(validDate).diff(moment(), "seconds"));
      }, 1000);
    }
  }, [orderValue[0]?.date]);

  // pengondisian tombol
  const windowWidth = window.innerWidth;
  // menyimpan file gambar
  const inputFileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState();
  const handleFile = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);

    //buat ngemunculin gambar----------
    const reader = new FileReader();
    reader.onload = () => {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
    //--------------------------------
  };
  //post gambar ke database
  const postImage = async () => {
    const formData = new FormData();
    formData.append("paymentImg", selectedFile);
    formData.append("orderDetVal", JSON.stringify(orderDetVal));
    console.log(orderValue[0]?.id);
    const post = await api().patch(
      `/order/image/${orderValue[0]?.id}`,
      formData
    );
    console.log(post.data);
    nav(`/orders/${orderValue[0]?.order_number}`);
  };
  //cancel order
  const cancelOrder = async () => {
    try {
      const cancel = await api().patch(`/order/cancel/${orderValue[0]?.id}`, {
        orderDetVal,
      });
      console.log(cancel.data);
      return nav("/orders");
    } catch (err) {
      console.log(err);
    }
  };

  // modal setting
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
                {countdown}
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
            {orderDetVal.map((val, idx) => {
              return <PembayaranProduk key={idx} index={idx} {...val} />;
            })}
            <Flex justifyContent={"space-between"} w={"100%"} fontSize={"18px"}>
              <Flex>Subtotal</Flex>
              <Flex>Rp {calculateSubtotal().toLocaleString("id-ID")}</Flex>
            </Flex>

            <Flex justifyContent={"space-between"} w={"100%"} fontSize={"18px"}>
              <Flex>Biaya Pengiriman</Flex>
              <Flex>
                Rp{" "}
                {shippingCost !== {}
                  ? shippingCost.cost[0].value.toLocaleString("id-ID")
                  : 0}
              </Flex>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              w={"100%"}
              fontSize={"18px"}
              color={"#2A960C"}
            >
              <Flex>Potongan Harga</Flex>
              <Flex>
                - Rp{" "}
                {orderValue[0]?.discount_voucher != 0 &&
                orderValue[0]?.discount_voucher != null &&
                orderValue[0]?.discount_voucher
                  ? orderValue[0]?.discount_voucher.toLocaleString("id-ID")
                  : 0}
              </Flex>
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
              <Flex>Rp {orderValue[0]?.total.toLocaleString("id-ID")}</Flex>
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
                w={selectedFile ? "300px" : "150px"}
                h={selectedFile ? "100%" : "110px"}
                border={"1px solid grey"}
                borderRadius={"10px"}
                flexDir={"column"}
                rowGap={"10px"}
                padding={"10px"}
              >
                {selectedFile ? (
                  <>
                    <Image
                      src={imgUrl}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"contain"}
                    />
                    <Button
                      w={"60px"}
                      h={"20px"}
                      fontSize={"10px"}
                      onClick={() => inputFileRef.current.click()}
                      onChange={handleFile}
                    >
                      Select File
                    </Button>
                  </>
                ) : (
                  <>
                    <Icon as={TbPhotoSearch} fontSize={"40px"} color={"grey"} />
                    <Button
                      w={"60px"}
                      h={"20px"}
                      fontSize={"10px"}
                      onClick={() => inputFileRef.current.click()}
                      onChange={handleFile}
                    >
                      Select File
                    </Button>
                  </>
                )}
              </Center>
              <Input
                type="file"
                border={"none"}
                accept="image/png,image/jpg"
                ref={inputFileRef}
                onChange={handleFile}
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
                      onOpenModal1();
                    }}
                  >
                    BATALKAN PESANAN
                  </Center>
                  <Center
                    className="tombolHijau70"
                    onClick={() => {
                      postImage();
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
                    onOpenModal1();
                  }}
                >
                  BATALKAN PESANAN
                </Center>
                <Link to={`/orders/${orderValue[0]?.order_number}`}>
                  <Center
                    className="tombolHijau70"
                    onClick={() => {
                      postImage();
                    }}
                  >
                    KONFIRMASI PEMBAYARAN
                  </Center>
                </Link>
              </>
            )}
          </Flex>
        </Flex>
        <Center
          className="tombolDaftarPesanan"
          onClick={() => {
            nav("/orders");
          }}
        >
          DAFTAR PESANAN
        </Center>
      </Flex>
      <Modal isOpen={isOpenModal1} onClose={onCloseModal1} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalKonfirmasiPesanan
            isOpen={isOpenModal1}
            onClose={onCloseModal1}
            cancelOrder={cancelOrder}
          />
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenModal2} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalWaktuPemabayaran
            isOpen={isOpenModal2}
            onClose={onCloseModal2}
            cancelOrder={cancelOrder}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
