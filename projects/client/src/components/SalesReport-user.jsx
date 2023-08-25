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
import { Chart, registerables, scales } from 'chart.js';
import SalesReportProductContent from "./Sales-report-product-content";
import SalesReportUserContent from "./Sales-report-user-content";
Chart.register(...registerables);

export default function SalesReportUser() {
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
  const [dtSumQtyUserAll, setDtSumQtyUserAll] = useState([])
  const [dtSumQtyUserAllPagination, setDtSumQtyUserAllPagination] = useState([])
  const [dtSumQtyUser, setDtSumQtyUser] = useState([])
  const [dtSumQtyUserPagination, setDtSumQtyUserPagination] = useState([])
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
  const inputHandler = (e) => {
    const {id, value} = e.target
    const tempDate = {...date}
    tempDate[id] = value
    setDate(tempDate)
  }
  const inputHandlerBranch_name = (e) => {
    console.log(e.target.value);
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
        console.log(res.data.data);
        setGetBranch_name(res.data.data)
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(branch_id);

  const fetchSumQtyUserAll = async() => {
    const sendDataBody = {
      dateFrom : date.dateFrom ? date.dateFrom : moment().subtract(1, "weeks").format("YYYY-MM-DD"), 
      dateTo : date.dateTo ? moment(date.dateTo).add(1, "days").format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
      branch_id : branch_id ? branch_id : "",
      sort : selectedSortBy ? selectedSortBy : "",
      ordering : selectedOrderBy ? selectedOrderBy : "ASC",
      search : search ? search : ""
    }
    try {
      console.log(sendDataBody);
      await api()
      .post("sales-report/sum-userall", sendDataBody).then((res) => {
        console.log(res.data);
        console.log(res.data.dataTransByDate);
        setDtSumQtyUserAll(res.data.allData)
        setDtSumQtyUser(res.data.dataTransByDate)
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const fetchSumQtyUserAllPagination = async() => {
    const sendDataBody = {
      dateFrom : date.dateFrom ? date.dateFrom : moment().subtract(1, "weeks").format("YYYY-MM-DD"), 
      dateTo : date.dateTo ? moment(date.dateTo).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
      branch_id : branch_id ? branch_id : "",
      sort : selectedSortBy ? selectedSortBy : "",
      ordering : selectedOrderBy ? selectedOrderBy : "ASC",
      page : shown.page - 1 ? shown.page - 1 : "0",
      search : search ? search : ""
    }
    try {
      console.log(sendDataBody);
      await api()
      .post("sales-report/sum-userall-pagination", sendDataBody).then((res) => {
        console.log(res.data);
        console.log(res.data.dataTransByDate);
        setDtSumQtyUserAllPagination(res.data.allData)
        setDtSumQtyUserPagination(res.data.dataTransByDate)
        setTotalPages(res.data.total)
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  console.log(dtSumQtyUser);
  console.log(dtSumQtyUserAll);
  console.log(dtSumQtyUserPagination);
  console.log(dtSumQtyUserAllPagination);

  // fetch data
  // useEffect
  useEffect(() => {
    pageHandler()
  }, [dtSumQtyUserPagination, dtSumQtyUserAllPagination])
  useEffect(() => {
    if(shown.page > 0 && shown.page <= totalPages){
      setPages(shown.page)
    }
  }, [shown])

  console.log(shown.page);
  
  useEffect(() => {
    fetchDtBranch()
    fetchSumQtyUserAll()
    fetchSumQtyUserAllPagination()
  }, []);
  useEffect(() => {
    fetchDtBranch()
    fetchSumQtyUserAll()
  }, [date, inputBranch_name, search]);
  useEffect(() => {
    fetchDtBranch()
    fetchSumQtyUserAllPagination()
  }, [date, inputBranch_name, selectedOrderBy, selectedSortBy, search, shown]);
  console.log(getBranch_name);
  // useEffect

  return (
    <>
      <Box>
        <AdminNavbar onOpen={onOpen} />
      </Box>
      <Flex className="flex1R-salesReportTrans">
        {/* =========================================================== */}
        <SalesReportUserContent dtSumQtyUserPagination={dtSumQtyUserPagination} dtSumQtyUserAllPagination={dtSumQtyUserAllPagination} 
        searchRef={searchRef} roleOfUSer={roleOfUSer}  dtSumQtyUser={dtSumQtyUser} dtSumQtyUserAll={dtSumQtyUserAll} setInputBranch_name={setInputBranch_name}
        total={total} setTotal={setTotal} selectedSortBy={selectedSortBy} setSelectedSortBy={setSelectedSortBy} inputBranch_name={inputBranch_name}
        selectedOrderBy={selectedOrderBy} setSelectedOrderBy={setSelectedOrderBy} search={search} setSearch={setSearch} ascModeDate={ascModeDate} 
        ascModePrice={ascModePrice} setAscModePrice={setAscModePrice} getBranch_name={getBranch_name} setGetBranch_name={setGetBranch_name} 
        pages={pages} setPages={setPages} totalPages={totalPages} setTotalPages={setTotalPages} shown={shown} setShown={setShown} date={date} setDate={setDate}
        inputHandler={inputHandler} inputHandlerBranch_name={inputHandlerBranch_name} pageHandler={pageHandler} setAscModeDate={setAscModeDate}/>
        {/* ============================================================ */}
      </Flex>
    </>
  );
}