import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";
import "../css/indexG.css";
import "../css/indexR.css";
import { api } from "../api/api";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import * as XLSX from "xlsx";
import { Chart, registerables, scales } from "chart.js";
import SalesReportTransactionContent from "./Sales-report-transaction-content";
Chart.register(...registerables);

export default function SalesReport() {
  const userSelector = useSelector((state) => state.auth);
  const roleOfUSer = userSelector.role;
  const searchRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dtSalesReport, setdtSalesReport] = useState([]);
  const [dtSalesReportFilter, setdtSalesReportFilter] = useState([]);
  const [allData, setAllData] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [total, setTotal] = useState();
  const [selectedSortBy, setSelectedSortBy] = useState();
  const [selectedOrderBy, setSelectedOrderBy] = useState();
  const [search, setSearch] = useState();
  const [ascModeDate, setAscModeDate] = useState(true);
  const [ascModePrice, setAscModePrice] = useState(true);
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);
  const [getBranch_name, setGetBranch_name] = useState([]);
  const [dtForDownload, setDtForDownload] = useState([]);
  const [inputBranch_name, setInputBranch_name] = useState();
  const [pages, setPages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [shown, setShown] = useState({ page: 1 });
  const [date, setDate] = useState({
    dateFrom: "",
    dateTo: "",
  });
  let transaksi;

  // inputHandler
  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempDate = { ...date };
    tempDate[id] = value;
    setDate(tempDate);
  };
  const inputHandlerBranch_name = (e) => {
    setInputBranch_name(e.target.value);
  };
  const branch_id =
    userSelector.role == "ADMIN" ? userSelector.branch_id : inputBranch_name;

  const itemPerPage = 3;
  const pageHandler = () => {
    const output = [];
    for (let i = 1; i <= totalPages; i++) {
      output.push(i);
    }
    setPages(output);
  };
  // inputHandler
  // fetch data
  const allDataOrder = async () => {
    try {
      setTotalPrice([]);
      await api()
        .get("/sales-report/")
        .then((res) => {
          setAllData(res.data.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchAll = async () => {
    const sendBody = {
      dateFrom: date.dateFrom
        ? date.dateFrom
        : moment().subtract(1, "weeks").format("YYYY-MM-DD"),
      dateTo: date.dateTo
        ? moment(date.dateTo).add(1, "days").format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
      branch_id: branch_id ? branch_id : "",
      search: search ? search : "",
    };
    try {
      setTotalPrice([]);
      await api()
        .post("/sales-report/all", sendBody)
        .then((res) => {
          setdtSalesReport(res.data.data);
          setDtForDownload(res.data.data);
          transaksi = res.data.data;
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchAllFilter = async () => {
    const sendBodyFilter = {
      dateFrom: date.dateFrom
        ? date.dateFrom
        : moment().subtract(1, "weeks").format("YYYY-MM-DD"),
      dateTo: date.dateTo
        ? moment(date.dateTo).add(1, "days").format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
      branch_id: branch_id ? branch_id : "",
      sort: selectedSortBy ? selectedSortBy : "createdAt",
      order: selectedOrderBy ? selectedOrderBy : "ASC",
      page: shown.page - 1 ? shown.page - 1 : "0",
      search: search ? search : "",
    };
    try {
      await api()
        .post("/sales-report/allFilter", sendBodyFilter)
        .then((res) => {
          setdtSalesReportFilter(res.data.data);
          setTotalPages(res.data.total);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  // fetch data

  // download ke excel
const handleDownloadExcel = () => {
    const excelData = dtForDownload.map((item, index) => ({
      No: index + 1,
      "Kode Transaksi": item.order_number,
      "Tanggal Transaksi": item.date.split("T")[0],
      "Nama Pembeli": item.User.user_name,
      "Nama Cabang": item.Branch.branch_name,
      "Lokasi Cabang (Kota - Provinsi)": `${item.Branch.City.city_name} - ${item.Branch.province}`,
      "Total Harga": formatCurrency(item.total),
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SalesReport");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "sales_report_transaksi.xlsx";
    link.click();
  };
  useEffect(() => {
    pageHandler();
  }, [dtSalesReportFilter]);
  useEffect(() => {
    if (shown.page > 0 && shown.page <= totalPages) {
      setPages(shown.page);
    }
  }, [shown]);
  useEffect(() => {
    fetchAll();
    allDataOrder();
    fetchAllFilter();
  }, []);
  useEffect(() => {
    fetchAll();
  }, [date, inputBranch_name, search]);
  useEffect(() => {
    fetchAllFilter();
  }, [date, inputBranch_name, selectedOrderBy, selectedSortBy, search, shown]);
  // menyimpan nilai total pembayaran pertransaksi(distinc)
  useEffect(() => {
    dtSalesReport.map((value) => {
      if (totalPrice.includes(value.total)) {
      } else {
        setTotalPrice((totalPrice) => [...totalPrice, value.total]);
      }
    });
  }, [dtSalesReport]);
  //  menyimpan id dan nama branch (distinc)
  useEffect(() => {
    const uniqueBranches = {};
    allData.forEach((val) => {
      const branchKey = `${val.branch_id}_${val.Branch.branch_name}`;
      uniqueBranches[branchKey] = {
        id: val.branch_id,
        name: val.Branch.branch_name,
      };
    });
    const newBranches = Object.values(uniqueBranches);
    setGetBranch_name(newBranches);
  }, [allData]);
  // mencari total pembayaran
  let totalPembayaran;
  useEffect(() => {
    if (totalPrice.length > 0) {
      totalPembayaran = totalPrice?.reduce((a, b) => a + b);
    }
    setTotal(totalPembayaran);
  }, [totalPrice]);
  // useEffect
  // untuk merubah angka ke currency
  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
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
        <SalesReportTransactionContent
          dtSalesReport={dtSalesReport}
          setdtSalesReport={setdtSalesReport}
          searchRef={searchRef}
          roleOfUSer={roleOfUSer}
          itemPerPage={itemPerPage}
          dtSalesReportFilter={dtSalesReportFilter}
          setdtSalesReportFilter={setdtSalesReportFilter}
          allData={allData}
          setAllData={setAllData}
          handleDownloadExcel={handleDownloadExcel}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          total={total}
          setTotal={setTotal}
          selectedSortBy={selectedSortBy}
          setSelectedSortBy={setSelectedSortBy}
          selectedOrderBy={selectedOrderBy}
          setSelectedOrderBy={setSelectedOrderBy}
          search={search}
          setSearch={setSearch}
          ascModeDate={ascModeDate}
          setAscModeDate={setAscModeDate}
          ascModePrice={ascModePrice}
          setAscModePrice={setAscModePrice}
          getBranch_name={getBranch_name}
          setGetBranch_name={setGetBranch_name}
          inputBranch_name={inputBranch_name}
          setInputBranch_name={setInputBranch_name}
          pages={pages}
          setPages={setPages}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          shown={shown}
          setShown={setShown}
          date={date}
          setDate={setDate}
          inputHandler={inputHandler}
          inputHandlerBranch_name={inputHandlerBranch_name}
          pageHandler={pageHandler}
          formatCurrency={formatCurrency}
          setIsDownloadTriggered={setIsDownloadTriggered}
        />
        {/* ============================================================ */}
      </Flex>
    </>
  );
}
