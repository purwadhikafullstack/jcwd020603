import { Box, Center, Flex, Image } from "@chakra-ui/react";
import NavbarPesanan from "./navbar-pesanan";
import { LuListX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useEffect, useState } from "react";

export default function ContentPesanan() {
  const nav = useNavigate();
  //get all order user
  const [allOrders, setAllOrders] = useState([]);
  const getOrders = async () => {
    await api()
      .get("/order")
      .then((res) => {
        console.log(res.data.result);
        setAllOrders(res.data.result);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <Box>
        <NavbarPesanan />
      </Box>
      <Center maxW={"910px"} w={"100%"} alignItems={"flex-start"}>
        <Flex maxW={"910px"} w={"100%"} flexDir={"column"}>
          <Flex className="statusRowG">
            <Flex gap={"20px"} minW={"675px"} w={"100%"}>
              <Center
                h={"35px"}
                w={"150px"}
                padding={"10px"}
                borderRadius={"10px"}
                border={"1px solid lightgrey"}
                fontSize={"12px"}
              >
                Semua
              </Center>
              <Center
                h={"35px"}
                w={"165px"}
                padding={"10px"}
                borderRadius={"10px"}
                border={"1px solid lightgrey"}
                fontSize={"12px"}
              >
                Menunggu Pembayaran
              </Center>
              <Center
                h={"35px"}
                w={"150px"}
                padding={"10px"}
                borderRadius={"10px"}
                border={"1px solid lightgrey"}
                fontSize={"12px"}
              >
                Pesanan Berlangsung
              </Center>
              <Center
                h={"35px"}
                w={"150px"}
                padding={"10px"}
                borderRadius={"10px"}
                border={"1px solid lightgrey"}
                fontSize={"12px"}
              >
                Pesanan Selesai
              </Center>
            </Flex>
          </Flex>
          <Flex padding={"20px"} w={"100%"} flexDir={"column"} rowGap={"20px"}>
            {allOrders.length ? (
              allOrders.map((val, idx) => {
                let zIndexCounter = val.Order.length;
                return (
                  <>
                    <Flex
                      w={"100%"}
                      borderRadius={"10px"}
                      border={"1px solid lightgrey"}
                      flexDir={"column"}
                      onClick={() => {
                        nav(`/orders/${val.order_number}`);
                      }}
                    >
                      <Flex
                        padding={"16px"}
                        justifyContent={"space-between"}
                        w={"100%"}
                        borderBottom={"1px solid lightgrey"}
                      >
                        <Flex fontSize={"14px"} fontWeight={"500"}>
                          {val.status}
                        </Flex>
                        <Flex fontSize={"12px"} color={"#767676"}>
                          {val.date}
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
                                console.log(val.Order);
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

                            {/* <Flex
                              w={"50px"}
                              h={"50px"}
                              bg={"green"}
                              position={"absolute"}
                              marginLeft={"30px"}
                              zIndex={2}
                              borderRadius={"10px"}
                            ></Flex>
                            <Flex
                              w={"50px"}
                              h={"50px"}
                              bg={"blue"}
                              position={"absolute"}
                              marginLeft={"60px"}
                              zIndex={1}
                              borderRadius={"10px"}
                            ></Flex> */}
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
                          <Flex fontSize={"14px"} alignItems={"center"}>
                            Order Number : {val.order_number}
                          </Flex>
                          <Flex flexDir={"column"} fontSize={"14px"}>
                            Total belanja
                            <Flex fontWeight={"500"}>
                              Rp {val.total.toLocaleString("id-ID")}
                            </Flex>
                          </Flex>
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
                  <Flex>Tidak ada daftar pesanan yang sesuai filter.</Flex>
                </Center>
              </>
            )}
          </Flex>
        </Flex>
      </Center>
    </>
  );
}
