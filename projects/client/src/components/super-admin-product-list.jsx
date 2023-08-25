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
  const [filtering, setFiltering] = useState({
    page: shown.page,
    search: "",
    category_id: "",
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

  const productsPerPage = 8;
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
                <AddProduct id={addProduct} isOpen={isOpen} onClose={onClose} />
              </Button>
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
                    <Th textAlign={"center"}>Gambar</Th>
                    <Th>
                      <Flex alignItems="center" id="tableNameB">
                        Nama Produk{" "}
                      </Flex>
                    </Th>
                    <Th className="thProductB">
                      <Flex alignItems="center" id="tableNameB">
                        <Flex>Kategori</Flex>
                      </Flex>
                    </Th>
                    <Th className="thProductB">
                      <Flex alignItems="center" id="tableNameB">
                        Harga{" "}
                      </Flex>
                    </Th>
                    <Th className="thProductB">Desc </Th>
                    <Th className="thProductB">Berat </Th>
                    <Th
                      textAlign={"center"}
                      display={userSelector.role == "ADMIN" ? "none" : "flex"}
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
