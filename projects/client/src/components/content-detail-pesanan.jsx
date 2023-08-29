import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import NavbarDetailPesanan from "./navbar-detail-pesanan";
import { FaRegCheckCircle, FaRegClock, FaRegTimesCircle } from "react-icons/fa";
import PembayaranProduk from "./pembayaran-produk";
import DetailPembayaran from "./detail-info-pembayaran";
import DetailPengiriman from "./detail-info-pengiriman";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModalPesananSelesai from "./modal-pesanan-selesai";

export default function ContentDetailPesanan() {
  const nav = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const order_number = useParams();
  // get order
  const [orderDetVal, setOrderDetVal] = useState([]);
  const [peraturan, setPeraturan] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const getLatestOrder = async () => {
    console.log("masuk");
    setIsLoading(true);
    const order = await api().get("/order/specific", {
      params: { order_number: order_number.order_number },
    });
    setPeraturan(order.data.result);
    console.log("ORDER VALUE", order.data.result);

    console.log(order.data.result.id);
    const orderDetail = await api().get("/order-detail/", {
      params: { id: order.data.result.id || order.data.result[0].id },
    });
    setOrderDetVal(orderDetail.data.result);
    console.log(orderDetail.data.result);
    return setIsLoading(false);
  };
  useEffect(() => {
    getLatestOrder();
  }, [order_number]);
  // menyimpan shipping_cost
  const [shippingCost, setShippingCost] = useState({});
  const [calculateSubtotal, setCalculateSubtotal] = useState(0);
  console.log("ini val peraturan", peraturan);
  useEffect(() => {
    if (Object.keys(peraturan).length > 0) {
      const parsedShippingCost = JSON.parse(peraturan?.shipping_cost);
      setShippingCost(parsedShippingCost);
    }
  }, [peraturan]);
  //count total harga belanja
  useEffect(() => {
    if (Object.keys(peraturan).length > 0 && shippingCost != {}) {
      return setCalculateSubtotal(
        peraturan?.total -
          (shippingCost?.cost[0]?.value - peraturan?.discount_voucher)
      );
    } else {
      return setCalculateSubtotal(0);
    }
  }, [shippingCost]);
  console.log(calculateSubtotal);
  console.log("load", isLoading);
  return (
    <>
      <Box>
        <NavbarDetailPesanan />
      </Box>
      <Center w={"100vw"}>
        {isLoading ? (
          <Center h={"100vh"}>
            <Spinner />
          </Center>
        ) : (
          <Flex
            maxW={"910px"}
            w={"100%"}
            flexDir={"column"}
            rowGap={"10px"}
            padding={"70px 0px 20px"}
          >
            <Flex className="boxShadow">
              <Flex>Status</Flex>
              <Flex justifyContent={"space-between"}>
                <Flex w={"100%"} flexDir={"column"}>
                  <Flex
                    fontSize={"14px"}
                    alignItems={"center"}
                    gap={"10px"}
                    fontWeight={"500"}
                  >
                    {peraturan?.status == "Dibatalkan" ? (
                      <Icon as={FaRegTimesCircle} color={"red"} />
                    ) : peraturan?.status == "Pesanan Dikonfirmasi" ? (
                      <Icon as={FaRegCheckCircle} color={"green"} />
                    ) : (
                      <Icon as={FaRegClock} color={"yellow.600"} />
                    )}

                    {peraturan?.status}
                  </Flex>
                  <Flex fontSize={"12px"} paddingLeft={"25px"}>
                    {moment(peraturan?.updatedAt).format("lll")}
                  </Flex>
                </Flex>
                <Button
                  colorScheme="green"
                  fontSize={"12px"}
                  display={peraturan?.status == "Dikirim" ? "flex" : "none"}
                  onClick={() => onOpen()}
                >
                  Konfirmasi Pesanan
                </Button>
              </Flex>
            </Flex>
            <Flex className="boxShadow">
              <Flex
                w={"100%"}
                fontSize={"14px"}
                alignItems={"center"}
                flexDir={"column"}
                rowGap={"10px"}
              >
                <Flex w={"100%"} justifyContent={"space-between"}>
                  <Flex>Order Number:</Flex>
                  <Flex>{peraturan?.order_number}</Flex>
                </Flex>
                <Flex w={"100%"} justifyContent={"right"}>
                  <Button
                    colorScheme="green"
                    fontSize={"12px"}
                    h={"25px"}
                    display={
                      peraturan?.status == "Pesanan Dikonfirmasi"
                        ? "flex"
                        : "none"
                    }
                  >
                    <Link
                      to={`/invoice/${peraturan?.order_number}`}
                      target="_blank"
                    >
                      Faktur Pembelian
                    </Link>
                  </Button>
                </Flex>
                <Flex w={"100%"} justifyContent={"space-between"}>
                  <Flex>Tanggal & Waktu Pemesanan:</Flex>
                  <Flex>{moment(peraturan?.createdAt).format("lll")}</Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex className="boxShadow">
              <Flex fontSize={"18px"} fontWeight={"500"}>
                Pesanan Kamu ({orderDetVal.length})
              </Flex>
              {orderDetVal.map((val, idx) => {
                return <PembayaranProduk key={idx} index={idx} {...val} />;
              })}
              <Flex
                justifyContent={"space-between"}
                w={"100%"}
                fontSize={"18px"}
                fontWeight={"500"}
              >
                <Flex>Total Belanja</Flex>
                <Flex> Rp {calculateSubtotal.toLocaleString("id-ID")}</Flex>
              </Flex>
            </Flex>
            {peraturan && shippingCost && (
              <DetailPengiriman
                peraturan={peraturan}
                shippingCost={shippingCost}
              />
            )}
            {peraturan && shippingCost && calculateSubtotal && (
              <DetailPembayaran
                peraturan={peraturan}
                shippingCost={shippingCost}
                calculateSubtotal={calculateSubtotal}
              />
            )}
          </Flex>
        )}
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalPesananSelesai
            isOpen={isOpen}
            onClose={onClose}
            peraturan={peraturan}
            getLatestOrder={getLatestOrder}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
