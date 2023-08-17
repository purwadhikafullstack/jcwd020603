import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  useDisclosure,
  Tbody,
  Button,
} from "@chakra-ui/react";
import AdminNavbarOrder from "./admin-navbar-order";
import { BiSearch, BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import { useRef } from "react";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { SATableStockHistory } from "./SATableStockHistory";
import { AddProduct } from "./mAddProduct";
import Pagination from "./pagination";

export default function StockHistoryList() {
  const windowWidth = window.innerWidth;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tableHeadRef = useRef(null);
  const tableRowRef = useRef(null);
  const searchRef = useRef(null);

  const handleTableHeadScroll = (e) => {
    if (tableRowRef.current) {
      tableRowRef.current.scrollLeft = e.target.scrollLeft;
    }
  };
  const handleTableRowScroll = (e) => {
    if (tableHeadRef.current) {
      tableHeadRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  //get all category
  const [shown, setShown] = useState({ page: 1 });
  const [filtering, setFiltering] = useState({
    page: shown.page,
    search: "",
  });
  const [totalPages, setTotalPages] = useState(0);
  const [stockHistory, setStockHistory] = useState([]);

  const fetchData = async () => {
    const params = { ...filtering };
    const token = JSON.parse(localStorage.getItem("auth"));
    try {
      const response = await api().get("/stock/stockhistory", {
        params: { ...params },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStockHistory(response.data.result);
      setTotalPages(response.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [filtering]);

  //pagination
  const [pages, setPages] = useState([]);
  function pageHandler() {
    const output = [];
    for (let i = 1; i <= totalPages; i++) {
      output.push(i);
    }
    setPages(output);
  }
  useEffect(() => {
    pageHandler();
  }, [stockHistory]);

  useEffect(() => {
    if (shown.page > 0 && shown.page <= totalPages) {
      setFiltering({ ...filtering, page: shown.page });
    }
  }, [shown]);

  const productsPerPage = 10;
  const indexOfLastProduct = shown.page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  return (
    <>
      <Box>
        <AdminNavbarOrder onOpen={onOpen} />
      </Box>
      <Flex className="adminCategoryB">
        <Flex flexDir={"column"} rowGap={"10px"}>
          <Flex className="adminCategory2B">
            <Flex width={"350px"}>Stock History</Flex>
            <Flex maxW={"400px"} w={"100%"} gap={"10px"}>
              <InputGroup>
                <Input
                  placeholder="search"
                  bg={"white"}
                  ref={searchRef}
                ></Input>
                <InputRightElement
                  as={BiSearch}
                  w={"30px"}
                  h={"30px"}
                  padding={"10px 10px 0px 0px"}
                  onClick={() => {
                    setFiltering({
                      ...filtering,
                      search: searchRef.current.value,
                    });
                    setShown({ page: 1 });
                  }}
                />
              </InputGroup>
            </Flex>
          </Flex>
          <Stack>
            <TableContainer
              id="containerTableB"
              justifyContent={"space-between"}
            >
              <Table variant="simple">
                <Thead
                  className="tableHeadG"
                  onScroll={handleTableHeadScroll}
                  ref={tableHeadRef}
                >
                  <Tr className="tableHeadMenuG">
                    <Th textAlign={"center"}>No</Th>
                    <Th textAlign={"center"}>Pic</Th>
                    <Th>
                      <Flex alignItems="center" id="tableNameB">
                        Product Name{" "}
                        <Flex flexDirection="column">
                          <Icon id="ascendingB" as={MdArrowBackIosNew} />
                          <Icon id="descendingB" as={MdArrowBackIosNew} />
                        </Flex>
                      </Flex>
                    </Th>
                    <Th className="thProductB">
                      <Flex alignItems="center" id="tableNameB">
                        <Flex>Category</Flex>
                        <Flex flexDirection="column">
                          <Icon id="ascendingB" as={MdArrowBackIosNew} />
                          <Icon id="descendingB" as={MdArrowBackIosNew} />
                        </Flex>
                      </Flex>
                    </Th>
                    <Th className="thProductB">Stock Before </Th>
                    <Th className="thProductB">
                      <Flex alignItems="center" id="tableNameB">
                        Status{" "}
                        <Flex flexDirection="column">
                          <Icon id="ascendingB" as={MdArrowBackIosNew} />
                          <Icon id="descendingB" as={MdArrowBackIosNew} />
                        </Flex>
                      </Flex>
                    </Th>
                    <Th className="thProductB">Difference </Th>
                    <Th className="thProductB">Stock After </Th>
                    <Th className="thProductB">Features</Th>
                    {/* <Th textAlign={"center"}>Action</Th> */}
                  </Tr>
                </Thead>
                <Tbody
                  className="tableRowG"
                  ref={tableRowRef}
                  onScroll={handleTableRowScroll}
                >
                  {stockHistory.map((stockHistory, idx) => (
                    <SATableStockHistory
                      key={stockHistory.id}
                      idx={idx}
                      stockHistory={stockHistory}
                      url={stockHistory.Stock?.Product?.photo_product_url}
                      product_name={stockHistory.Stock?.Product?.product_name}
                      category={stockHistory.Stock?.Product?.category_id}
                      status={stockHistory.status}
                      status_quantity={stockHistory.status_quantity}
                      feature={stockHistory.feature}
                      stock={stockHistory.stock_id}
                      before={stockHistory.quantity_before}
                      after={stockHistory.quantity_after}
                      indexOfLastProduct={indexOfLastProduct}
                      productsPerPage={productsPerPage}
                      fetchData={fetchData}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Flex justifyContent={"end"}>
              <Pagination
                shown={shown}
                setShown={setShown}
                totalPages={totalPages}
                pages={pages}
              />
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
