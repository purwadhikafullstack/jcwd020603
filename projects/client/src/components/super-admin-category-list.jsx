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
import { SATableCategory } from "./sATableCategory";
import { AddCategory } from "./mAddCategory";

export default function SuperAdminCategoryList() {
  const windowWidth = window.innerWidth;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addCategory, setAddCategory] = useState(null);
  const tableHeadRef = useRef(null);
  const tableRowRef = useRef(null);
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
      const response = await api().get("/category");
      setAddCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [categories, setCategories] = useState([]);
  console.log(categories);
  useEffect(() => {
    api
      .get("/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fetchData = async () => {
    try {
      const response = await api().get("/category");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
                <Input placeholder="search" bg={"white"}></Input>
                <InputRightElement
                  as={BiSearch}
                  w={"30px"}
                  h={"30px"}
                  padding={"10px 10px 0px 0px"}
                />
              </InputGroup>
              <Button
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
                        <Flex flexDirection="column">
                          <Icon id="ascendingB" as={MdArrowBackIosNew} />
                          <Icon id="descendingB" as={MdArrowBackIosNew} />
                        </Flex>
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
                      fetchData={fetchData}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
