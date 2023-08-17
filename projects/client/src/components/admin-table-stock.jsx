import {
  Stack,
  Tr,
  Flex,
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
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { EditStock } from "./mEditStock";
import { DeleteStock } from "./mDeleteStock";

export function AdminTableStock({
  key,
  idx,
  stock,
  qty,
  discount,
  url,
  product_name,
  price,
  desc,
  weight,
  category,
  indexOfLastProduct,
  productsPerPage,
  fetchData,
}) {
  console.log(stock);
  const navigate = useNavigate();
  const modalDelete = useDisclosure();
  const modalEdit = useDisclosure();

  const [editStock, setEditStock] = useState(null);

  useEffect(() => {
    console.log(url);
  }, []);

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

  return (
    <>
      <Tr id="SACategoryB">
        <Td> {indexOfLastProduct - productsPerPage + idx + 1}</Td>
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
            {price}
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
            {qty}
          </Flex>
        </Td>
        <Td className="SACategoryNameB">
          <Flex alignItems="center" id="tableNameB">
            {discount}
          </Flex>
        </Td>
        <Td className="SACategoryActionB" isNumeric>
          <Stack>
            <HStack display={"flex"} align={"center"} justifyContent={"center"}>
              <Button
                id="buttonAction"
                colorScheme={"yellow"}
                w={"50%"}
                onClick={() => {
                  modalEdit.onOpen();
                  setEditStock(stock.id);
                  fetchData();
                }}
              >
                {<FiEdit cursor={"pointer"} />}
                <EditStock
                  id={editStock}
                  stock={stock}
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
                  setEditStock(stock.id);
                  fetchData();
                }}
              >
                {<RiDeleteBin6Line cursor={"pointer"} />}
                <DeleteStock
                  id={editStock}
                  stock={stock}
                  isOpen={modalDelete.isOpen}
                  onClose={() => {
                    modalDelete.onClose();
                    fetchData();
                  }}
                />
              </Button>
            </HStack>
          </Stack>
        </Td>
      </Tr>
    </>
  );
}
