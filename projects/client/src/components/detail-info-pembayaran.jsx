import { Flex } from "@chakra-ui/react";

export default function DetailPembayaran(props) {
  const subtotal =
    props.peraturan?.total -
    (props.peraturan?.shipping_cost - props.peraturan?.discount_voucher);

  return (
    <>
      <Flex
        w={"100%"}
        padding={"20px"}
        flexDir={"column"}
        rowGap={"20px"}
        fontSize={"18px"}
        fontWeight={"500"}
        boxShadow={
          "0px 4px 10px rgba(0, 0, 0, 0.2), 0px -4px 10px rgba(0, 0, 0, 0.2)"
        }
      >
        <Flex fontSize={"18px"} fontWeight={"500"}>
          Informasi Pembayaran
        </Flex>
        <Flex
          w={"100%"}
          flexDir={"column"}
          rowGap={"10px"}
          fontSize={"14px"}
          fontWeight={"400"}
        >
          <Flex justifyContent={"space-between"}>
            <Flex>Metode Pembayaran</Flex>
            <Flex>Transfer Bank</Flex>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Flex>Subtotal</Flex>
            <Flex fontWeight={"500"}>
              Rp {subtotal.toLocaleString("id-ID")}
            </Flex>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Flex>Biaya Pengiriman</Flex>
            <Flex fontWeight={"500"}>
              Rp {props.peraturan?.shipping_cost.toLocaleString("id-ID")}
            </Flex>
          </Flex>
          <Flex justifyContent={"space-between"} color={"#2A960C"}>
            <Flex>Potongan Harga</Flex>
            {props.peraturan && (
              <Flex fontWeight={"500"}>
                - Rp{" "}
                {props.peraturan?.discount_voucher
                  ? (props.peraturan?.discount_voucher).toLocaleString("id-ID")
                  : 0}
              </Flex>
            )}
          </Flex>
          <Flex h={"0.5px"} border={"1px solid lightgrey"} w={"100%"} />
          <Flex justifyContent={"space-between"} fontWeight={"600"}>
            <Flex>Total Pembayaran</Flex>
            <Flex>Rp {props.peraturan?.total.toLocaleString("id-ID")}</Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
