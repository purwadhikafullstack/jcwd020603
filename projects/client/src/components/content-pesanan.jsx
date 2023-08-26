import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import NavbarPesanan from "./navbar-pesanan";
import { LuListX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import moment from "moment";
import ModalPesananSelesai from "./modal-pesanan-selesai";

export default function ContentPesanan() {
  const windowWidth = window.innerWidth;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();
  //filter value
  const filterValue = [
    { value: "", name: "Semua" },
    {
      value: "Menunggu Pembayaran,Menunggu Konfirmasi Pembayaran",
      name: "Menunggu Pembayaran",
    },
    { value: "Diproses,Dikirim", name: "Pesanan Berlangsung" },
    { value: "Pesanan Dikonfirmasi,Dibatalkan", name: "Pesanan Selesai" },
  ];
  //get all order user
  const [allOrders, setAllOrders] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(filter);
  const getOrders = async () => {
    setIsLoading(true);
    const get = await api().get("/order", { params: { status: filter } });
    setAllOrders(get.data.result);
    console.log(get.data.result);
    setIsLoading(false);
  };
  useEffect(() => {
    getOrders();
  }, []);
  useEffect(() => {
    getOrders();
  }, [filter]);
  // menyimpan id untuk modal
  const [orderId, setOrderId] = useState({ id: "", order_number: "" });
  return (
    <>
      <Box>
        <NavbarPesanan />
      </Box>
      <Center maxW={"910px"} w={"100%"} alignItems={"flex-start"}>
        <Flex maxW={"910px"} w={"100%"} flexDir={"column"}>
          <Flex
            className="statusRowG"
            position={"sticky"}
            top={0}
            zIndex={9}
            bg={"white"}
          >
            <Flex gap={"20px"} minW={"675px"} w={"100%"}>
              {filterValue.map((val) => {
                return (
                  <Center
                    h={"35px"}
                    w={"200px"}
                    padding={"10px"}
                    borderRadius={"10px"}
                    border={"1px solid lightgrey"}
                    fontSize={"12px"}
                    fontWeight={"500"}
                    bg={filter == val.value ? "green" : "white"}
                    color={filter == val.value ? "white" : "black"}
                    _hover={{
                      backgroundColor: "green",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setFilter(val.value);
                    }}
                  >
                    {val.name}
                  </Center>
                );
              })}
            </Flex>
          </Flex>
          <Flex padding={"20px"} w={"100%"} flexDir={"column"} rowGap={"20px"}>
            {isLoading ? (
              <Center h={"100vh"}>
                <Spinner />
              </Center>
            ) : allOrders.length ? (
              allOrders.map((val, idx) => {
                let zIndexCounter = val.Order.length;
                return (
                  <>
                    <Flex
                      w={"100%"}
                      borderRadius={"10px"}
                      border={"1px solid lightgrey"}
                      flexDir={"column"}
                    >
                      <Flex
                        padding={"16px"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        w={"100%"}
                        borderBottom={"1px solid lightgrey"}
                      >
                        <Flex
                          fontSize={"12px"}
                          fontWeight={"500"}
                          padding={"3px"}
                          borderRadius={"5px"}
                          bg={
                            val.status == "Menunggu Pembayaran" ||
                            val.status == "Menunggu Konfirmasi Pembayaran"
                              ? "#fdefce"
                              : val.status == "Dibatalkan"
                              ? "#f7d1d5"
                              : val.status == "Pesanan Dikonfirmasi"
                              ? "#ebf5e9"
                              : "#cbe4fb"
                          }
                          color={
                            val.status == "Menunggu Pembayaran" ||
                            val.status == "Menunggu Konfirmasi Pembayaran"
                              ? "#ffb21c"
                              : val.status == "Dibatalkan"
                              ? "red"
                              : val.status == "Pesanan Dikonfirmasi"
                              ? "#2a960c"
                              : "#007bfe"
                          }
                        >
                          {val.status}
                        </Flex>
                        <Flex fontSize={"12px"} color={"#767676"}>
                          {moment(val.createdAt).format("ll")}
                        </Flex>
                      </Flex>
                      <Flex
                        w={"100%"}
                        padding={"16px"}
                        flexDir={"column"}
                        rowGap={"16px"}
                        onClick={() => {
                          if (val.status == "Menunggu Pembayaran") {
                            nav(`/payment/${val.order_number}`);
                          } else {
                            nav(`/orders/${val.order_number}`);
                          }
                        }}
                      >
                        <Flex justifyContent={"space-between"} w={"100%"}>
                          <Flex h={"50px"}>
                            {Array.isArray(val.Order) &&
                              val.Order.map((val, idx) => {
                                const marginLeft = idx * 30;
                                const zIndex = zIndexCounter--;
                                return (
                                  <>
                                    <Flex
                                      w={"50px"}
                                      h={"50px"}
                                      position={"absolute"}
                                      marginLeft={`${marginLeft}px`}
                                      zIndex={zIndex}
                                      borderRadius={"10px"}
                                    >
                                      <Image
                                        src={
                                          val.Stock.Product?.photo_product_url
                                        }
                                        borderRadius={"10px"}
                                        border={"2px solid white"}
                                      />
                                    </Flex>
                                  </>
                                );
                              })}
                          </Flex>
                          <Flex
                            alignItems={"center"}
                            fontSize={"12px"}
                            color={"#767676"}
                          >
                            Lihat {val.Order.length} Produk
                          </Flex>
                        </Flex>
                        <Flex justifyContent={"space-between"} w={"100%"}>
                          <Flex fontSize={"14px"} flexDir={"column"}>
                            <Flex>Order Number </Flex>
                            <Box fontWeight={"600"}>{val.order_number}</Box>
                          </Flex>
                          <Flex flexDir={"column"} fontSize={"14px"}>
                            Total belanja
                            <Flex fontWeight={"500"}>
                              Rp {val.total.toLocaleString("id-ID")}
                            </Flex>
                          </Flex>
                        </Flex>
                        <Flex justifyContent={"right"}>
                          <Button
                            maxW={"130px"}
                            colorScheme="green"
                            fontSize={"12px"}
                            display={val.status == "Dikirim" ? "flex" : "none"}
                            onClick={() => {
                              setOrderId({
                                id: val.id,
                                order_number: val.order_number,
                              });
                              onOpen();
                            }}
                          >
                            Konfirmasi Pesanan
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </>
                );
              })
            ) : (
              <>
                <Center
                  maxW={"910px"}
                  w={"100%"}
                  h={"60vh"}
                  color={"#2a960c"}
                  fontWeight={"700"}
                  fontSize={"20px"}
                  flexDir={"column"}
                >
                  <Box>
                    <LuListX fontSize={"100px"} />
                  </Box>
                  <Flex textAlign={"center"}>
                    Tidak ada daftar pesanan yang sesuai filter.
                  </Flex>
                </Center>
              </>
            )}
          </Flex>
        </Flex>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalPesananSelesai
            isOpen={isOpen}
            onClose={onClose}
            orderId={orderId}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
