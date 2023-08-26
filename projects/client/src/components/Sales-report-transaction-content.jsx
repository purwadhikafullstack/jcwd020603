import {
  Button,
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
import { BiSearch, BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import "../css/indexG.css";
import "../css/indexR.css";
import { FaRupiahSign } from "react-icons/fa6";
import { MdOutlinePayments, MdArrowBackIosNew } from "react-icons/md";
import ChartSalesReportTransactions from "./Chart-SalesReport-transaction";
import { Chart, registerables, scales } from "chart.js";
import Pagination from "./pagination";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useRef } from "react";
Chart.register(...registerables);

export default function SalesReportTransactionContent(props) {
  const {
    dtSalesReport,
    dtSalesReportFilter,
    total,
    setSelectedSortBy,
    setSelectedOrderBy,
    setSearch,
    ascModeDate,
    setAscModeDate,
    ascModePrice,
    setAscModePrice,
    getBranch_name,
    pages,
    roleOfUSer,
    totalPages,
    shown,
    setShown,
    date,
    inputHandler,
    inputHandlerBranch_name,
    formatCurrency,
    searchRef,
  } = props;
  console.log(dtSalesReport, "data");
  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `Sales-report Trasaction`,
    sheet: "Sales-report Trasaction",
  });

  return (
    <>
      <Flex
        flexDir={"row"}
        justifyContent={"center"}
        mb={"10px"}
        fontWeight={"extrabold"}
        fontSize={{ base: "25px", sm: "25px", md: "40px", lg: "50px" }}
      >
        Laporan Penjualan
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
          w={"100%"}
        >
          <Flex
            className="menuTotalG"
            justifyContent={"center"}
            transition="transform 1s, box-shadow 1s"
            _hover={{ transform: "scale(1.05)" }}
          >
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

          <Flex
            className="menuTotalG"
            transition="transform 1s, box-shadow 1s"
            _hover={{ transform: "scale(1.05)" }}
          >
            <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#ccf4bf"}>
              <Icon as={FaRupiahSign} fontSize={"30px"} color={"#73d673"} />
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
        </Flex>
      </Flex>
      <Flex flexDir={"column"} rowGap={"10px"}>
        <Flex
          fontSize={"24px"}
          fontWeight={"700"}
          paddingBottom={"20px"}
          justifyContent={"space-between"}
          flexDir={{ base: "column", sm: "column", md: "row", lg: "row" }}
        >
          <Flex
            fontSize={15}
            w={{ base: "100%", sm: "100%", md: "45%", lg: "45%" }}
          >
            <Flex
              w={"100%"}
              gap={"10px"}
              alignItems={"end"}
              justifyContent={"space-between"}
            >
              <Flex flexDir={"column"} w={"48%"}>
                Periode Dari
                <Input
                  id="dateFrom"
                  value={date.dateFrom}
                  onChange={inputHandler}
                  type="date"
                  placeholder="Dari"
                  bgColor={"white"}
                ></Input>
              </Flex>
              <Flex flexDir={"column"} w={"48%"}>
                Periode Sampai
                <Input
                  id="dateTo"
                  value={date.dateTo}
                  onChange={inputHandler}
                  type="date"
                  placeholder="Dari"
                  bgColor={"white"}
                ></Input>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            maxW={"400px"}
            w={"100%"}
            gap={"10px"}
            alignItems={"end"}
            justifyContent={() =>
              roleOfUSer == "SUPER ADMIN" ? "space beetwen" : "right"
            }
          >
            <Select
              onChange={inputHandlerBranch_name}
              id="branch_name"
              w={"50%"}
              placeholder="Pilih Lokasi Cabang"
              bg={"white"}
              display={() => (roleOfUSer == "SUPER ADMIN" ? "flex" : "none")}
            >
              {getBranch_name.map((val, index) => (
                <option key={index} value={val.id}>
                  {val.name}
                </option>
              ))}
            </Select>
            <InputGroup w={"50%"}>
              <Input placeholder="search" bg={"white"} ref={searchRef}></Input>
              <InputRightElement
                as={BiSearch}
                w={"30px"}
                h={"30px"}
                padding={"10px 10px 0px 0px"}
                onClick={() => {
                  setSearch(searchRef.current.value);
                }}
              />
            </InputGroup>
          </Flex>
        </Flex>

        {/* chart */}
        <Flex
          overflowX={"auto"}
          w={"100%"}
          mt={5}
          mb={10}
          flexDir={"column"}
          fontWeight={"extrabold"}
        >
          <Flex fontSize={{ base: "10px", sm: "18px", md: "20px", lg: "20px" }}>
            Grafik laporan penjualan berdasarkan Transaksi
            <Flex ml={"5px"} display={date.dateFrom ? "none" : "flex"}>
              (Periode 1 minggu terakhir)
            </Flex>
          </Flex>
          <ChartSalesReportTransactions dtSalesReport={dtSalesReport} />
        </Flex>
        {/* chart */}
        {/* table */}
        <Flex w={"100%"} overflowX={"auto"} flexDir={"column"}>
          <Flex
            w={"100%"}
            fontSize={{ base: "10px", sm: "18px", md: "20px", lg: "20px" }}
            fontWeight={"extrabold"}
          >
            Table laporan penjualan berdasarkan Transaksi
          </Flex>
          <Flex padding={"10px 0px"}>
            <Button
              onClick={onDownload}
              maxW={"150px"}
              w={"100%"}
              bg={"#ffb21c"}
            >
              Download Report
            </Button>
          </Flex>
          <Table
            size="sm"
            w={"100%"}
            variant="simple"
            className="custom-table"
            maxW={"850px"}
            ref={tableRef}
          >
            <Thead w={"100%"} bg={"#ffb21c"} fontSize={"12px"}>
              <Tr>
                <Th>No</Th>
                <Th>Kode transaksi</Th>
                {/* <Th>Tanggal transaksi</Th> */}
                <Th
                  cursor={"pointer"}
                  onClick={() => {
                    setSelectedSortBy("createdAt");
                    setSelectedOrderBy(ascModeDate ? "ASC" : "DESC");
                    setAscModeDate(!ascModeDate);
                  }}
                >
                  <Flex w={"100%"} gap={"10%"} alignItems={"center"}>
                    Tanggal Transaksi
                    {ascModeDate ? (
                      <MdArrowBackIosNew size={"15%"} id="descendingB" />
                    ) : (
                      <MdArrowBackIosNew id="ascendingB" size={"15%"} />
                    )}
                  </Flex>
                </Th>
                <Th>Nama Pembeli</Th>
                <Th>Nama Cabang</Th>
                <Th>Lokasi Cabang (Kota - Provinsi)</Th>
                {/* <Th>Total Harga</Th> */}
                <Th
                  cursor={"pointer"}
                  onClick={() => {
                    setSelectedSortBy("total");
                    setSelectedOrderBy(ascModePrice ? "ASC" : "DESC");
                    setAscModePrice(!ascModePrice);
                  }}
                >
                  <Flex w={"100%"} gap={"15%"} alignItems={"center"}>
                    Total Harga
                    {ascModePrice ? (
                      <MdArrowBackIosNew id="descendingB" size={"15%"} />
                    ) : (
                      <MdArrowBackIosNew id="ascendingB" size={"15%"} />
                    )}
                  </Flex>
                </Th>
              </Tr>
            </Thead>

            <Tbody fontSize={"10px"}>
              {dtSalesReportFilter?.map((val, index) => (
                <Tr key={val?.id} className="table-row">
                  <Td>{index + 1}</Td>
                  <Td>{val?.order_number}</Td>
                  <Td>{val.date.split("T")[0]}</Td>
                  <Td>{val.User.user_name}</Td>
                  <Td>{val.Branch.branch_name}</Td>
                  <Td>
                    {val.Branch.City.city_name} - {val.Branch.province}{" "}
                  </Td>
                  <Td>{formatCurrency(val.total)} </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
        {/* table */}
        {/* Pagination */}
        <Flex justifyContent={"end"}>
          <Pagination
            shown={shown}
            setShown={setShown}
            totalPages={totalPages}
            pages={pages}
          />
        </Flex>
        {/* Pagination */}
      </Flex>
    </>
  );
}
