import { Flex, Icon } from "@chakra-ui/react";
import { MdLocationPin } from "react-icons/md";
import logo from "../assets/logo/vertical.png";

import "../css/indexB.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TopBar({
  address,
  selectedAddress,
  setSelectedAddress,
}) {
  const selectAddress = useSelector((state) => state.address);
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
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
            onClick={() => nav("/address")}
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
