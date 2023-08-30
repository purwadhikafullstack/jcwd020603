import {
  Center,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { api } from "../api/api";
import { BiSearch, BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import "../css/indexG.css";
import "../css/indexR.css";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaStore } from "react-icons/fa";
import { IoReorderThreeSharp } from "react-icons/io5";
import { MdOutlinePayments, MdArrowBackIosNew } from "react-icons/md";
import { Chart, registerables, scales } from "chart.js";
import Pagination from "./pagination";
import ChartSalesReportProduct from "./Chart-SalesReport-product";
import ChartSalesReportUser from "./Chart-SalesReport-user";
import { useSelector } from "react-redux";
import ChartSalesReportTransactions from "./Chart-SalesReport-transaction";
import { useEffect, useState } from "react";
import moment from "moment";
Chart.register(...registerables);

export default function DashboradContent() {
  const userSelector = useSelector((state) => state.auth);
  const [dtSalesReport, setdtSalesReport] = useState([]);
  const [dtSumQtyProd, setDtSumQtyProd] = useState([]);
  const [date, setDate] = useState({
    dateFrom: moment().subtract(1, "weeks").format("YYYY-MM-DD"),
    dateTo: moment().add(1, "days").format("YYYY-MM-DD"),
  });

  const getSalesReportTrans = async () => {
    const sendBody = {
      dateFrom: date.dateFrom
        ? date.dateFrom
        : moment().subtract(1, "weeks").format("YYYY-MM-DD"),
      dateTo: date.dateTo
        ? moment(date.dateTo).add(1, "days").format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
    };
    try {
      await api()
        .post("/sales-report/all", sendBody)
        .then((res) => {
          setdtSalesReport(res.data.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSalesReportProduct = async () => {
    const sendDataBody = {
      dateFrom: date.dateFrom,
      dateTo: date.dateTo,
    };
    try {
      console.log(sendDataBody);
      await api()
        .post("sales-report/sumqty", sendDataBody)
        .then((res) => {
          console.log(res.data.data);
          setDtSumQtyProd(res.data.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSalesReportTrans();
    getSalesReportProduct();
  }, []);

  return (
    <>
      <Flex flexDir={"column"}>
        <Flex
          flexDir={"row"}
          justifyContent={"center"}
          mt={"50px"}
          mb={"20px"}
          fontWeight={"extrabold"}
          fontSize={{ base: "15px", sm: "18px", md: "20px", lg: "30px" }}
        >
          Selamat Datang {userSelector.user_name} sebagai {userSelector.role}
        </Flex>
        <Flex
          gap={"10%"}
          w={"100%"}
          h={"auto"}
          alignItems={{ base: "center", sm: "center" }}
          flexDir={"column"}
        >
          <Flex
            gap={"15px"}
            alignItems={{ base: "center", sm: "center" }}
            justifyContent={"space-evenly"}
            flexDir={{ base: "column", sm: "column", md: "row", lg: "row" }}
            w={"80%"}
          >
            <Flex
              className="menuTotalG"
              justifyContent={"center"}
              transition="transform 1s, box-shadow 1s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#fdefce"}>
                <Icon as={FaPeopleGroup} fontSize={"30px"} color={"#ffb21c"} />
              </Center>
              <Flex flexDir={"column"}>
                <Flex
                  fontSize={"20px"}
                  fontWeight={"extrabold"}
                  _loading={true}
                >
                  {/* {dtSumQtyUser.length} */}
                </Flex>
                <Flex color={"grey"} fontWeight={"semibold"}>
                  Total Admin Dan Cabang
                </Flex>
              </Flex>
            </Flex>

            <Flex
              className="menuTotalG"
              transition="transform 1s, box-shadow 1s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#cbe4fb"}>
                <Icon as={FaStore} fontSize={"30px"} color={"#007bfe"} />
              </Center>
              <Flex flexDir={"column"}>
                <Flex
                  fontSize={"16px"}
                  fontWeight={"extrabold"}
                  _loading={true}
                >
                  {/* {branch_namenya()} */}
                </Flex>
                <Flex color={"grey"} fontSize={"16px"} fontWeight={"semibold"}>
                  Report Transaksi
                </Flex>
              </Flex>
            </Flex>

            <Flex
              className="menuTotalG"
              transition="transform 1s, box-shadow 1s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#cbe4fb"}>
                <Icon as={FaStore} fontSize={"30px"} color={"#007bfe"} />
              </Center>
              <Flex flexDir={"column"}>
                <Flex
                  fontSize={"16px"}
                  fontWeight={"extrabold"}
                  _loading={true}
                >
                  {/* {branch_namenya()} */}
                </Flex>
                <Flex color={"grey"} fontSize={"16px"} fontWeight={"semibold"}>
                  Product Terlaris
                </Flex>
              </Flex>
            </Flex>

            <Flex
              className="menuTotalG"
              transition="transform 1s, box-shadow 1s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#cbe4fb"}>
                <Icon as={FaStore} fontSize={"30px"} color={"#007bfe"} />
              </Center>
              <Flex flexDir={"column"}>
                <Flex
                  fontSize={"16px"}
                  fontWeight={"extrabold"}
                  _loading={true}
                >
                  {/* {branch_namenya()} */}
                </Flex>
                <Flex color={"grey"} fontSize={"16px"} fontWeight={"semibold"}>
                  ???
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex flexDir={"column"} rowGap={"10px"}>
          {/* chart */}
          <Flex
            overflowX={"auto"}
            w={"100%"}
            mt={5}
            mb={10}
            flexDir={"column"}
            fontWeight={"extrabold"}
          >
            <Flex
              fontSize={{ base: "10px", sm: "18px", md: "20px", lg: "20px" }}
            >
              Grafik laporan penjualan berdasarkan Pembeli
            </Flex>
            <ChartSalesReportTransactions dtSalesReport={dtSalesReport} />
          </Flex>

          <Flex
            overflowX={"auto"}
            w={"100%"}
            mt={5}
            mb={10}
            flexDir={"column"}
            fontWeight={"extrabold"}
          >
            <Flex
              fontSize={{ base: "10px", sm: "18px", md: "20px", lg: "20px" }}
            >
              Grafik laporan penjualan berdasarkan Pembeli
            </Flex>
            <ChartSalesReportProduct dtSumQtyProd={dtSumQtyProd} />
          </Flex>
          {/* chart */}
        </Flex>
      </Flex>
    </>
  );
}
