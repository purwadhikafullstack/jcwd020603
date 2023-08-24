import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/SVG/1.svg";
import "../css/indexR.css";

export default function DashboardNavbar({ toggleSidebar }) {
  return (
    <>
      {/* <Flex className="flex1R"> */}
      <Box className="navbarR">
        <Flex
          w={"100%"}
          h={"100%"}
          alignItems={"center"}
          justifyContent={"end"}
          pl={"5%"}
          pr={"5%"}
        >
          <Flex
            w={"10%"}
            h={"100%"}
            flexDir={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Icon
              as={GiHamburgerMenu}
              w={{ lg: "70%", sm: "60%", base: "50%" }}
              h={"100%"}
              cursor={"pointer"}
              onClick={toggleSidebar}
            ></Icon>
          </Flex>
        </Flex>
      </Box>
      {/* </Flex> */}
    </>
  );
}
