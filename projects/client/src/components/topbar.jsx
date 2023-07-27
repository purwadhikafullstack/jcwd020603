import { Flex, Icon } from "@chakra-ui/react";
import { MdLocationPin } from "react-icons/md";
import logo from "../assets/logo/vertical.png";

import "../css/indexB.css";
import { useEffect, useState } from "react";

export default function TopBar({ address }) {
  console.log(address);
  const getFormattedAddress = () => {
    if (address) {
      const splitAddress = address.split(",");
      return splitAddress.length > 0 ? splitAddress[1].trim() : "";
    }
    return "";
  };

  return (
    <>
      <Flex id="containerTopBarB" justifyContent={"center"}>
        <Flex id="topBarB">
          <Flex
            alignItems={"center"}
            className="flexSideBarB"
            cursor={"pointer"}
          >
            <Icon id="iconLocationB" as={MdLocationPin} />
            <Flex id="alamatTopBarB">
              {address ? (
                <>
                  <Flex>alamat anda</Flex>
                  <Flex>{getFormattedAddress()}</Flex>
                </>
              ) : (
                <>
                  <Flex>Alamat belum dipilih</Flex>
                  <Flex>Mulai atur alamat pengiriman</Flex>
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
