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
  Select,
} from "@chakra-ui/react";
import AdminNavbarOrder from "./admin-navbar-order";
import { BiSearch, BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import { useRef } from "react";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { SATableProduct } from "./sATableProduct";
import { AddProduct } from "./mAddProduct";
import { AdminTableStock } from "./admin-table-stock";
import { AddStock } from "./mAddStock";
import Pagination from "./pagination";
import { useSelector } from "react-redux";
import moment from "moment";

export default function AdminStockList() {
  const windowWidth = window.innerWidth;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addCategory, setAddCategory] = useState(null);
  const tableHeadRef = useRef(null);
  const tableRowRef = useRef(null);
  const searchRef = useRef(null);
  const userSelector = useSelector((state) => state.auth);

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

  //get all stock
  const [shown, setShown] = useState({ page: 1 });
  const [search, setSearch] = useState();
  const [filtering, setFiltering] = useState({
    page: shown.page,
    search: "",
    branch_id: "",
    category_id: "",
    time1: "",
    time2: moment().format("YYYY-MM-DD"),
    order: "DESC",
    sort: "createdAt",
  });
  const [totalPages, setTotalPages] = useState(0);
  const [addStock, setAddStock] = useState(null);
  const [stocks, setStocks] = useState([]);

  const fetchData = async () => {
    const params = { ...filtering };
    if (userSelector.branch_id) {
      params.branch_id = userSelector.branch_id;
    }
    try {
      const response = await api().get("/stock/admin", {
        params: { ...params },
      });
      setStocks(response.data.result);
      setTotalPages(response.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    getSelector();
    getSelectorCategory();
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
  }, [stocks]);

  useEffect(() => {
    if (shown.page > 0 && shown.page <= totalPages) {
      setFiltering({ ...filtering, page: shown.page });
    }
  }, [shown]);

  const productsPerPage = 6;
  const indexOfLastProduct = shown.page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  //get selector branch
  const [selector, setSelector] = useState([]);
  const getSelector = async () => {
    const get = await api().get("/branch/selector");
    setSelector(get.data.result);
  };

  const [selectorCategory, setSelectorCategory] = useState([]);
  const getSelectorCategory = async () => {
    const get = await api().get("/branch/selector-category");
    setSelectorCategory(get.data.result);
  };

  return (
    <>
      <Box>
        <AdminNavbarOrder onOpen={onOpen} />
      </Box>
      <Flex className="adminCategoryB">
        <Flex flexDir={"column"} rowGap={"10px"}>
          <Flex
            fontSize={"24px"}
            fontWeight={"700"}
            paddingBottom={"20px"}
            flexDir={"column"}
            rowGap={"10px"}
          >
            <Flex>Daftar Stok</Flex>
            <Flex justifyContent={"space-between"} w={"100%"} gap={"5px"}>
              <Input
                placeholder="Pilih Tanggal"
                bg={"white"}
                type="date"
                value={filtering.time1}
                maxW={"200px"}
                onChange={(e) => {
                  setFiltering({ ...filtering, time1: e.target.value });
                  setShown({ page: 1 });
                }}
              ></Input>
              -
              <Input
                placeholder="Pilih Tanggal"
                bg={"white"}
                type="date"
                maxW={"200px"}
                value={filtering.time2}
                onChange={(e) => {
                  setFiltering({ ...filtering, time2: e.target.value });
                  setShown({ page: 1 });
                }}
              ></Input>
              <InputGroup maxW={"300px"} w={"100%"}>
                <Input
                  placeholder="pencarian"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
              <Button
                onClick={onOpen}
                colorScheme={"yellow"}
                display={userSelector.role == "SUPER ADMIN" ? "none" : "flex"}
              >
                {<Icon as={AiOutlinePlus} fontSize={"28px"} />}
                <AddStock
                  id={addStock}
                  isOpen={isOpen}
                  onClose={onClose}
                  fetchData={fetchData}
                />
              </Button>
            </Flex>
            <Flex w={"100%"} gap={"10px"} justifyContent={"right"}>
              <Select
                placeholder="Kategori"
                value={filtering.category_id}
                h={"41px"}
                bg={"white"}
                onChange={(e) => {
                  setFiltering({ ...filtering, category_id: e.target.value });
                }}
              >
                {selectorCategory.map((val) => {
                  return <option value={val.id}>{val.category_name}</option>;
                })}
              </Select>
              <Select
                placeholder="Cabang"
                value={filtering.branch_id}
                bg={"white"}
                display={userSelector.role == "ADMIN" ? "none" : "flex"}
                onChange={(e) => {
                  setFiltering({ ...filtering, branch_id: e.target.value });
                }}
              >
                {selector.map((val) => {
                  return <option value={val.id}>{val.branch_name}</option>;
                })}
              </Select>
            </Flex>
            <Flex
              maxW={"65px"}
              fontSize={"12px"}
              _hover={{ cursor: "pointer", color: "lightgrey" }}
              onClick={() => {
                setFiltering({
                  page: 1,
                  order: "DESC",
                  sort: "createdAt",
                  search: "",
                  time1: "",
                  time2: moment().format("YYYY-MM-DD"),
                  status: "",
                  branch_id: userSelector.branch_id || "",
                  category_id: "",
                  feature: "",
                });
                setShown({ page: 1 });
                setSearch("");
              }}
            >
              Reset Filter
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
                    <Th textAlign={"center"} bgcolor="#ffb21c">
                      No
                    </Th>
                    <Th textAlign={"center"} bgcolor="#ffb21c">
                      Gambar
                    </Th>
                    <Th bgcolor="#ffb21c">
                      <Flex alignItems="center" id="tableNameB">
                        Nama Produk{" "}
                      </Flex>
                    </Th>
                    <Th className="thProductB" bgcolor="#ffb21c">
                      <Flex alignItems="center" id="tableNameB">
                        <Flex>Kategori</Flex>
                      </Flex>
                    </Th>
                    <Th className="thProductB" bgcolor="#ffb21c">
                      <Flex alignItems="center" id="tableNameB">
                        Harga{" "}
                      </Flex>
                    </Th>
                    <Th
                      textAlign={"center"}
                      bgcolor="#ffb21c"
                      className="thProductB"
                    >
                      Keterangan{" "}
                    </Th>
                    <Th className="thProductB" bgcolor="#ffb21c">
                      Berat{" "}
                    </Th>
                    <Th className="thProductB" bgcolor="#ffb21c">
                      Qty{" "}
                    </Th>
                    <Th className="thProductB" bgcolor="#ffb21c">
                      <Flex alignItems="center" id="tableNameB">
                        Tanggal{" "}
                        <Flex flexDirection="column">
                          <Icon
                            id="ascendingB"
                            as={MdArrowBackIosNew}
                            onClick={() => {
                              setFiltering({ ...filtering, order: "ASC" });
                            }}
                          />
                          <Icon
                            id="descendingB"
                            as={MdArrowBackIosNew}
                            onClick={() => {
                              setFiltering({ ...filtering, order: "DESC" });
                            }}
                          />
                        </Flex>
                      </Flex>
                    </Th>
                    <Th
                      textAlign={"center"}
                      bgcolor="#ffb21c"
                      display={
                        userSelector.role == "SUPER ADMIN" ? "none" : "column"
                      }
                    >
                      Tindakan
                    </Th>
                  </Tr>
                </Thead>
                <Tbody
                  className="tableRowG"
                  ref={tableRowRef}
                  onScroll={handleTableRowScroll}
                >
                  {stocks.map((stock, idx) => (
                    <AdminTableStock
                      key={stock.id}
                      idx={idx}
                      stock={stock}
                      qty={stock.quantity_stock}
                      discount={stock.discount}
                      url={stock.Product.photo_product_url}
                      product_name={stock.Product.product_name}
                      price={stock.Product.price}
                      desc={stock.Product.desc}
                      weight={stock.Product.weight}
                      category={stock.Product.category_id}
                      indexOfLastProduct={indexOfLastProduct}
                      productsPerPage={productsPerPage}
                      createdAt={stock.createdAt}
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
