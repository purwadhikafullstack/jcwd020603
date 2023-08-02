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
import { SATableProduct } from "./sATableProduct";
import { AddProduct } from "./mAddProduct";

export default function SuperAdminProductList() {
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

  const [addProduct, setAddProduct] = useState(null);
  const [product, setProduct] = useState([]);
  console.log(product);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth"));
    api
      .get("/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/product");
      setProduct(response.data);
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
            <Flex width={"350px"}>Daftar Produk</Flex>
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
              <Button onClick={onOpen} colorScheme={"yellow"}>
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
                    <Th className="thProductB">
                      <Flex alignItems="center" id="tableNameB">
                        Price{" "}
                        <Flex flexDirection="column">
                          <Icon id="ascendingB" as={MdArrowBackIosNew} />
                          <Icon id="descendingB" as={MdArrowBackIosNew} />
                        </Flex>
                      </Flex>
                    </Th>
                    <Th className="thProductB">Desc </Th>
                    <Th className="thProductB">Weight </Th>
                    <Th textAlign={"center"}>Action</Th>
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
