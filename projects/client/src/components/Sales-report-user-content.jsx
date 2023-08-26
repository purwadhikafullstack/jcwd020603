import {
  Button,
  Center,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
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
import SalesReportUserDetailModal from "./SalesReportUserDetailModal";
import { useRef, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
Chart.register(...registerables);

export default function SalesReportUserContent(props) {
  const userSelector = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [indexnya, setIndexnya] = useState(0);
  console.log(indexnya);
  const {
    setSelectedSortBy,
    setSelectedOrderBy,
    setSearch,
    ascModeDate,
    setAscModeDate,
    dtSumQtyUser,
    dtSumQtyUserByTrans,
    dtSumQtyUserPagination,
    ascModePrice,
    setAscModePrice,
    getBranch_name,
    pages,
    roleOfUSer,
    totalPages,
    shown,
    setShown,
    date,
    dtSumQtyUserAll,
    dtSumQtyUserAllPagination,
    inputHandler,
    inputHandlerBranch_name,
    formatCurrency,
    searchRef,
    dtSumQtyProdPagination,
    inputBranch_name,
    setInputBranch_name,
  } = props;

  let ini_namanya = null;
  const branch_namenya = () => {
    if (roleOfUSer == "SUPER ADMIN") {
      if (inputBranch_name) {
        for (const obj of getBranch_name) {
          if (obj.id == inputBranch_name) {
            ini_namanya = obj.branch_name;
            break;
          }
        }
        return ini_namanya;
      } else {
        return "Semua Cabang";
      }
    } else {
      for (const obj of getBranch_name) {
        if (obj.id == userSelector.branch_id) {
          ini_namanya = obj.branch_name;
          break;
        }
      }
      return ini_namanya;
    }
  };
  console.log(branch_namenya());
  console.log(ini_namanya);
  console.log(dtSumQtyUserPagination);
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
              <Icon as={FaPeopleGroup} fontSize={"30px"} color={"#ffb21c"} />
            </Center>
            <Flex flexDir={"column"}>
              <Flex fontSize={"20px"} fontWeight={"extrabold"} _loading={true}>
                {dtSumQtyUser.length}
              </Flex>
              <Flex color={"grey"} fontWeight={"semibold"}>
                Total Pembeli
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
              <Flex fontSize={"16px"} fontWeight={"extrabold"} _loading={true}>
                {branch_namenya()}
              </Flex>
              <Flex color={"grey"} fontSize={"16px"} fontWeight={"semibold"}>
                Nama Cabang
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
                  {val.branch_name}
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
            Grafik laporan penjualan berdasarkan Pembeli
            <Flex ml={"5px"} display={date.dateFrom ? "none" : "flex"}>
              (Periode 1 minggu terakhir)
            </Flex>
          </Flex>
          <ChartSalesReportUser
            dtSumQtyUser={dtSumQtyUser}
            dtSumQtyUserAll={dtSumQtyUserAll}
          />
        </Flex>
        {/* chart */}
        {/* table */}

        <Flex w={"100%"} overflowX={"auto"} flexDir={"column"}>
          <Flex
            w={"100%"}
            fontSize={{ base: "10px", sm: "18px", md: "20px", lg: "20px" }}
            fontWeight={"extrabold"}
          >
            Table laporan penjualan berdasarkan Pembeli
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
            <Thead w={"100%"} bg={"#ffb21c"} fontSize={"14px"}>
              <Tr>
                <Th>No</Th>
                <Th
                  cursor={"pointer"}
                  onClick={() => {
                    setSelectedSortBy("createdAt");
                    setSelectedOrderBy(ascModeDate ? "ASC" : "DESC");
                    setAscModeDate(!ascModeDate);
                  }}
                >
                  <Flex w={"100px"}>
                    <Flex w={"70%"}>Tanggal</Flex>
                    {ascModeDate ? (
                      <MdArrowBackIosNew size={"8%"} id="descendingB" />
                    ) : (
                      <MdArrowBackIosNew id="ascendingB" size={"8%"} />
                    )}
                  </Flex>
                </Th>
                <Th>Jumlah Transaksi</Th>
                <Th>Jumlah Pembeli</Th>
                <Th>Detail</Th>
              </Tr>
            </Thead>

            <Tbody fontSize={"14px"}>
              {dtSumQtyUserPagination?.map((val, index) => (
                <Tr key={index} className="table-row">
                  <Td textAlign={"center"}>{index + 1}</Td>
                  <Td>{val?.date}</Td>
                  <Td>{val?.total_transaksi}</Td>
                  <Td textAlign={"center"}>{val?.dataUser.length}</Td>
                  <Td
                    onClick={() => {
                      onOpen();
                      setIndexnya(index);
                    }}
                    cursor={"pointer"}
                  >
                    <IoReorderThreeSharp />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
        {/* Pagination */}
        <Flex justifyContent={"end"}>
          <Pagination
            shown={shown}
            setShown={setShown}
            totalPages={totalPages}
            pages={pages}
          />
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW={"500px"} w={"100%"} borderRadius={"20px"}>
          <SalesReportUserDetailModal
            isOpen={isOpen}
            onClose={onClose}
            indexnya={indexnya}
            dtSumQtyUser={dtSumQtyUser}
            dtSumQtyUserAll={dtSumQtyUserAll}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
