import { Box, Button, Center, Flex, Image } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../assets/PNG/1.png";
import lunas from "../assets/LUNAS.png";
import InvoiceProduk from "./invoice-produk";
import { api } from "../api/api";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/id";

export default function Invoice() {
  const componentRef = useRef(null);
  moment.locale("id");
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice_Sahabat Sembako",
  });
  const order_number = useParams();
  //get order
  const [orderValue, setOrdervalue] = useState({});
  const getOrder = async () => {
    const order = await api().get("/order/specific", {
      params: { order_number: order_number.order_number },
    });
    setOrdervalue(order.data.result);
  };
  useEffect(() => {
    getOrder();
  }, []);
  // menyimpan shipping_cost
  const [shippingCost, setShippingCost] = useState({});
  const [calculateSubtotal, setCalculateSubtotal] = useState(0);
  console.log("ini val orderValue", orderValue);
  useEffect(() => {
    if (Object.keys(orderValue).length > 0) {
      const parsedShippingCost = JSON.parse(orderValue?.shipping_cost);
      setShippingCost(parsedShippingCost);
    }
  }, [orderValue]);
  //count total harga belanja
  useEffect(() => {
    if (Object.keys(orderValue).length > 0 && shippingCost != {}) {
      return setCalculateSubtotal(
        orderValue?.total -
          (shippingCost?.cost[0]?.value - orderValue?.discount_voucher)
      );
    } else {
      return setCalculateSubtotal(0);
    }
  }, [shippingCost]);
  console.log(calculateSubtotal);
  return (
    <>
      <Flex flexDir={"column"}>
        <Flex
          w={"100vw"}
          justifyContent={"right"}
          padding={"10px"}
          position={"sticky"}
          top={0}
          bg={"white"}
          shadow={"0px 4px 6px rgba(0, 0, 0, 0.2)"}
        >
          <Button onClick={handlePrint} colorScheme="green">
            Cetak
          </Button>
        </Flex>

        <Flex
          ref={componentRef}
          maxW={"800px"}
          w={"100%"}
          padding={"20px"}
          flexDir={"column"}
        >
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            paddingBottom={"20px"}
          >
            <Flex>
              <Image src={logo} maxW={"200px"} height={"50px"} />
            </Flex>
            <Flex flexDir={"column"}>
              <Flex
                w={"100%"}
                fontSize={"16px"}
                fontWeight={"700"}
                letterSpacing={"1px"}
                justifyContent={"right"}
              >
                INVOICE
              </Flex>
              <Flex fontSize={"12px"}>{orderValue.order_number}</Flex>
            </Flex>
          </Flex>
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            paddingBottom={"20px"}
          >
            <Flex flexDir={"column"} fontSize={"12px"} rowGap={"5px"}>
              <Flex fontWeight={"700"}>DITERBITKAN OLEH</Flex>
              <Flex>CV Sahabat Sembako</Flex>
            </Flex>
            <Flex
              flexDir={"column"}
              fontSize={"12px"}
              rowGap={"5px"}
              maxW={"365px"}
              w={"100%"}
            >
              <Flex fontWeight={"700"}>UNTUK</Flex>
              <Flex>
                <Flex maxW={"115px"} w={"100%"}>
                  Pembeli
                </Flex>
                <Flex fontWeight={"700"}>: {orderValue.User?.user_name}</Flex>
              </Flex>
              <Flex>
                <Flex maxW={"115px"} w={"100%"}>
                  Tanggal Pembelian
                </Flex>
                <Flex fontWeight={"700"}>
                  : {moment(orderValue.updatedAt).format("LL")}
                </Flex>
              </Flex>
              <Flex>
                <Flex maxW={"115px"} w={"100%"}>
                  Alamat Pengiriman
                </Flex>
                <Flex fontWeight={"700"}>
                  : {orderValue.Address?.address_name} (
                  {orderValue.Address?.address_phone})
                </Flex>
              </Flex>
              <Flex>
                <Flex maxW={"115px"} w={"100%"}></Flex>
                <Flex paddingLeft={"10px"}>
                  {orderValue.Address?.address}, {orderValue.Address?.district},{" "}
                  {orderValue.Address?.City?.type}{" "}
                  {orderValue.Address?.City?.city_name},{" "}
                  {orderValue.Address?.City?.province},{" "}
                  {orderValue.Address?.City.postal_code}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            w={"100%"}
            padding={"20px"}
            fontSize={"12px"}
            fontWeight={"700"}
            borderTop={"2px solid black"}
            borderBottom={"2px solid black"}
          >
            <Flex maxW={"378px"} w={"100%"}>
              INFO PRODUK
            </Flex>
            <Flex maxW={"58px"} w={"100%"} justifyContent={"right"}>
              JUMLAH
            </Flex>
            <Flex maxW={"146px"} w={"100%"} justifyContent={"right"}>
              HARGA SATUAN
            </Flex>
            <Flex maxW={"146px"} w={"100%"} justifyContent={"right"}>
              TOTAL HARGA
            </Flex>
          </Flex>
          {Object.keys(orderValue).length > 0 &&
            orderValue?.Order.map((val) => {
              return <InvoiceProduk val={val} />;
            })}
          <Flex paddingBottom={"5px"} borderBottom={"1px solid lightgrey"}>
            <Flex maxW={"398px"} w={"100%"}></Flex>
            <Flex
              maxW={"370px"}
              w={"100%"}
              flexDir={"column"}
              rowGap={"5px"}
              fontSize={"12px"}
            >
              <Flex
                w={"100%"}
                justifyContent={"space-between"}
                fontWeight={"700"}
                padding={"5px 0px"}
              >
                <Flex>Total Harga ({orderValue?.Order?.length} Barang)</Flex>
                <Flex>Rp {calculateSubtotal.toLocaleString("id-ID")}</Flex>
              </Flex>
              <Flex w={"100%"} justifyContent={"space-between"}>
                <Flex>Biaya Pengiriman</Flex>
                {shippingCost &&
                  shippingCost.cost &&
                  shippingCost.cost.length > 0 && (
                    <Flex fontWeight={"500"}>
                      Rp {shippingCost.cost[0].value.toLocaleString("id-ID")}
                    </Flex>
                  )}
              </Flex>
              <Flex w={"100%"} justifyContent={"space-between"}>
                <Flex>Potongan Harga</Flex>
                <Flex>
                  -Rp{" "}
                  {orderValue?.discount_voucher
                    ? orderValue?.discount_voucher?.toLocaleString("id-ID")
                    : 0}
                </Flex>
              </Flex>
              <Flex
                w={"100%"}
                justifyContent={"space-between"}
                fontWeight={"700"}
                padding={"5px 0px"}
              >
                <Flex>Total Belanja</Flex>
                <Flex>Rp {orderValue?.total?.toLocaleString("id-ID")}</Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Flex
              maxW={"398px"}
              w={"100%"}
              fontSize={"12px"}
              flexDir={"column"}
              paddingTop={"20px"}
              rowGap={"5px"}
            >
              <Flex>Kurir:</Flex>
              <Flex fontWeight={"700"} gap={"4px"}>
                {shippingCost?.name} - {shippingCost?.service}
              </Flex>
            </Flex>
            <Flex
              maxW={"370px"}
              w={"100%"}
              fontSize={"12px"}
              flexDir={"column"}
              paddingTop={"20px"}
              rowGap={"5px"}
            >
              <Flex>Metode Pembayaran:</Flex>
              <Flex fontWeight={"700"}>Transfer Bank Manual</Flex>
            </Flex>
          </Flex>
          <Flex w={"100%"} fontSize={"12px"} paddingTop={"50px"}>
            <Flex w={"50%"}>Invoice ini sah dan diproses oleh komputer</Flex>
            <Flex w={"50%"} justifyContent={"right"} fontStyle={"italic"}>
              {" "}
              Terakhir diupdate: {moment(orderValue?.updatedAt).format(
                "LLL"
              )}{" "}
              WIB
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
