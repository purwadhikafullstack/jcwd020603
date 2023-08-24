import {
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableContainer,
  Flex,
  Icon,
  Image,
  Td,
  HStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import "../css/indexB.css";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import moment from "moment";

export function SATableStockHistory({
  idx,
  stockHistory,
  url,
  product_name,
  category,
  status,
  status_quantity,
  feature,
  stock,
  before,
  after,
  fetchData,
  indexOfLastProduct,
  productsPerPage,
  createdAt,
}) {
  const navigate = useNavigate();
  //   const modalDelete = useDisclosure();
  //   const modalEdit = useDisclosure();

  //   const [editProduct, setEditProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api()
      .get("/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    api()
      .get("/category/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getCategoryName = (x) => {
    const category = categories.find((y) => y.id === x);
    return category ? category.category_name : "";
  };
  const getProductName = (x) => {
    const product = products.find((y) => y.id === x);
    return product ? product.category_name : "";
  };
  const getProductUrl = (x) => {
    const url = products.find((y) => y.id === x);
    return url ? url.photo_product_url : "";
  };

  return (
    <>
      <Tr id="SACategoryB">
        <Td>{indexOfLastProduct - productsPerPage + idx + 1}</Td>
        <Td className="SACategoryNameB">
          <Flex alignItems="center" id="tableNameB">
            {feature}
          </Flex>
        </Td>
        <Td className="SACategoryNameB">
          <Flex alignItems="center" id="tableNameB">
            {product_name}
          </Flex>
        </Td>
        <Td className="SACategoryNameB">
          <Flex alignItems="center" id="tableNameB">
            {getCategoryName(category)}
          </Flex>
        </Td>
        <Td className="SACategoryNameB">
          <Flex alignItems="center" id="tableNameB">
            {before}
          </Flex>
        </Td>
        <Td className="SACategoryNameB">
          <Flex alignItems="center" id="tableNameB">
            {status}
          </Flex>
        </Td>
        <Td className="SACategoryNameB">
          <Flex alignItems="center" id="tableNameB">
            {status_quantity}
          </Flex>
        </Td>
        <Td className="SACategoryNameB">
          <Flex alignItems="center" id="tableNameB">
            {after}
          </Flex>
        </Td>
        <Td className="SACategoryNameB">
          <Flex alignItems="center" id="tableNameB">
            {moment(createdAt).format("LLL")}
          </Flex>
        </Td>
      </Tr>
    </>
  );
}
