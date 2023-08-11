import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import AdminNavbarOrder from "./admin-navbar-order";
import PembayaranProduk from "./pembayaran-produk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import ModalAdminDikirim from "./modal-admin-dikirim";
import ModalAdminDitolak from "./modal-admin-ditolak";

export default function AdminOrderDetail() {
  const order_number = useParams();
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
  const SelectorValue = [
    { value: "Menunggu Pembayaran" },
    { value: "Menunggu Konfirmasi Pembayaran" },
    { value: "Pesanan Diproses" },
    { value: "Pesanan Dikirim" },
    { value: "Pesanan Dikonfirmasi" },
    { value: "Pesanan Dibatalkan" },
  ];
  //rubah tampilan selector
  const [changeStatus, setChangeStatus] = useState(false);
  //get orderValue
  const [orderValue, setOrderValue] = useState({});
  const [orderDetVal, setOrderDetVal] = useState({});

  const fetchOrder = async () => {
    try {
      const get = await api().get("/order/specific", {
        params: { order_number: order_number.order_number },
      });
      setOrderValue(get.data.result);
      console.log(get.data.result);

      const getDetail = await api().get("/order-detail/", {
        params: { id: get.data.result.id },
      });
      setOrderDetVal(getDetail.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  console.log("ORDER VALUE", orderValue);
  console.log("ORDER DETAIL", orderDetVal);
  //rincian pembayaran
  const totalBelanja =
    orderValue.total - (orderValue.shipping_cost - orderValue.discount_voucher);
  const totalPembayaran =
    totalBelanja + orderValue.shipping_cost - orderValue.discount_voucher;
  return (
    <>
      <Box position={"sticky"}>
        <AdminNavbarOrder />
      </Box>
      <Flex
        w={"100%"}
        padding={"20px"}
        marginTop={"60px"}
        bg={"#FFF7E7"}
        flexDir={"column"}
        rowGap={"20px"}
        borderTopLeftRadius={"20px"}
      >
        <Flex fontSize={"24px"} fontWeight={"700"}>
          Order {orderValue?.order_number}
        </Flex>
        <Flex w={"100%"} gap={"20px"}>
          <Flex
            w={"50%"}
            borderRadius={"10px"}
            bg={"white"}
            flexDir={"column"}
            rowGap={"10px"}
            fontSize={"16px"}
            padding={"10px"}
          >
            <Flex flexDir={"column"} rowGap={"10px"}>
              <Flex fontWeight={"700"}>Status</Flex>
              {changeStatus ? (
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Select w={"70%"} placeholder=" Pilih Status Pesanan">
                    {SelectorValue.map((val) => {
                      return (
                        <>
                          <option value={val.value}>{val.value}</option>;
                        </>
                      );
                    })}
                  </Select>
                  <Flex
                    fontSize={"10px"}
                    color={"gray"}
                    onClick={() => {
                      setChangeStatus(!changeStatus);
                    }}
                  >
                    UBAH
                  </Flex>
                </Flex>
              ) : (
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Flex color={"red"} fontWeight={"500"}>
                    {orderValue.status}
                  </Flex>
                  <Flex
                    fontSize={"10px"}
                    color={"gray"}
                    onClick={() => {
                      setChangeStatus(!changeStatus);
                    }}
                  >
                    UBAH STATUS
                  </Flex>
                </Flex>
              )}
            </Flex>
            <Flex
              w={"100%"}
              alignItems={"center"}
              fontSize={"16px"}
              flexDir={"column"}
              rowGap={"10px"}
            >
              <Flex fontWeight={"500"}>Bukti Pembayaran</Flex>
              <Center
                w={"70%"}
                h={"300px"}
                border={"2px solid gray"}
                borderRadius={"10px"}
              >
                <Image src={orderValue.order_transfer_url} />
              </Center>
              <Flex w={"100%"} gap={"30px"} justifyContent={"center"}>
                <Button colorScheme="green" w={"81px"} onClick={onOpenModal1}>
                  Terima
                </Button>
                <Button colorScheme="red" w={"81px"} onClick={onOpenModal2}>
                  Tolak
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            w={"50%"}
            borderRadius={"10px"}
            bg={"white"}
            flexDir={"column"}
            rowGap={"10px"}
            fontSize={"16px"}
            padding={"10px"}
          >
            <Flex fontWeight={"700"}>List Pesanan</Flex>
            <Flex flexDir={"column"} rowGap={"20px"}>
              {orderDetVal &&
                orderDetVal.length > 0 &&
                orderDetVal.map((val, idx) => {
                  return <PembayaranProduk key={idx} index={idx} {...val} />;
                })}
              <Flex
                w={"100%"}
                fontSize={"16px"}
                fontWeight={"500"}
                flexDir={"column"}
              >
                <Flex justifyContent={"space-between"} w={"100%"}>
                  <Flex>Total Belanja</Flex>
                  <Flex>Rp {totalBelanja.toLocaleString("id-ID")}</Flex>
                </Flex>
                <Flex justifyContent={"space-between"} w={"100%"}>
                  <Flex>Biaya Pengiriman</Flex>
                  <Flex>
                    Rp{" "}
                    {orderValue.shipping_cost
                      ? orderValue.shipping_cost.toLocaleString("id-ID")
                      : 0}
                  </Flex>
                </Flex>
                <Flex
                  justifyContent={"space-between"}
                  w={"100%"}
                  color={"#2A960C"}
                >
                  <Flex>Potongan</Flex>
                  <Flex>
                    - Rp{" "}
                    {orderValue.discount_voucher
                      ? orderValue.discount_voucher.toLocaleString("id-ID")
                      : 0}
                  </Flex>
                </Flex>
                <Flex justifyContent={"space-between"} w={"100%"}>
                  <Flex>Total Pembayaran</Flex>
                  <Flex>Rp {totalPembayaran.toLocaleString("id-ID")}</Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Modal isOpen={isOpenModal1} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalAdminDikirim isOpen={isOpenModal1} onClose={onCloseModal1} />
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenModal2} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalAdminDitolak isOpen={isOpenModal2} onClose={onCloseModal2} />
        </ModalContent>
      </Modal>
    </>
  );
}
