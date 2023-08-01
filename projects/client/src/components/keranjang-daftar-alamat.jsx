import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DaftarAlamat() {
  const nav = useNavigate();
  const addressSelector = useSelector((state) => state.address);
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
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex color={"#626467"} fontWeight={"600"} fontSize={"20px"}>
              Alamat Pengiriman
            </Flex>
          </Flex>
          <Flex
            w={"100%"}
            border={"1px solid lightgrey"}
            borderRadius={"10px"}
            flexDir={"column"}
            rowGap={"10px"}
            padding={"16px"}
          >
            <Flex w={"100%"} fontSize={"12px"} fontWeight={"500"}>
              {addressSelector.address_name} | {addressSelector.address_phone}
            </Flex>
            <Flex w={"100%"} fontSize={"12px"} flexDir={"column"}>
              <Flex>
                {addressSelector.address}, {addressSelector.district}
              </Flex>
              <Flex>
                {addressSelector.City?.city_name},{" "}
                {addressSelector.City?.postal_code}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
