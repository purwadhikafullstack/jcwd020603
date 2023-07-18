import { Avatar, Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import iconproduct from "../assets/iconproduct.png";
import iconcategori from "../assets/iconlayer.png";
import iconorder from "../assets/iconorder.jpg";
import iconuser from "../assets/iconuser.png";

export default function DashboardContent() {
  const userSelector = useSelector((state) => state.auth);

  const nama = userSelector.user_name || "ADMIN";
  return (
    <>
      <Flex className="dash-content">
        <Flex flexDir={"column"}>
          <Box
            fontSize={{ lg: "30px", md: "27", sm: "23px", base: "20px" }}
            fontWeight={"bolder"}
            textDecoration={"underline"}
          >
            DASHBOARD
          </Box>
          <Box fontSize={{ lg: "20px", md: "17px", sm: "15px", base: "12px" }}>
            Hi, Selamat Datang Kembali {nama}
          </Box>
        </Flex>

        <Flex
          h={"20%"}
          w={"100%"}
          gap={"2%"}
          justifyContent={"center"}
          flexWrap={"wrap"}
        >
          <Flex className="dash-content-highlight" bgColor={"#e0bb00"}>
            Total Products
          </Flex>
          <Flex className="dash-content-highlight" bgColor={"#e26974"}>
            Total Category
          </Flex>
          <Flex className="dash-content-highlight" bgColor={"#60d79f"}>
            Total Order
          </Flex>
          <Flex className="dash-content-highlight" bgColor={"#54a9f5"}>
            Total User
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
