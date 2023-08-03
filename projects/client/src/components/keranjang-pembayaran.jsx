import { Flex, useToast } from "@chakra-ui/react";
import { useEffect } from "react";

export default function RincianPembayaran(props) {
  console.log(props.cost);
  //get biaya pengiriman
  const shippingCost =
    props.cost !== undefined &&
    props.cost !== null &&
    Object.keys(props.cost).length !== 0
      ? (props.cost?.cost[0]?.value).toLocaleString("id-ID")
      : 0;
  //get harga total belanja
  const subtotal = props.totalBelanja.length
    ? props.totalBelanja.reduce((a, b) => a + b).toLocaleString("id-ID")
    : 0;
  const totalPembayaran = (Number(subtotal) + Number(shippingCost)) * 1000;
  //setPembayaran
  useEffect(() => {
    props.setPembayaran(totalPembayaran);
  }, [totalPembayaran]);

  return (
    <>
      <Flex
        w={"100%"}
        borderRadius={"5px"}
        flexDir={"column"}
        boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.2);"}
      >
        <Flex
          w={"100%"}
          h={"5px"}
          bg={"#FD8D25"}
          borderTopRadius={"5px"}
        ></Flex>
        <Flex
          w={"100%"}
          padding={"20px"}
          flexDir={"column"}
          rowGap={"20px"}
          alignItems={"center"}
        >
          <Flex w={"100%"} alignItems={"center"}>
            <Flex color={"#626467"} fontWeight={"600"} fontSize={"20px"}>
              Rincian Pembayaran
            </Flex>
          </Flex>
          <Flex w={"100%"} justifyContent={"space-between"} fontSize={"14px"}>
            <Flex>Subtotal</Flex>
            <Flex fontWeight={"500"}>Rp {subtotal}</Flex>
          </Flex>
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            fontSize={"14px"}
            color={"#2A960C"}
          >
            <Flex>Potongan Harga</Flex>
            <Flex fontWeight={"500"}>Rp 0</Flex>
          </Flex>
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            fontSize={"14px"}
            borderBottom={"2px solid grey"}
          >
            <Flex>Biaya Pengiriman</Flex>
            <Flex fontWeight={"500"} paddingBottom={"16px"}>
              Rp {shippingCost}
            </Flex>
          </Flex>
          <Flex w={"100%"} justifyContent={"space-between"} fontSize={"16px"}>
            <Flex fontWeight={"600"}>Total Pembayaran</Flex>
            <Flex fontWeight={"600"}>
              Rp {totalPembayaran.toLocaleString("id-ID")}
            </Flex>
          </Flex>
          <Flex w={"100%"} fontSize={"16px"}>
            <Flex fontWeight={"600"} color={"red"}>
              Metode pembayaran melalui Transfer Bank (Verifikasi Manual)
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
