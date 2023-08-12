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
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { AdminSearchBar } from "./adminSearchBar";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { EditCategory } from "./mEditCategory";
import { EditProduct } from "./mEditProduct";
import { DeleteProduct } from "./mDeleteProduct";

export function SATableStockHistory({
  key,
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
}) {
  const navigate = useNavigate();
  //   const modalDelete = useDisclosure();
  //   const modalEdit = useDisclosure();

  //   const [editProduct, setEditProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth"));
    api
      .get("/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    api
      .get("/category/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // useEffect(() => {
  //   console.log(url);
  // }, []);

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
        <Td>{idx + 1}</Td>
        <Td className="SAImgCategoryB">
          <Image src={url} />
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
            {feature}
          </Flex>
        </Td>
      </Tr>
    </>
  );
}
