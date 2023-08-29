import {
  Box,
  Center,
  Flex,
  Icon,
  Image,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import logo from "../assets/SVG/3.svg";
import { BiHome, BiSolidOffer } from "react-icons/bi";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { BsDot, BsFillPersonBadgeFill } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminSidebar() {
  const userSelector = useSelector((state) => state.auth)
  //merubah warna saat di click
  const [Clicked, setClicked] = useState("");
  const handleClick = (e) => {
    setClicked(e.currentTarget.id);
  };
  //memunculkan sub-menu
  const [isAppear, setIsAppear] = useState(false);
  const [isAppearDiscount, setIsAppearDiscount] = useState(false);
  const [isAppearReport, setIsAppearReport] = useState(false);
  const nav = useNavigate();

  return (
    <>
      <Flex className="flexTerluarG">
        <Box w={"80%"} h={"123px"} padding={"30px 10px"}>
          <Image src={logo} />
        </Box>
        <Flex w={"100%"} gap={"20px"}>
          <Flex
            className="adminMiniFlexG"
            bg={Clicked == "dashboard" ? "#FFAE0D" : "white"}
          ></Flex>
          <Flex
            id="dashboard"
            className="adminMenuStyleG"
            onClick={(e) => {
              handleClick(e)
              nav("/dashboard")
            }}
            bg={Clicked == "dashboard" ? "#FFF4DD" : "white"}
            color={Clicked == "dashboard" ? "#FFAE0D" : "gray"}
          >
            <Icon as={MdDashboard} fontSize={"28px"} />
            Dashboard
          </Flex>
        </Flex>
        <Flex w={"100%"} gap={"20px"}>
          <Flex
            className="adminMiniFlexG"
            bg={Clicked == "pesanan" ? "#FFAE0D" : "white"}
          ></Flex>
          <Flex
            id="pesanan"
            className="adminMenuStyleG"
            onClick={(e) => {
              handleClick(e);
              nav("/admin/orders");
            }}
            bg={Clicked == "pesanan" ? "#FFF4DD" : "white"}
            color={Clicked == "pesanan" ? "#FFAE0D" : "gray"}
          >
            <Icon as={RiShoppingBag3Fill} fontSize={"28px"} />
            Pesanan
          </Flex>
        </Flex>
        <Flex w={"100%"} gap={"20px"}>
          <Flex
            className="adminMiniFlexG"
            bg={Clicked == "inventaris" ? "#FFAE0D" : "white"}
          ></Flex>
          <Flex
            id="inventaris"
            className="adminMenuStyleG"
            onClick={(e) => {
              handleClick(e);
              setIsAppear(!isAppear);
            }}
            bg={Clicked == "inventaris" ? "#FFF4DD" : "white"}
            color={Clicked == "inventaris" ? "#FFAE0D" : "gray"}
          >
            <Icon as={MdInventory} fontSize={"28px"} />
            Inventaris
          </Flex>
        </Flex>
        {isAppear ? (
          <>
            <Flex className="adminSubMenuG">
              <Flex
                alignItems={"center"}
                cursor={"pointer"}
                onClick={() => {
                  nav("/sa-category");
                }}
              >
                <Icon as={BsDot} fontSize={"22px"} />
                Kategori
              </Flex>
              <Flex
                alignItems={"center"}
                cursor={"pointer"}
                onClick={() => {
                  nav("/sa-product");
                }}
              >
                <Icon as={BsDot} fontSize={"22px"} />
                Produk
              </Flex>
              <Flex
                alignItems={"center"}
                cursor={"pointer"}
                onClick={() => {
                  nav("/a-stock");
                }}
              >
                <Icon as={BsDot} fontSize={"22px"} />
                Stok Produk
              </Flex>
              <Flex
                alignItems={"center"}
                cursor={"pointer"}
                onClick={() => {
                  nav("/stockhistory");
                }}
              >
                <Icon as={BsDot} fontSize={"22px"} />
                Riwayat Stok
              </Flex>
            </Flex>
          </>
        ) : null}
        <Flex w={"100%"} gap={"20px"} display={userSelector.role == "SUPER ADMIN" ? "flex" : "none"}>
          <Flex
            className="adminMiniFlexG"
            bg={Clicked == "karyawan" ? "#FFAE0D" : "white"}
          ></Flex>
          <Flex
            id="karyawan"
            className="adminMenuStyleG"
            onClick={(e) => {
              handleClick(e)
              nav("/admin-branch")
            }}
            bg={Clicked == "karyawan" ? "#FFF4DD" : "white"}
            color={Clicked == "karyawan" ? "#FFAE0D" : "gray"}
          >
            <Icon as={BsFillPersonBadgeFill} fontSize={"28px"} />
            Karyawan
          </Flex>
        </Flex>
        <Flex w={"100%"} gap={"20px"}>
          <Flex
            className="adminMiniFlexG"
            bg={Clicked == "diskon" ? "#FFAE0D" : "white"}
          ></Flex>
          <Flex
            id="diskon"
            className="adminMenuStyleG"
            onClick={(e) => {
              handleClick(e)
              setIsAppearDiscount(!isAppearDiscount)
            }}
            bg={Clicked == "diskon" ? "#FFF4DD" : "white"}
            color={Clicked == "diskon" ? "#FFAE0D" : "gray"}
          >
            <Icon as={BiSolidOffer} fontSize={"28px"} />
            Diskon
          </Flex>
        </Flex>
        {isAppearDiscount ? (
          <>
            <Flex className="adminSubMenuG">
              <Flex
                alignItems={"center"}
                cursor={"pointer"}
                onClick={() => {
                  nav("/discount");
                }}
              >
                <Icon as={BsDot} fontSize={"22px"} />
                Pengaturan Diskon
              </Flex>
              <Flex
                alignItems={"center"}
                cursor={"pointer"}
                onClick={() => {
                  nav("/voucher");
                }}
              >
                <Icon as={BsDot} fontSize={"22px"} />
                Pengaturan Voucher
              </Flex>
            </Flex>
          </>
        ) : null}


        <Flex w={"100%"} gap={"20px"}>
          <Flex
            className="adminMiniFlexG"
            bg={Clicked == "laporan" ? "#FFAE0D" : "white"}
          ></Flex>
          <Flex
            id="laporan"
            className="adminMenuStyleG"
            onClick={(e) => {
              handleClick(e)
              setIsAppearReport(!isAppearReport)
            }}
            bg={Clicked == "laporan" ? "#FFF4DD" : "white"}
            color={Clicked == "laporan" ? "#FFAE0D" : "gray"}
          >
            <Icon as={TbReportAnalytics} fontSize={"28px"} />
            Laporan
          </Flex>
        </Flex>
        {isAppearReport ? (
          <>
            <Flex className="adminSubMenuG">
              <Flex
                alignItems={"center"}
                cursor={"pointer"}
                onClick={() => {
                  nav("/sales-report");
                }}
              >
                <Icon as={BsDot} fontSize={"22px"} />
                Laporan Transaksi
              </Flex>
              <Flex
                alignItems={"center"}
                cursor={"pointer"}
                onClick={() => {
                  nav("/sales-report-product");
                }}
              >
                <Icon as={BsDot} fontSize={"22px"} />
                Laporan Produk
              </Flex>
              <Flex
                alignItems={"center"}
                cursor={"pointer"}
                onClick={() => {
                  nav("/sales-report-user");
                }}
              >
                <Icon as={BsDot} fontSize={"22px"} />
                Laporan Pembeli
              </Flex>
            </Flex>
          </>
        ) : null}
      </Flex>
    </>
  );
}
