import {
  Flex,
  Center,
  Icon,
  Image,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import "../css/indexB.css";
import { useLocation } from "react-router-dom";
import { SACardProduct } from "./sACardProduct";
import { AdminSearchBar } from "./adminSearchBar";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { AddProduct } from "./mAddProduct";

export default function SAdminProduct() {
  const location = useLocation();
  const categoryName = location.state?.categoryName;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addProduct, setAddProduct] = useState(null);
  return (
    <>
      <Flex id="baseContainerB">
        <AdminSearchBar />
        <Flex id="headB" justifyContent={"space-between"} paddingTop={"20px"}>
          <Flex>PRODUK</Flex>
          <Button onClick={onOpen} h={"26px"} colorScheme={"yellow"}>
            {<Icon as={AiOutlinePlus} fontSize={"28px"} />}
            <AddProduct id={addProduct} isOpen={isOpen} onClose={onClose} />
          </Button>
        </Flex>
        <SACardProduct />
      </Flex>
    </>
  );
}
