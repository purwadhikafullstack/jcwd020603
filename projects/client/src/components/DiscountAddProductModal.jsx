import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Table,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import "../css/adminBranchR.css";
import "../css/discount-voucher.css";
import logo from "../assets/SVG/4.svg";
import AddUser from "./AdminBranchAddModal-user";
import AddBranch from "./AdminBranchAddModal-branch";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { FaPercentage } from "react-icons/fa";
import { FaRupiahSign } from "react-icons/fa6";
import { TbNumbers } from "react-icons/tb";
import {
  AiOutlineCloseCircle,
  AiOutlineAppstoreAdd,
  AiFillCheckCircle,
} from "react-icons/ai";
import tes from "../assets/ayam segar.jpg";
import { useSelector } from "react-redux";

export default function DiscountAddProductModal(props) {
  const userSelector = useSelector((state) => state.auth);
  const branch_id = userSelector.branch_id;
  const {selectedProducts, setSelectedProducts, dtStock, selectedId, setSelectedId, isEdit, dtDisSelected} = props

  console.log(dtStock); 
  console.log(dtDisSelected);
  console.log(selectedProducts);
  console.log(selectedId);

  const  checkboxHandler = (index) => {
    const selectedProduct = dtStock[index];
  
    if (selectedProducts.some((item) => item.id === selectedProduct.id)) {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((item) => item.id !== selectedProduct.id)
      );
    } else {
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        selectedProduct,
      ]);
    }
  }
  
  const checkedHandler = (product_id) => {
      if(selectedId.includes(product_id) ){
        setSelectedId((selectedId) => selectedId.filter((item) => item !== product_id))
      } else {
        setSelectedId(selectedId => [...selectedId, product_id])
      }
  }
  const centang = (product_id, index) => {
      if(selectedId.includes(product_id)){
        return "checked"
      } else {
        return ""
      }
  }


  useEffect (() => {
    const dtProduct_id = selectedProducts.map((val) => val.product_id)
    if (isEdit == true){
      setSelectedId(dtProduct_id)
    }
    
  }, [])
  return (
    <>
      <Flex>
        <Flex className="flex2R-addbranch">
          <Flex className="flex3R-addbranch">
            <Flex className="flex3R-input_user-disvoc">
              <Box className="flex3R-input-box-addbranch">
                Daftar Produk Branch : {branch_id}
              </Box>
              
              <Flex gap={"10px"} w={"100%"}>
          <Table size="sm" w={"100%"} variant="simple" className="custom-table" maxW={"850px"}>
            <Thead w={"100%"} bg={"#ffb21c"} fontSize={"12px"}>
              <Tr>
                <Th>Check</Th>
                <Th>Picture</Th>
                <Th>Product Name</Th>
              </Tr>
            </Thead>

            <Tbody fontSize={"10px"}>
              {dtStock?.map((val, index) => (
                <Tr key={val?.id} className="table-row">
                  <Td><Checkbox
                  colorScheme="green"
                  onChange={() => {
                    checkboxHandler(index)
                    checkedHandler(val?.product_id)
                  }}
                  isChecked={centang(val?.product_id, index)} 
                  ></Checkbox></Td>
                  <Td><Image src={val?.Product?.photo_product_url} boxSize={"10"}></Image></Td>
                  <Td>{val?.Product?.product_name}</Td>
                </Tr>
             ))} 
            </Tbody>
          </Table>
              </Flex>

              
            </Flex>
          </Flex>

          <Flex
            justifyContent={"center"}
            mt={"50px"}>
            <Button
              onClick={() => {
                props.onClose()
              }}
              m={"20px"}
              w={"40%"}
              cursor={"pointer"}
              bgGradient="linear(to-r, #9d9c45, #f0ee93 )"
              transition={"1"}
              fontWeight={"bolder"}
              _hover={{
                bgGradient: "linear(to-l, #9d9c45, #f0ee93 )",
              }}>
              Tambahkan
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
