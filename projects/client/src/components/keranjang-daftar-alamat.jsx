import { Center, Flex, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DaftarAlamat({ selectedAddress, isLoading2 }) {
  const nav = useNavigate();
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
            {isLoading2 ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              <>
                <Flex w={"100%"} fontSize={"12px"} fontWeight={"500"}>
                  {selectedAddress.address_name} |{" "}
                  {selectedAddress.address_phone}
                </Flex>
                <Flex w={"100%"} fontSize={"12px"} flexDir={"column"}>
                  <Flex>
                    {selectedAddress.address}, {selectedAddress.district}
                  </Flex>
                  <Flex>
                    {selectedAddress.City?.city_name},{" "}
                    {selectedAddress.City?.postal_code}
                  </Flex>
                </Flex>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
