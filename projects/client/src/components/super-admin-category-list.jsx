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
import { SATableCategory } from "./sATableCategory";
import { AddCategory } from "./mAddCategory";
import Pagination from "./pagination";
import { useSelector } from "react-redux";

export default function SuperAdminCategoryList() {
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

  const fetchDataCategory = async () => {
    try {
      const response = await api().get("/category/admin");
      setAddCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //get all category
  const [shown, setShown] = useState({ page: 1 });
  const [filtering, setFiltering] = useState({
    page: shown.page,
    search: "",
  });
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    const params = { ...filtering };
    try {
      const response = await api().get("/category/admin", {
        params: { ...params },
      });
      setCategories(response.data.result);
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
  }, [categories]);

  useEffect(() => {
    if (shown.page > 0 && shown.page <= totalPages) {
      setFiltering({ ...filtering, page: shown.page });
    }
  }, [shown]);

  const productsPerPage = 6;
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
            <Flex width={"350px"}>Daftar Kategori</Flex>
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
              <Button
                display={userSelector.role == "ADMIN" ? "none" : "flex"}
                onClick={() => {
                  onOpen();
                  setAddCategory();
                  fetchDataCategory();
                }}
                colorScheme={"yellow"}
              >
                {<Icon as={AiOutlinePlus} fontSize={"28px"} />}
                <AddCategory
                  id={addCategory}
                  isOpen={isOpen}
                  onClose={() => {
                    onClose();
                    fetchDataCategory();
                  }}
                />
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
                    <Th textAlign={"center"}>Pic</Th>
                    <Th>
                      <Flex alignItems="center" id="tableNameB">
                        Category Name{" "}
                      </Flex>
                    </Th>
                    <Th textAlign={"center"}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody
                  className="tableRowG"
                  ref={tableRowRef}
                  onScroll={handleTableRowScroll}
                >
                  {categories.map((category, idx) => (
                    <SATableCategory
                      key={category.id}
                      idx={idx}
                      category={category}
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
