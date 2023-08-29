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
import { useSelector } from "react-redux";
import moment from "moment";

export function SATableProduct({
  product,
  idx,
  url,
  product_name,
  price,
  desc,
  weight,
  category,
  indexOfLastProduct,
  productsPerPage,
  fetchData,
  createdAt,
}) {
  const navigate = useNavigate();
  const modalDelete = useDisclosure();
  const modalEdit = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  const [editProduct, setEditProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    }).format(amount);
  };

  return (
    <>
      <Tr id="SACategoryB">
        <Td> {indexOfLastProduct - productsPerPage + idx + 1}</Td>
        <Td className="SAImgCategoryB">
          <Image maxH={"43px"} minH={"43px"} src={url} />
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
            {formatCurrency(price)}
          </Flex>
        </Td>
        <Td className="SACategoryNameB">
          <Flex alignItems="center" id="tableNameB">
            {desc}
          </Flex>
        </Td>
        <Td className="SACategoryNameB">
          <Flex alignItems="center" id="tableNameB">
            {weight}
          </Flex>
        </Td>
        <Td className="SACategoryNameB">
          <Flex alignItems="center" id="tableNameB">
            {moment(createdAt).format("LLL")}
          </Flex>
        </Td>
        <Td
          className="SACategoryNameB"
          isNumeric
          display={userSelector.role == "ADMIN" ? "none" : "column"}
        >
          <Flex alignItems="center" id="tableNameB">
            <Button
              id="buttonAction"
              colorScheme={"yellow"}
              w={"50%"}
              onClick={() => {
                modalEdit.onOpen();
                setEditProduct(product.id);
                fetchData();
              }}
            >
              {<FiEdit cursor={"pointer"} />}
              <EditProduct
                id={editProduct}
                product={product}
                isOpen={modalEdit.isOpen}
                onClose={() => {
                  modalEdit.onClose();
                  fetchData();
                }}
              />
            </Button>
            <Button
              id="buttonAction"
              colorScheme="red"
              w={"50%"}
              onClick={() => {
                modalDelete.onOpen();
                setEditProduct(product.id);
                fetchData();
              }}
            >
              {<RiDeleteBin6Line cursor={"pointer"} />}

              <DeleteProduct
                id={editProduct}
                product={product}
                isOpen={modalDelete.isOpen}
                onClose={() => {
                  modalDelete.onClose();
                  fetchData();
                }}
              />
            </Button>
          </Flex>
        </Td>
      </Tr>
    </>
  );
}
