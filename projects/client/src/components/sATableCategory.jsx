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
import { AdminSearchBar } from "./adminSearchBar";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { EditCategory } from "./mEditCategory";
import { DeleteCategory, DeleteProduct } from "./mDeleteCategory";

export function SATableCategory({
  category,
  idx,
  fetchData,
  indexOfLastProduct,
  productsPerPage,
}) {
  const modalDelete = useDisclosure();
  const modalEdit = useDisclosure();
  const { photo_category_url, id } = category;
  const [editCategory, setEditCategory] = useState(null);

  return (
    <>
      <Tr id="SACategoryB" key={category.id}>
        <Td textAlign={"center"}>
          {indexOfLastProduct - productsPerPage + idx + 1}
        </Td>
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
