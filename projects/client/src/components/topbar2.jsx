import {
  Box,
  Flex,
  Center,
  Image,
  Input,
  Button,
  Icon,
  Avatar,
} from "@chakra-ui/react";
import { MdLocationPin } from "react-icons/md";
import logo from "../assets/logo/horizontal.png";

import "../css/indexB.css";

export default function TopBar2({ address }) {
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
        <Flex id="topBar2B">
          <Flex id="logoSSB" paddingLeft={"5px"}>
            <img src={logo} className="logoB" alt="" />
          </Flex>
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
