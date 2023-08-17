import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { BsFillBoxSeamFill, BsFillBagCheckFill } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { BiSearch, BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import "../css/indexG.css";
import "../css/indexR.css";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { BiDotsHorizontal, BiEdit, BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { FaStore } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaRupiahSign } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { FcRefresh } from "react-icons/fc";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { TbShoppingCartDiscount } from "react-icons/tb";
import AddAdminBranch from "./AdminBranchAddModal";
import EditAdminBranch from "./AdminBranchEditModal";
import ModalKonfirmasiDeletAdmin from "./modal-konfirmasi-deleteAdminBranch";
import { useSelector } from "react-redux";
import moment from "moment";
import DiscountAddModal from "./DiscountAddModal";
import ModalKonfirmasiDeletDiscount from "./modal-konfirmasi-deleteDiscount";
import * as Yup from "yup"
import {useFormik} from "formik"
import { Await } from "react-router-dom";
import ChartSalesReportTransactions from "./Chart-SalesReport-transaction";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function SalesReport() {
  const userSelector = useSelector((state) => state.auth);
  const roleOfUSer = userSelector.role;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dtSalesReport, setdtSalesReport] = useState([]); 
  const [allData, setAllData] = useState([]); 
  const [totalPrice, setTotalPrice] = useState([])
  const [total, setTotal] = useState()
  const [selectedSortBy, setSelectedSortBy] = useState()
  const [selectedOrderBy, setSelectedOrderBy] = useState()
  const [ascModeDate, setAscModeDate] = useState(true)
  const [ascModePrice, setAscModePrice] = useState(true)
  const [getBranch_name, setGetBranch_name] = useState([])
  const [inputBranch_name, setInputBranch_name] = useState([])
  const [date, setDate] =useState({
    dateFrom : moment().format("YYYY-MM-DD"),
    dateTo : moment().format("YYYY-MM-DD"),
  })
  let transaksi
  const inputHandler = (e) => {
    const {id, value} = e.target
    const tempDate = {...date}
    tempDate[id] = value
    console.log(tempDate);
    setDate(tempDate)
  }
  
  const inputHandlerBranch_name = (e) => {
    console.log(e.target.value);
    setInputBranch_name(e.target.value)
    console.log(inputBranch_name);
  }
  const branch_id = userSelector.role =="ADMIN" ? userSelector.branch_id : inputBranch_name

  const allDataOrder = async() => {
    try {
      setTotalPrice([])
       await api()
        .get("/sales-report/")
        .then((res) => {
          console.log(res.data.data);
          setAllData(res.data.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  
  }

  const fetchAll = async () => {
    const sendDate = {
      dateFrom : date.dateFrom, 
      dateTo : date.dateTo ? moment(date.dateTo).add(1, "days").format("YYYY-MM-DD") : date.dateFrom,
      branch_id : branch_id ? branch_id : ""
    }
   
      try {
        setTotalPrice([])
         await api()
          .post("/sales-report/all", sendDate)
          .then((res) => {
            console.log(res.data.data);
            setdtSalesReport(res.data.data);
            transaksi = res.data.data
          });
      } catch (error) {
        console.log(error.message);
      }
    
  }

  useEffect(() => {
    fetchAll();
    allDataOrder()
  }, []);
  
  useEffect(() => {
    fetchAll();
  }, [date, inputBranch_name]);

  // menyimpan nilai total pembayaran pertransaksi(distinc)
 useEffect(() =>{
  dtSalesReport.map((value) => { 
    console.log(value.total);
    if(totalPrice.includes(value.total)){
    } else {
      setTotalPrice((totalPrice) => [...totalPrice, value.total])
    }
  })
 }, [dtSalesReport])

//  menyimpan id dan nama branch (distinc)
 useEffect(() => {
  const uniqueBranches = {};
  allData.forEach(val => {
    const branchKey = `${val.branch_id}_${val.Branch.branch_name}`;
    uniqueBranches[branchKey] = { id: val.branch_id, name: val.Branch.branch_name };
  });

  const newBranches = Object.values(uniqueBranches);
  setGetBranch_name(newBranches);
}, [allData]);

  // mencari total pembayaran
  let totalPembayaran
  useEffect(() => {
    if (totalPrice.length > 0){
    totalPembayaran = totalPrice?.reduce((a,b) => a+b)
    }
    console.log(totalPembayaran);
    setTotal(totalPembayaran)
  },[totalPrice])

  // untuk merubah angka ke currency
  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    });
  
    return formatter.format(number);
  }



  return (
    <>
      <Box>
        <AdminNavbar onOpen={onOpen} />
      </Box>
      <Flex
        maxW={"910px"}
        w={"100%"}
        h={"100%"}
        padding={"30px"}
        flexDir={"column"}
        rowGap={"20px"}
        marginTop={"60px"}
        borderTopLeftRadius={"20px"}
        bg={"#FFF7E7"}
      >
        <Flex fontSize={"26px"} fontWeight={"700"}>
          Laporan Penjualan
        </Flex>

        <Grid className="gridMenuG" flexDir={"row"}>
          <Flex className="menuTotalG">
            <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#fdefce"}>
              <Icon
                as={MdOutlinePayments}
                fontSize={"30px"}
                color={"#ffb21c"}
              />
            </Center>
            <Flex flexDir={"column"}>
              <Flex fontSize={"24px"} fontWeight={"extrabold"} _loading={true}>
                {dtSalesReport.length}
              </Flex>
              <Flex color={"grey"} fontWeight={"semibold"}>
                jumlah Transaksi
              </Flex>
            </Flex>
          </Flex>

          <Flex className="menuTotalG">
            <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#ccf4bf"}>
              <Icon
                as={FaRupiahSign}
                fontSize={"30px"}
                color={"#73d673"}
              />
            </Center>
            <Flex flexDir={"column"}>
              <Flex fontSize={"18px"} fontWeight={"extrabold"} _loading={true}>
                {total ? formatCurrency(total) : formatCurrency(0)}
              </Flex>
              <Flex color={"grey"} fontSize={"16px"} fontWeight={"semibold"}>
                Total Pendapatan
              </Flex>
            </Flex>
          </Flex>
        </Grid>
        <Flex flexDir={"column"} rowGap={"10px"}>
          <Flex
            fontSize={"24px"}
            fontWeight={"700"}
            paddingBottom={"20px"}
            justifyContent={"space-between"}
          >
            <Flex fontSize={15} >
              <Flex gap={"20px"} alignItems={"end"}>
                <Flex flexDir={"column"}>
                  Periode Dari
                <Input id="dateFrom" value={date.dateFrom} onChange={inputHandler} type="date" placeholder="Dari" bgColor={"white"}></Input>
                </Flex>
                <Flex flexDir={"column"}>
                  Periode Sampai
                <Input id="dateTo" value={date.dateTo} onChange={inputHandler} type="date" placeholder="Dari" bgColor={"white"}></Input>
                </Flex>
              </Flex>
            </Flex>
            <Flex maxW={"400px"} w={"100%"} gap={"10px"} alignItems={"end"} 
              justifyContent={() => (roleOfUSer == "SUPER ADMIN" ? "space beetwen" : "right" )} >
              <Select
                onChange={inputHandlerBranch_name} 
                id="branch_name"
                w={"50%"}
                placeholder="Pilih Lokasi Cabang"
                bg={"white"}
                display={() => (roleOfUSer == "SUPER ADMIN" ? "flex" : "none")}
              >
                {getBranch_name.map((val, index) => (
                  <option  key={index} value={val.id}>{val.name}</option>
                ))}
              </Select>
              <InputGroup w={"50%"}>
                <Input placeholder="search" bg={"white"}></Input>
                <InputRightElement
                  as={BiSearch}
                  w={"30px"}
                  h={"30px"}
                  padding={"10px 10px 0px 0px"}
                />
              </InputGroup>
            </Flex>
          </Flex>

          {/* chart */}
          <Flex w={"100%"} h={"auto"} mt={5} mb={10} flexDir={"column"} fontWeight={'extrabold'}>
            Grafik laporan penjualan berdasarkan Transaksi
            <ChartSalesReportTransactions dtSalesReport={dtSalesReport}/>
          </Flex>
          <Flex w={"100%"} fontWeight={"extrabold"}>Table laporan penjualan berdasarkan Transaksi</Flex>
          <Table
            size="sm"
            w={"100%"}
            variant="simple"
            className="custom-table"
            maxW={"850px"}
          >
            <Thead w={"100%"} bg={"#ffb21c"} fontSize={"12px"}>
              <Tr>
                <Th>No</Th>
                <Th>Kode transaksi</Th>
                <Th>Tanggal transaksi</Th>
                {/* <Th cursor={"pointer"} onClick={()=> {
                  setSelectedSortBy("date")
                  setSelectedOrderBy(ascModeDate ? "asc" : "desc")
                  setAscModeDate(!ascModeDate)
                }}><Flex w={"100%"} gap={"10%"} alignItems={"center"}>Tanggal Transaksi
                {ascModeDate ? <BiSolidUpArrow color="green" size={"15%"}/> : 
                <BiSolidDownArrow color="green" size={"15%"}/>}</Flex></Th> */}
                <Th>Nama Pembeli</Th>
                <Th>Nama Cabang</Th>
                <Th>Lokasi Cabang (Kota - Provinsi)</Th>
                <Th>Total Harga</Th>
                {/* <Th cursor={"pointer"} onClick={()=> {
                  setSelectedSortBy("total")
                  setSelectedOrderBy(ascModePrice ? "asc" : "desc")
                  setAscModePrice(!ascModePrice)
                }}><Flex w={"100%"} gap={"15%"} alignItems={"center"}>Total Harga (Rp)
                {ascModePrice ? <BiSolidUpArrow color="green" size={"15%"}/> : 
                <BiSolidDownArrow color="green" size={"15%"}/>}</Flex></Th> */}
              </Tr>
            </Thead>

            <Tbody fontSize={"10px"}>
              {dtSalesReport?.map((val, index) => (
                <Tr key={val?.id} className="table-row">
                  <Td>{index + 1}</Td>
                  <Td>{val?.order_number}</Td>
                  <Td>{val.date.split("T")[0]}</Td>
                  <Td>{val.User.user_name}</Td>
                  <Td>{val.Branch.branch_name}</Td>
                  <Td>{val.Branch.City.city_name} - {val.Branch.province} </Td>
                  <Td>{formatCurrency(val.total)} </Td>
                  
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </>
  );
}
