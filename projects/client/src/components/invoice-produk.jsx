import { Box, Flex, Image } from "@chakra-ui/react";
import logo from "../assets/PNG/1.png";
import { useParams } from "react-router-dom";

export default function InvoiceProduk({ val }) {
  const hargaProduk =
    val?.Stock?.discounted_price == 0
      ? val?.Stock?.Product?.price
      : val?.Stock?.discounted_price;
  const totalHarga = hargaProduk * val?.quantity;
  return (
    <Flex
      w={"100%"}
      padding={"20px"}
      fontSize={"12px"}
      borderBottom={"1px solid lightgrey"}
    >
      <Flex maxW={"378px"} w={"100%"} gap={"10px"}>
        <Flex w={"10%"}>
          <Box h={"40px"}>
            <Image
              src={val.Stock.Product?.photo_product_url}
              borderRadius={"10px"}
              h={"100%"}
            />
          </Box>
        </Flex>
        <Flex w={"90%"} flexDir={"column"} gap={"10px"}>
          <Flex w={"100%"} flexDir={"column"}>
            <Flex fontWeight={"500"}>{val.Stock.Product?.product_name}</Flex>
            <Flex color={"grey"}>Berat : {val.Stock.Product?.desc}</Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex maxW={"58px"} w={"100%"} justifyContent={"right"}>
        {val?.quantity}
      </Flex>
      <Flex maxW={"146px"} w={"100%"} justifyContent={"right"}>
        Rp {hargaProduk.toLocaleString("id-ID")}
      </Flex>
      <Flex maxW={"146px"} w={"100%"} justifyContent={"right"}>
        Rp {totalHarga.toLocaleString("id-ID")}
      </Flex>
    </Flex>
  );
}
