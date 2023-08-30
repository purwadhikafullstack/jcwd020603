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
import Pagination from "./pagination";
import { useSelector } from "react-redux";

export default function SuperAdminProductList() {
  const windowWidth = window.innerWidth;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addProduct, setAddProduct] = useState(null);
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

  //get all product
  const [shown, setShown] = useState({ page: 1 });
  const [search, setSearch] = useState();
  const [filtering, setFiltering] = useState({
    page: shown.page,
    search: "",
    category_id: "",
    order: "DESC",
    sort: "createdAt",
  });

  const [totalPages, setTotalPages] = useState(0);
  const [product, setProduct] = useState([]);

  const fetchData = async () => {
    const params = { ...filtering };
    const token = JSON.parse(localStorage.getItem("auth"));
    try {
      const response = await api().get("/product/admin", {
        params: { ...params },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(response.data.result);
      setTotalPages(response.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    getSelector();
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
  }, [product]);

  useEffect(() => {
    if (shown.page > 0 && shown.page <= totalPages) {
      setFiltering({ ...filtering, page: shown.page });
    }
  }, [shown]);

  const productsPerPage = 5;
  const indexOfLastProduct = shown.page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  //get selector branch
  const [selector, setSelector] = useState([]);
  const getSelector = async () => {
    const get = await api().get("/branch/selector-category");
    setSelector(get.data.result);
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
            <Flex>Daftar Produk</Flex>
            <Flex justifyContent={"space-between"} w={"100%"} gap={"5px"}>
              <Select
                placeholder="Kategori"
                value={filtering.category_id}
                h={"41px"}
                bg={"white"}
                onChange={(e) => {
                  setFiltering({ ...filtering, category_id: e.target.value });
                }}
              >
                {selector.map((val) => {
                  return <option value={val.id}>{val.category_name}</option>;
                })}
              </Select>
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
                display={userSelector.role == "ADMIN" ? "none" : "flex"}
              >
                {<Icon as={AiOutlinePlus} fontSize={"28px"} />}
                <AddProduct
                  id={addProduct}
                  isOpen={isOpen}
                  onClose={onClose}
                  fetchData={fetchData}
                />
              </Button>
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
                  category_id: "",
                });
                setShown({ page: 1 });
                setSearch();
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
                        <Flex flexDirection="column">
                          <Icon
                            id="ascendingB"
                            as={MdArrowBackIosNew}
                            onClick={() => {
                              setFiltering({
                                ...filtering,
                                order: "ASC",
                                sort: "product_name",
                              });
                            }}
                          />
                          <Icon
                            id="descendingB"
                            as={MdArrowBackIosNew}
                            onClick={() => {
                              setFiltering({
                                ...filtering,
                                order: "DESC",
                                sort: "product_name",
                              });
                            }}
                          />
                        </Flex>
                      </Flex>
                    </Th>
                    <Th
                      textAlign={"center"}
                      className="thProductB"
                      bgcolor="#ffb21c"
                    >
                      <Flex alignItems="center" id="tableNameB">
                        <Flex>Kategori</Flex>
                      </Flex>
                    </Th>
                    <Th
                      textAlign={"center"}
                      className="thProductB"
                      bgcolor="#ffb21c"
                    >
                      <Flex alignItems="center" id="tableNameB">
                        Harga{" "}
                      </Flex>
                    </Th>
                    <Th
                      textAlign={"center"}
                      className="thProductB"
                      bgcolor="#ffb21c"
                    >
                      Desc{" "}
                    </Th>
                    <Th
                      textAlign={"center"}
                      className="thProductB"
                      bgcolor="#ffb21c"
                    >
                      Berat{" "}
                    </Th>
                    <Th
                      textAlign={"center"}
                      className="thProductB"
                      bgcolor="#ffb21c"
                    >
                      <Flex alignItems="center" id="tableNameB">
                        Tanggal{" "}
                        <Flex flexDirection="column">
                          <Icon
                            id="ascendingB"
                            as={MdArrowBackIosNew}
                            onClick={() => {
                              setFiltering({
                                ...filtering,
                                order: "ASC",
                                sort: "createdAt",
                              });
                            }}
                          />
                          <Icon
                            id="descendingB"
                            as={MdArrowBackIosNew}
                            onClick={() => {
                              setFiltering({
                                ...filtering,
                                order: "DESC",
                                sort: "createdAt",
                              });
                            }}
                          />
                        </Flex>
                      </Flex>
                    </Th>
                    <Th
                      textAlign={"center"}
                      bgcolor="#ffb21c"
                      className="thProductB"
                      display={userSelector.role == "ADMIN" ? "none" : "column"}
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
                  {product.map((product, idx) => (
                    <SATableProduct
                      key={product.id}
                      idx={idx}
                      product={product}
                      url={product.photo_product_url}
                      product_name={product.product_name}
                      price={product.price}
                      desc={product.desc}
                      weight={product.weight}
                      category={product.category_id}
                      createdAt={product.createdAt}
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
