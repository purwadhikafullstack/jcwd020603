import {
  Box,
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
  useDisclosure,
} from "@chakra-ui/react";
import {api} from "../api/api"
import { BiSearch, BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import "../css/indexG.css";
import "../css/indexR.css";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaStore, } from "react-icons/fa";
import { IoReorderThreeSharp, } from "react-icons/io5";
import { MdOutlinePayments, MdArrowBackIosNew } from "react-icons/md";
import { Chart, registerables, scales } from 'chart.js';
import Pagination from "./pagination";
import ChartSalesReportProduct from "./Chart-SalesReport-product";
import ChartSalesReportUser from "./Chart-SalesReport-user";
import { useSelector } from "react-redux";
import ChartSalesReportTransactions from "./Chart-SalesReport-transaction";
import { useEffect, useState } from "react";
import moment from "moment";
import AdminNavbar from "./AdminNavbar";
Chart.register(...registerables);


export default function DashboardAdminContent() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const userSelector = useSelector((state) => state.auth)
  const [dtSalesReport, setdtSalesReport] = useState([]); 
  const [dtSumQtyProd, setDtSumQtyProd] = useState([])
  const [dtUserBranch, setDtUserBranch] = useState([])
  const [dtSumQtyUser, setDtSumQtyUser] = useState([])
  const [dtAllProduct, setDtAllProduct] = useState([])
  const [dtStockBranch, setDtStockBranch] = useState([])
  const [dtCtgory, setDtCtgory] = useState([])
  const [totalPrice, setTotalPrice] = useState([])
  const [total, setTotal] = useState()
  const [date, setDate] =useState({
    dateFrom : moment().subtract(1, "months").format("YYYY-MM-DD"),
    dateTo : moment().add(1, "days").format("YYYY-MM-DD")
  })
  
  const branch_id = userSelector.role == "ADMIN" ? userSelector.branch_id : ""
  const getSalesReportTrans = async () => {
    const sendBody = {
      dateFrom : date.dateFrom,
      dateTo : date.dateTo,
      branch_id : branch_id
    }
      try {
         await api()
          .post("/sales-report/all", sendBody)
          .then((res) => {
            setdtSalesReport(res.data.data);
          });
      } catch (error) {
        console.log(error.message);
      }
    
  }
  
  const getSalesReportProduct = async() => {
    const sendDataBody = {
      dateFrom : date.dateFrom,
      dateTo : date.dateTo,
      branch_id : branch_id
    }
    try {
      console.log(sendDataBody);
      await api()
      .post("sales-report/sumqty", sendDataBody).then((res) => {
        console.log(res.data.data);
        setDtSumQtyProd(res.data.data)})
    } catch (error) {
      console.log(error.message);
    }
  }

  const getSalesReportUser = async() => {
    const sendDataBody = {
      dateFrom : date.dateFrom ,
      dateTo : date.dateTo 
    }
    try {
      console.log(sendDataBody);
      await api()
      .post("sales-report/sum-userall", sendDataBody).then((res) => {
        console.log(res.data);
        console.log(res.data.dataTransByDate);
        setDtSumQtyUser(res.data.dataTransByDate)
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const getUserAndBranch = async () => {
    await api().get("/branch/all-branch").then((res) => {
      setDtUserBranch(res.data.Data)
      console.log(res.data.Data);
    })
  }

  const getAllProduct = async () => {
    try {
      await api().get("/sales-report/all-product").then((res) => {
        console.log(res.data);
        setDtAllProduct(res.data.Data)
        setDtCtgory(res.data.Category)
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  
  const getStockBranch = async () => {
    const sendBody = {branch_id}
   try {
    await api().post("/sales-report/get-stock-branch", sendBody).then((res) => {
      console.log(res.data.Data);
      setDtStockBranch(res.data.Data)
    })
   } catch (error) {
    console.log(error.message);
   }
  }
    function cariBranchName (id = userSelector.branch_id) {
      if(dtUserBranch){
        return dtUserBranch.filter((item) => item.branch_id === id)
      }
    } 
    const getBranchName = cariBranchName()
  
    const cariBestSeller = () => {
      const totalTertinggi = Math.max(...dtSumQtyProd.map((val) => parseInt(val.total_qty)))
      const objTotalTertinggi = dtSumQtyProd.find((item) => parseInt(item.total_qty) === totalTertinggi)
      const bestSellernya = {
        product_name : objTotalTertinggi?.Stock?.Product?.product_name,
        total_terjual : objTotalTertinggi?.total_qty
      }
      return bestSellernya
    }
    const product_nameBestSeller = cariBestSeller().product_name
    const total_terjualBestSeller = cariBestSeller().total_terjual
  
  console.log(userSelector.branch_id);
  console.log(date.dateFrom);
  console.log(date.dateTo);
  console.log(dtSumQtyProd);
  console.log(dtSalesReport);
  console.log(dtSumQtyUser);
  console.log(dtUserBranch);
  console.log(dtAllProduct);
  console.log(dtStockBranch);
  console.log(dtCtgory);
  console.log(getBranchName[0]?.Branch?.branch_name);
  
   // menyimpan nilai total pembayaran pertransaksi(distinc)
   useEffect(() =>{
    dtSalesReport?.map((value) => {
      if(totalPrice.includes(value.total)){
      } else {
        setTotalPrice((totalPrice) => [...totalPrice, value.total])
      }
    })
    }, [dtSalesReport])

          // mencari total pembayaran
  let totalPembayaran
  useEffect(() => {
    if (totalPrice.length > 0){
    totalPembayaran = totalPrice?.reduce((a,b) => a+b)
    }
    setTotal(totalPembayaran)
  },[totalPrice])
  // useEffect
  // untuk merubah angka ke currency
  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    });
    return formatter.format(number);
  }

  useEffect(() => {
   getSalesReportTrans()
   getSalesReportProduct()
   getUserAndBranch()
   getSalesReportUser()
   getAllProduct()
   getStockBranch()
   cariBestSeller()
  },[])
  

  return (
    <>
      <Box>
        <AdminNavbar onOpen={onOpen} />
      </Box>
      <Flex className="flex1R-salesReportTrans">
      <Flex flexDir={"row"} justifyContent={"center"} mb={"20px"} fontWeight={"extrabold"} fontSize={{base: "15px" , sm:"18px", md:"20px", lg: "30px"}}>
        Selamat Datang {userSelector.user_name}  "{userSelector.role}"
      </Flex>
      <Flex flexDir={"row"} justifyContent={"left"}  fontWeight={"bold"} fontSize={{base: "12px" , sm:"15px", md:"15px", lg: "20px"}}>
        Periode 1 Bulan Terakhir</Flex>
      <Flex w={"100%"} h={"auto"} alignItems={{base : "center", sm: "center"}} flexDir={"column"} >
       <Flex gap={"5px"} alignItems={{base : "center", sm: "center"}} justifyContent={"space-between"} flexDir={{base : "column", sm: "column", md: "row", lg: "row"}} w={"100%"}>
        <Flex className="menuTotalG" justifyContent={"center"} transition="transform 1s, box-shadow 1s" _hover={{ transform: 'scale(1.05)',}} >
         <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#fdefce"}>
            <Icon as={FaStore} fontSize={"30px"} color={"#ffb21c"} />
          </Center>
          <Flex flexDir={"column"}>
            <Flex fontSize={"20px"} fontWeight={"extrabold"} _loading={true}>
              {userSelector.role == "SUPER ADMIN" ? dtUserBranch.length : getBranchName?.Branch?.branch_name}
            </Flex>
            <Flex color={"grey"} fontWeight={"semibold"}>
            Cabang
            </Flex>
          </Flex>
        </Flex>

        <Flex className="menuTotalG" transition="transform 1s, box-shadow 1s" _hover={{ transform: 'scale(1.05)',}}>
         <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#cbe4fb"}>
            <Icon as={MdOutlinePayments} fontSize={"30px"} color={"#007bfe"} />
          </Center>
          <Flex flexDir={"column"}>
            <Flex fontSize={"16px"} fontWeight={"extrabold"} _loading={true}>
              {formatCurrency(total)}
            </Flex>
            <Flex color={"grey"} fontSize={"16px"} fontWeight={"semibold"}>
              Transaksi
            </Flex>
          </Flex>
        </Flex>
        <Flex className="menuTotalG" transition="transform 1s, box-shadow 1s" _hover={{ transform: 'scale(1.05)',}}>
         <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#cbe4fb"}>
            <Icon as={FaStore} fontSize={"30px"} color={"#007bfe"} />
          </Center>
          <Flex flexDir={"column"}>
            <Flex fontSize={"16px"} fontWeight={"extrabold"} _loading={true}>
              {userSelector.role == "ADMIN" ? dtStockBranch.length : dtAllProduct.length}
            </Flex>
            <Flex color={"grey"} fontSize={"16px"} fontWeight={"semibold"}>
             Produk
            </Flex>
          </Flex>
        </Flex>
        <Flex className="menuTotalG" transition="transform 1s, box-shadow 1s" _hover={{ transform: 'scale(1.05)',}}>
         <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#cbe4fb"}>
            <Icon as={FaStore} fontSize={"30px"} color={"#007bfe"} />
          </Center>
          <Flex flexDir={"column"}>
            <Flex fontSize={"14px"} fontWeight={"extrabold"} _loading={true}>
              {product_nameBestSeller}
            </Flex>
            <Flex color={"grey"} fontSize={"16px"} fontWeight={"semibold"}>
              Terlaris
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      </Flex>

      
      <Flex flexDir={"column"} rowGap={"10px"}>
        {/* chart */}
        <Flex overflowX={"auto"} w={"100%"} mt={5} mb={10} flexDir={"column"} fontWeight={'extrabold'}>
          <Flex fontSize={{base: "10px", sm: "18px", md : "20px", lg:"20px"}}>
            Grafik laporan penjualan berdasarkan Transaksi 
          </Flex>
          <ChartSalesReportTransactions dtSalesReport={dtSalesReport}/>
        </Flex>

        <Flex overflowX={"auto"} w={"100%"} mt={5} mb={10} flexDir={"column"} fontWeight={'extrabold'}>
          <Flex fontSize={{base: "10px", sm: "18px", md : "20px", lg:"20px"}}>
            Grafik laporan penjualan berdasarkan Product 
          </Flex>
          <ChartSalesReportProduct dtSumQtyProd={dtSumQtyProd}/>
        </Flex>

        <Flex overflowX={"auto"} w={"100%"} mt={5} mb={10} flexDir={"column"} fontWeight={'extrabold'}>
          <Flex fontSize={{base: "10px", sm: "18px", md : "20px", lg:"20px"}}>
            Grafik laporan penjualan berdasarkan Pembeli 
          </Flex>
          <ChartSalesReportUser dtSumQtyUser={dtSumQtyUser}/>
        </Flex>
        {/* chart */}
      </Flex>
      </Flex>
    </>
  );
}