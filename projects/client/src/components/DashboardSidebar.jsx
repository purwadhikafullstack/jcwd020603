import {
  Avatar,
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import logo from "../assets/SVG/1.svg";
import { AiFillSetting } from "react-icons/ai";
import "../css/indexR.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../api/api";
import DashboardSidebarItem from "../components/DashboardSidebarItem";
import { useNavigate } from "react-router-dom";

export default function DashboardSidebar({ navLeft }) {
  const nav = useNavigate();
  const userSelector = useSelector((state) => state.auth);
  const cekverif = userSelector.verification;
  const toast = useToast();
  console.log(cekverif);

  const logout = () => {
    localStorage.removeItem("auth");
    return nav("/");
  };

  const verify = async () => {
    try {
      console.log(userSelector);
      const email = userSelector.email;
      const verifcek = userSelector.verification;
      console.log(verifcek);
      if (!verifcek) {
        await api()
          .get("/user/send-email-verify", {
            params: { email: email },
          })
          .then((res) => {
            return toast({
              title: "Silahkan cek email Anda untuk link verifikasi",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          });
      } else {
        return toast({
          title: "Akun Anda sudah terverifikasi",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Box
        className="sidebarR"
        display={{
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: navLeft == "minus" || navLeft == "" ? "none" : "flex",
          base: navLeft == "minus" || navLeft == "" ? "none" : "flex",
        }}
      >
        <Flex className="flex-logo-sidebarR">
          <Image src={logo} h={"70%"}></Image>
        </Flex>

        <DashboardSidebarItem></DashboardSidebarItem>

        <Flex
          mt={"10%"}
          w={"100%"}
          h={"6%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Icon as={AiFillSetting} w={"20%"} h={"70%"}></Icon>

          <Flex w={"70%"} h={"100%"} pl={"3%"} alignItems={"center"}>
            <Menu>
              <MenuButton as={Button} bgColor={"white"} h={"80%"}>
                Account
              </MenuButton>
              <MenuList>
                <MenuItem>Edit Profile</MenuItem>
                <MenuItem
                  onClick={verify}
                  display={() => {
                    if (cekverif == false) {
                      return "flex";
                    } else if (cekverif == true) {
                      return "none";
                    }
                  }}
                >
                  Verify
                </MenuItem>
                <MenuItem onClick={logout}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
