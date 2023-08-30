import {
  Box,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
import "../css/indexG.css";
import "../css/indexR.css";
import { api } from "../api/api";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import * as XLSX from "xlsx"
import { Chart, registerables, scales } from 'chart.js';
import SalesReportProductContent from "./Sales-report-product-content";
Chart.register(...registerables);

export default function SalesReportProduct() {
  const userSelector = useSelector((state) => state.auth);
  const roleOfUSer = userSelector.role;
  const searchRef = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [total, setTotal] = useState()
  const [selectedSortBy, setSelectedSortBy] = useState()
  const [selectedOrderBy, setSelectedOrderBy] = useState()
  const [search, setSearch] = useState()
  const [ascModeDate, setAscModeDate] = useState(true)
  const [ascModePrice, setAscModePrice] = useState(true)
  const [dtSumQtyProd, setDtSumQtyProd] = useState([])
  const [dtForDownload, setDtForDownload] = useState([])
  const [dtSumQtyProdPagination, setDtSumQtyProdPagination] = useState([])
  const [getBranch_name, setGetBranch_name] = useState([])
  const [inputBranch_name, setInputBranch_name] = useState("")
  const [pages, setPages] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [shown, setShown] = useState({page : 1})
  const [date, setDate] =useState({
    dateFrom : "",
    dateTo : "",
  })
  // inputHandler
  const itemPerPage = 3
  const inputHandler = (e) => {
    const {id, value} = e.target
    const tempDate = {...date}
    tempDate[id] = value
    setDate(tempDate)
  }
  const inputHandlerBranch_name = (e) => {
    setInputBranch_name(e.target.value)
  }
  const branch_id = userSelector.role =="ADMIN" ? userSelector.branch_id : inputBranch_name
  const pageHandler = () => {
    const output = []
    for (let i = 1; i <= totalPages; i++) {
      output.push(i)
    }
    setPages(output)
  }
  // inputHandler
  // fetch data
  const fetchDtBranch = async() => {
    try {
      await api().get("/sales-report/dt-branch").then((res) => {
        setGetBranch_name(res.data.data)
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  const fetchSumQtyProduct = async() => {
    const sendDataBody = {
      dateFrom : date.dateFrom ? date.dateFrom : moment().subtract(1, "weeks").format("YYYY-MM-DD"), 
      dateTo : date.dateTo ? moment(date.dateTo).add(1, "days").format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
      branch_id : branch_id ? branch_id : "",
      sort : selectedSortBy ? selectedSortBy : "product_name",
      ordering : selectedOrderBy ? selectedOrderBy : "ASC",
      search : search ? search : ""
    }
    try {
      await api()
      .post("sales-report/sumqty", sendDataBody).then((res) => {
        setDtSumQtyProd(res.data.data)
        setDtForDownload(res.data.data)  
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  const fetchSumQtyProductForPagination = async() => {
    const sendDataBodyPagination = {
      dateFrom : date.dateFrom ? date.dateFrom : moment().subtract(1, "weeks").format("YYYY-MM-DD"), 
      dateTo : date.dateTo ? moment(date.dateTo).add(1, "days").format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
      branch_id : branch_id ? branch_id : "",
      sort : selectedSortBy ? selectedSortBy : "product_name",
      ordering : selectedOrderBy ? selectedOrderBy : "ASC",
      page : shown.page - 1 ? shown.page - 1 : '0', 
      search : search ? search : ""
    }
    try {
      await api()
      .post("sales-report/sumqty-forpage", sendDataBodyPagination).then((res) => {
        setDtSumQtyProdPagination(res.data.data)
        setTotalPages(res.data.total)
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  // fetch data

    // download ke excel
const handleDownloadExcel = () => {
  // if(isDownloadTriggered == true){
    const excelData = dtForDownload.map((item, index) => ({
      No : index+1,
      "Nama Produk": item?.Stock?.Product?.product_name,
      "Harga Produk": item?.Stock?.Product?.price,
      "Jumlah Terjual": item?.total_qty,
      "Jumlah Stok": item?.Stock?.quantity_stock,
      "Nama Cabang": item?.Order?.Branch?.branch_name
     }));
   
     const ws = XLSX.utils.json_to_sheet(excelData);
     const wb = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'SalesReport');
     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
     const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
     const url = URL.createObjectURL(blob);
     
     const link = document.createElement('a');
     link.href = url;
     link.download = 'sales_report_produk.xlsx';
     link.click();

    //  setIsDownloadTriggered(false)
  // }
  
};


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
  // useEffect
  useEffect(() => {
    pageHandler()
  }, [dtSumQtyProdPagination])
  useEffect(() => {
    if(shown.page > 0 && shown.page <= totalPages){
      setPages(shown.page)
    }
  }, [shown])
  useEffect(() => {
    fetchSumQtyProduct()
    fetchSumQtyProductForPagination()
    cariBestSeller()
  }, []);
  useEffect(() => {
    fetchSumQtyProduct()
    cariBestSeller()
  }, [date, inputBranch_name, search]);
  useEffect(() => {
    fetchSumQtyProductForPagination()
  }, [date, inputBranch_name, selectedOrderBy, selectedSortBy, search, shown]);
      //  menyimpan id dan nama branch (distinc)
  useEffect(() => {
    fetchDtBranch()
  }, []);
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


  return (
    <>
      <Box>
        <AdminNavbar onOpen={onOpen} />
      </Box>
      <Flex className="flex1R-salesReportTrans">
        {/* =========================================================== */}
        <SalesReportProductContent dtSumQtyProdPagination={dtSumQtyProdPagination} setDtSumQtyProdPagination={setDtSumQtyProdPagination}
        dtSumQtyProd={dtSumQtyProd} setDtSumQtyProd={setDtSumQtyProd} searchRef={searchRef} roleOfUSer={roleOfUSer} itemPerPage={itemPerPage}
        total={total} setTotal={setTotal} selectedSortBy={selectedSortBy} setSelectedSortBy={setSelectedSortBy} handleDownloadExcel={handleDownloadExcel}
        selectedOrderBy={selectedOrderBy} setSelectedOrderBy={setSelectedOrderBy} search={search} setSearch={setSearch} ascModeDate={ascModeDate} setAscModeDate={setAscModeDate}
        ascModePrice={ascModePrice} setAscModePrice={setAscModePrice} getBranch_name={getBranch_name} setGetBranch_name={setGetBranch_name} inputBranch_name={inputBranch_name} setInputBranch_name={setInputBranch_name}
        pages={pages} setPages={setPages} totalPages={totalPages} setTotalPages={setTotalPages} shown={shown} setShown={setShown} date={date} setDate={setDate} total_terjualBestSeller={total_terjualBestSeller}
        inputHandler={inputHandler} inputHandlerBranch_name={inputHandlerBranch_name} pageHandler={pageHandler} formatCurrency={formatCurrency} product_nameBestSeller={product_nameBestSeller}/>
        {/* ============================================================ */}
      </Flex>
    </>
  );
}