import { Box, Center, Flex, Icon, Image } from "@chakra-ui/react";

export default function PembayaranProduk(props) {
  console.log(props);
  const fixPrice =
    props.discounted_price == 0
      ? props.Stock?.Product?.price
      : props.discounted_price;
  return (
    <>
      <Flex borderBottom={"1px solid lightgrey"}>
        <Flex w={"10%"}>
          <Box w={"50px"} h={"50px"}>
            <Image
              src={props.Stock?.Product?.photo_product_url}
              borderRadius={"10px"}
              boxSize={"50px"}
            />
          </Box>
        </Flex>
        <Flex w={"90%"} flexDir={"column"} gap={"10px"}>
          <Flex w={"100%"} flexDir={"column"}>
            <Flex fontSize={"14px"} fontWeight={"500"}>
              {props.Stock?.Product?.product_name}
            </Flex>
            <Flex fontSize={"14px"} color={"grey"}>
              {props.Stock?.Product?.desc}
            </Flex>
          </Flex>
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex alignItems={"center"}>
              <Flex fontWeight={"500"} fontSize={"14px"}>
                Rp {fixPrice.toLocaleString("id-ID")} X {props.qty}
              </Flex>
            </Flex>
            <Flex fontSize={"16px"} fontWeight={"500"}>
              {" "}
              Rp {(fixPrice * props.qty).toLocaleString("id-ID")}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
