import {
  Stack,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableContainer,
  Flex,
  Icon,
} from "@chakra-ui/react";
import "../css/indexB.css";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { SATableProduct } from "../components/sATableProduct";

export function SACardProduct(props) {
  //   const navigate = useNavigate();
  //     const handleClick = () => {
  //       navigate("/product", { state: { categoryName: props.categoryName } });
  //     };

  const [product, setProduct] = useState([]);
  console.log(product);
  useEffect(() => {
    api
      .get("/product")
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
      <Stack>
        <TableContainer id="containerTableB" justifyContent={"space-between"}>
          <Table variant="simple">
            <Thead className="tHeadB">
              <Tr id="tRowB">
                <Th>No</Th>
                <Th className="thProductB">Pic</Th>
                <Th className="thProductB">
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
                <Th className="thProductB" isNumeric>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {" "}
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
            <Tfoot>
              <Tr></Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}
