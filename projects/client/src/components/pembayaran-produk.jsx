import { Box, Center, Flex, Icon, Image } from "@chakra-ui/react";

export default function PembayaranProduk(props) {
  return (
    <>
      <Flex borderBottom={"1px solid lightgrey"} gap={"10px"}>
        <Flex w={"50px"} justifyContent={"center"} alignItems={"center"}>
          <Box width={"50px"} h={"50px"}>
            <Image
              src={props.Stock?.Product?.photo_product_url}
              borderRadius={"10px"}
              h={"100%"}
              maxW={"100px"}
              w={"100%"}
            />
          </Box>
        </Flex>
        <Flex w={"100%"} flexDir={"column"} gap={"10px"}>
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
                Rp {Number(props.current_price).toLocaleString("id-ID")} X{" "}
                {props.quantity}
              </Flex>
            </Flex>
            <Flex fontSize={"16px"} fontWeight={"500"}>
              {" "}
              Rp{" "}
              {(props.current_price * props.quantity)?.toLocaleString("id-ID")}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
