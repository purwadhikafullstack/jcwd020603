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
import Pagination from "./pagination";

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
  const [shown, setShown] = useState({ page: 1 });
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState({
    page: shown.page,
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  console.log(filter);
  const getOrders = async () => {
    const params = { ...filter };
    setIsLoading(true);
    const get = await api().get("/order", { params: { ...params } });
    setAllOrders(get.data.result);
    setTotalPages(get.data.total);
    console.log(get.data.result);
    setIsLoading(false);
  };
  useEffect(() => {
    getOrders();
  }, []);
  useEffect(() => {
    getOrders();
  }, [filter]);
  //pagination
  const [pages, setPages] = useState([]);
  function pageHandler() {
    const output = [];
    for (let i = 1; i <= totalPages; i++) {
      output.push(i);
    }
    setPages(output);
  }
  console.log("halaman", pages);
  useEffect(() => {
    pageHandler();
  }, [allOrders]);
  useEffect(() => {
    if (shown.page > 0 && shown.page <= totalPages) {
      setFilter({ ...filter, page: shown.page });
    }
  }, [shown]);
  // menyimpan id untuk modal
  const [orderId, setOrderId] = useState({ id: "", order_number: "" });
  return (
    <>
      <Box>
        <NavbarPesanan />
      </Box>
      <Flex
        maxW={"910px"}
        w={"100%"}
        flexDir={"column"}
        borderRight={"1px solid lightgrey"}
      >
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
                  bg={filter.status == val.value ? "green" : "white"}
                  color={filter.status == val.value ? "white" : "black"}
                  _hover={{
                    backgroundColor: "green",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setFilter({ ...filter, status: val.value });
                    setShown({ page: 1 });
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
                                        val.Stock?.Product?.photo_product_url
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
                            Rp {val.total?.toLocaleString("id-ID")}
                          </Flex>
                        </Flex>
                      </Flex>
                      <Flex
                        justifyContent={
                          val.status === "Dikirim"
                            ? "space-between"
                            : "flex-end"
                        }
                        w={"100%"}
                      >
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
                        <Button
                          maxW={"130px"}
                          colorScheme="gray"
                          fontSize={"12px"}
                          onClick={() => {
                            if (val.status == "Menunggu Pembayaran") {
                              nav(`/payment/${val.order_number}`);
                            } else {
                              nav(`/orders/${val.order_number}`);
                            }
                          }}
                        >
                          Detail Pesanan
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
          <Flex justifyContent={"end"} paddingBottom={"30px"}>
            <Pagination
              shown={shown}
              setShown={setShown}
              totalPages={totalPages}
              pages={pages}
            />
          </Flex>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalPesananSelesai
            isOpen={isOpen}
            onClose={onClose}
            orderId={orderId}
            getOrders={getOrders}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
