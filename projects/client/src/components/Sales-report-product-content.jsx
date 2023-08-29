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
  import { FaStore } from "react-icons/fa";
  import { MdOutlinePayments, MdArrowBackIosNew } from "react-icons/md";
  import { Chart, registerables, scales } from 'chart.js';
  import Pagination from "./pagination";
  import ChartSalesReportProduct from "./Chart-SalesReport-product";
  Chart.register(...registerables);
  

export default function SalesReportProductContent (props) {
    
  const {
  setSelectedSortBy, setSelectedOrderBy, setSearch, ascModeDate, setAscModeDate, total_terjualBestSeller,handleDownloadExcel,
  ascModePrice, setAscModePrice, getBranch_name, pages, roleOfUSer,totalPages, shown, setShown, date, product_nameBestSeller,
  inputHandler, inputHandlerBranch_name, formatCurrency, searchRef, dtSumQtyProd, dtSumQtyProdPagination, itemPerPage } = props
    return(
        <>
        <Flex flexDir={"row"} justifyContent={"center"} mb={"10px"} fontWeight={"extrabold"} fontSize={{base: "25px" , sm:"25px", md:"40px", lg: "50px"}}>
          Laporan Penjualan
        </Flex>
        <Flex  gap={"10%"} w={"100%"} h={"auto"} alignItems={{base : "center", sm: "center"}} flexDir={"column"} >
        <Flex gap={"15px"} alignItems={{base : "center", sm: "center"}} justifyContent={"space-evenly"} flexDir={{base : "column", sm: "column", md: "row", lg: "row"}} w={"100%"}>
          <Flex className="menuTotalG" justifyContent={"center"} transition="transform 1s, box-shadow 1s" _hover={{ transform: 'scale(1.05)',}} >
            <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#fdefce"}>
              <Icon
                as={MdOutlinePayments}
                fontSize={"30px"}
                color={"#ffb21c"}
              />
            </Center>
            <Flex flexDir={"column"}>
              <Flex fontSize={"20px"} fontWeight={"extrabold"} _loading={true}>
                {product_nameBestSeller}
              </Flex>
              <Flex color={"grey"} fontWeight={"semibold"}>
                Produk Terlaris
              </Flex>
            </Flex>
          </Flex>

          <Flex className="menuTotalG" transition="transform 1s, box-shadow 1s" _hover={{ transform: 'scale(1.05)',}}>
            <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#ccf4bf"}>
              <Icon
                as={FaRupiahSign}
                fontSize={"30px"}
                color={"#73d673"}
              />
            </Center>
            <Flex flexDir={"column"}>
              <Flex fontSize={"18px"} fontWeight={"extrabold"} _loading={true}>
                {total_terjualBestSeller}
              </Flex>
              <Flex color={"grey"} fontSize={"16px"} fontWeight={"semibold"}>
                Total Penjualan
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
            flexDir={{base: "column", sm: "column", md: "row", lg: "row"}}>

            <Flex fontSize={15} w={{base: "100%", sm: "100%", md: "45%", lg: "45%"}}>
              <Flex w={"100%"} gap={"10px"} alignItems={"end"}  justifyContent={"space-between"}>
                <Flex flexDir={"column"} w={"48%"} >
                  Periode Dari
                <Input id="dateFrom" value={date.dateFrom} onChange={inputHandler} type="date" placeholder="Dari" bgColor={"white"} ></Input>
                </Flex>
                <Flex flexDir={"column"} w={"48%"}>
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
                  <option  key={index} value={val.id}>{val.branch_name}</option>
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
                    setSearch(searchRef.current.value)
                  }}
                />
              </InputGroup>
            </Flex>
          </Flex>

          {/* chart */}
          <Flex overflowX={"auto"} w={"100%"} mt={5} mb={10} flexDir={"column"} fontWeight={'extrabold'}>
            <Flex fontSize={{base: "10px", sm: "18px", md : "20px", lg:"20px"}}>
              Grafik laporan penjualan berdasarkan Produk 
              <Flex ml={"5px"} display={date.dateFrom ? "none" : "flex"}>(Periode 1 minggu terakhir)</Flex></Flex>
            <ChartSalesReportProduct dtSumQtyProd={dtSumQtyProd}/>
          </Flex>
          {/* chart */}
          {/* table */}
          <Flex w={"100%"} overflowX={"auto"} flexDir={"column"} >
          <Flex w={"100%"} fontSize={{base: "10px", sm: "18px", md : "20px", lg:"20px"}} fontWeight={'extrabold'}>Table laporan penjualan berdasarkan Produk</Flex>
          <Button  borderTopRadius={"20px"} bgColor={"#EBE76C"} fontWeight={"extrabold"}
           onClick={()=> {
            // setIsDownloadTriggered(true)
             handleDownloadExcel()}}>Unduh ke Excel</Button>
          <Table
            size="sm"
            w={"100%"}
            variant="simple"
            className="custom-table"
            maxW={"850px"}>
            <Thead w={"100%"} bg={"#ffb21c"} fontSize={"14px"}>
              <Tr>
                <Th>No</Th>
                <Th cursor={"pointer"} onClick={()=> {
                  setSelectedSortBy("product_name")
                  setSelectedOrderBy(ascModeDate ? "ASC" : "DESC")
                  setAscModeDate(!ascModeDate)
                }}><Flex w={"100%"} gap={"10%"} alignItems={"center"}>Nama Produk
                {ascModeDate ? <MdArrowBackIosNew size={"8%"} id="descendingB"/> : 
                <MdArrowBackIosNew id="ascendingB" size={"8%"}/>}</Flex></Th>

                <Th cursor={"pointer"} onClick={()=> {
                  setSelectedSortBy("price")
                  setSelectedOrderBy(ascModePrice ? "ASC" : "DESC")
                  setAscModePrice(!ascModePrice)
                }}><Flex w={"100%"} gap={"15%"} alignItems={"center"}>Harga Produk @
                {ascModePrice ? <MdArrowBackIosNew id="descendingB" size={"8%"}/> : 
                <MdArrowBackIosNew id="ascendingB" size={"8%"}/>}</Flex></Th>

                <Th cursor={"pointer"} onClick={()=> {
                  setSelectedSortBy("total_qty")
                  setSelectedOrderBy(ascModePrice ? "ASC" : "DESC")
                  setAscModePrice(!ascModePrice)
                }}><Flex w={"100%"} gap={"15%"} alignItems={"center"}>Jumlah Terjual
                {ascModePrice ? <MdArrowBackIosNew id="descendingB" size={"8%"}/> : 
                <MdArrowBackIosNew id="ascendingB" size={"8%"}/>}</Flex></Th>
                {/* <Th>Jumlah Terjual</Th> */}
                <Th>Jumlah Stok</Th>
                <Th>Nama Cabang</Th>
              </Tr>
            </Thead>

            <Tbody fontSize={"14px"}>
              {dtSumQtyProdPagination?.map((val, index) => (
                <Tr key={val?.index} className="table-row">
                  <Td textAlign={"center"}>{((shown.page -1) * itemPerPage) + (index + 1)}</Td>
                  <Td >{val?.Stock?.Product?.product_name}</Td>
                  <Td textAlign={"center"}>{formatCurrency(val?.Stock?.Product?.price)}</Td>
                  <Td textAlign={"center"}>{val?.total_qty}</Td>
                  <Td textAlign={"center"}>{val?.Stock?.quantity_stock}</Td>
                  <Td textAlign={"center"}>{val?.Order.Branch.branch_name}</Td>                  
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
            pages={pages}/>
          </Flex>
        </Flex>
        </>
    )
}