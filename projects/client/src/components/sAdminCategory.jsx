import {
  Flex,
  Center,
  Grid,
  Image,
  Button,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import "../css/indexB.css";
import { useLocation } from "react-router-dom";
import { AdminSearchBar } from "./adminSearchBar";
import { SACardCategory } from "./sACardCategory";
import { AiOutlinePlus } from "react-icons/ai";
import { AddCategory } from "./mAddCategory";
import { useState } from "react";
import { api } from "../api/api";

export default function SAdminCategory() {
  const location = useLocation();
  const categoryName = location.state?.categoryName;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addCategory, setAddCategory] = useState(null);

  const fetchDataCategory = async () => {
    try {
      const response = await api.get("/category");
      setAddCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Flex id="baseContainerB">
        <AdminSearchBar />
        <Flex id="headB" justifyContent={"space-between"} paddingTop={"20px"}>
          <Flex>KETEGORI</Flex>
          <Button
            onClick={() => {
              onOpen();
              setAddCategory();
              fetchDataCategory();
            }}
            h={"26px"}
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
        <SACardCategory />
      </Flex>
    </>
  );
}
