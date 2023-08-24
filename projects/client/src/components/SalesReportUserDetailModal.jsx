import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import "../css/adminBranchR.css";
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
import { AiOutlineCloseCircle, AiOutlineAppstoreAdd } from "react-icons/ai";
import tes from "../assets/ayam segar.jpg";
import DiscountAddProductModal from "./DiscountAddProductModal";
import { useSelector } from "react-redux";
import moment from "moment";

export default function SalesReportUserDetailModal(props) {
  const userSelector = useSelector((state) => state.auth);
  const branch_id = useSelector.branch_id;
  const toast = useToast();
  const [dtStock, setDtStock] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const { isOpen, onClose, dtSumQtyUser, dtSumQtyUserAll, indexnya } = props;

  console.log(indexnya);
 console.log(dtSumQtyUser[indexnya].dataUser);
 console.log(dtSumQtyUser);
 console.log(dtSumQtyUserAll);

  return (
    <>
      <Flex>
        <Flex className="flex2R-addbranch">
          <Flex className="flex3R-addbranch">
            <Flex className="flex3R-input_user-disvoc" gap={"20px"} px={5} py={5}>
              <Flex alignItems={"center"} justifyContent={"center"} fontWeight={"extrabold"} fontSize={"30px"}>Detail</Flex>
              <Flex borderBottom={"3px double #9d9c45"} pb={"3%"} fontWeight={"bolder"} justifyContent={"space-evenly"}>
              <Flex> Tanggal   : {dtSumQtyUser[indexnya].date}</Flex>
              <Flex> Jumlah Pembeli : {dtSumQtyUser[indexnya].dataUser.length}</Flex>
              </Flex>
              {/* <Flex fontWeight={"extrabold"}> Data Pembeli :</Flex> */}
                {dtSumQtyUser[indexnya].dataUser.map((val,index) => (
              <Flex pb={"5%"} justifyContent={"center"} alignItems={"center"} flexDir={"column"} border={"1 px solid green"}>
              <Flex >Nama : {val.user_name}</Flex>
              <Flex >Jumlah transaksi : {val.jumlah_transaksi}</Flex>
              </Flex>
                ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
