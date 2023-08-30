import { Flex } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";

export default function DetailPengiriman(props) {
  const { peraturan, shippingCost } = props;
  return (
    <>
      <Flex
        w={"100%"}
        padding={"20px"}
        flexDir={"column"}
        fontSize={"18px"}
        fontWeight={"500"}
        boxShadow={
          "0px 4px 10px rgba(0, 0, 0, 0.2), 0px -4px 10px rgba(0, 0, 0, 0.2)"
        }
      >
        <Flex fontSize={"18px"} fontWeight={"500"} paddingBottom={"20px"}>
          Informasi Pengiriman
        </Flex>
        <Flex w={"100%"} fontSize={"14px"} gap={"30px"} padding={"5px 0px"}>
          <Flex w={"20%"} minW={"72px"}>
            Status Pengiriman
          </Flex>
          <Flex w={"100%"} flexDir={"column"}>
            <Flex>{peraturan?.status}</Flex>
            <Flex fontWeight={"400"}>
              {moment(peraturan?.createdAt).format("lll")}
            </Flex>
          </Flex>
        </Flex>
        <Flex w={"100%"} fontSize={"14px"} gap={"30px"} padding={"5px 0px"}>
          <Flex w={"20%"} minW={"72px"}>
            Kurir Pengiriman
          </Flex>
          <Flex w={"100%"} flexDir={"column"}>
            <Flex>{shippingCost?.name}</Flex>
            <Flex fontWeight={"400"}>
              {shippingCost?.description} ({shippingCost?.service})
            </Flex>
            {shippingCost &&
              shippingCost.cost &&
              shippingCost.cost.length > 0 && (
                <Flex fontWeight={"400"}>
                  {shippingCost?.name === "POS Indonesia (POS)"
                    ? `Estimasi tiba dalam ${shippingCost?.cost[0]?.etd}`
                    : `Estimasi tiba dalam ${shippingCost?.cost[0]?.etd} Hari`}
                </Flex>
              )}
          </Flex>
        </Flex>
        <Flex w={"100%"} fontSize={"14px"} gap={"30px"} padding={"5px 0px"}>
          <Flex w={"20%"} minW={"72px"}>
            Alamat Penerima
          </Flex>
          <Flex w={"100%"} flexDir={"column"}>
            <Flex>{peraturan?.Address?.address_name}</Flex>
            <Flex fontWeight={"400"}>{peraturan?.Address?.address_phone}</Flex>
            <Flex fontWeight={"400"}>
              {peraturan?.Address?.address}, {peraturan?.Address?.district},{" "}
              {peraturan?.Address?.City?.type}{" "}
              {peraturan?.Address?.City?.city_name},{" "}
              {peraturan?.Address?.province},{" "}
              {peraturan.Address?.City?.postal_code}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
