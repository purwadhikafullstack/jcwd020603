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
import { DeleteCategory, DeleteProduct } from "./mDeleteCategory";

export function SACardCategory(props) {
  //   const navigate = useNavigate();
  //     const handleClick = () => {
  //       navigate("/product", { state: { categoryName: props.categoryName } });
  //     };

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
      const response = await api.get("/category");
      setCategories(response.data);
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
                    Category Name{" "}
                    <Flex flexDirection="column">
                      <Icon id="ascendingB" as={MdArrowBackIosNew} />
                      <Icon id="descendingB" as={MdArrowBackIosNew} />
                    </Flex>
                  </Flex>
                </Th>
                <Th className="thProductB" isNumeric>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
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
    </>
  );
}

function SATableCategory({ category, idx, fetchData }) {
  const modalDelete = useDisclosure();
  const modalEdit = useDisclosure();

  const { photo_category_url, id } = category;

  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    console.log(photo_category_url);
  }, []);

  return (
    <>
      <Tr id="SACategoryB" key={category.id}>
        <Td>{idx + 1}</Td>
        <Td className="SAImgCategoryB">
          <Image src={photo_category_url} />
        </Td>
        <Td className="SACategoryNameB">
          <Flex alignItems="center" id="tableNameB">
            {category.category_name}
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
                  setEditCategory(category.id);
                  fetchData();
                }}
              >
                {<FiEdit cursor={"pointer"} />}
                <EditCategory
                  id={editCategory}
                  category={category}
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
                  setEditCategory(category.id);
                  fetchData();
                }}
              >
                {<RiDeleteBin6Line cursor={"pointer"} />}
                <DeleteCategory
                  id={editCategory}
                  category={category}
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
