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

export default function DiscountAddModal(props) {
  const userSelector = useSelector((state) => state.auth)
  const branch_id = useSelector.branch_id
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dtStock, setDtStock] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  YupPassword(Yup);
  const formik = useFormik({
    initialValues: {
      title: "",
      valid_start: "",
      valid_to: "",
      nominal: "",
      branch_id: userSelector.branch_id,
      product_id : ""
    },

    validationSchema: Yup.object().shape({
      title: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ),
      valid_start: Yup.string(),
      valid_to: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ),
      nominal: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ),
    }),

    onSubmit: async () => {

      try {
      const {title, valid_start, valid_to, nominal, branch_id, product_id} = formik.values
      const dataDiscount = {title, valid_start, valid_to, nominal, branch_id, product_id : [...selectedId]}
      await api.post("/discount", dataDiscount).then((result) => {
        console.log(result.data);
      })
      toast({
        title: "Data diskon berhasil ditambahkan",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      props.fetchAll()
      props.onClose()
      
      } catch (err) {
        console.log(err);
      }
    },
  });

  function inputHandler(event) {
    const { value, id } = event.target;
    formik.setFieldValue(id, value);
    console.log(formik.values);
  }

  const getStock = async () => {
    const getData = await api.get("/stock/", {params : {branch_id : userSelector.branch_id}}).then((res) => {
      console.log(res.data);
      setDtStock(res.data);
    });
  };

  console.log(userSelector);
  console.log(branch_id);
  console.log(selectedProducts);
  console.log(selectedId);

  useEffect(() => {
    getStock()
  }, [])

  return (
    <>
      <Flex>
        <Flex className="flex2R-addbranch">
          <Flex className="flex3R-addbranch">
            <Flex
              className="flex3R-input_user-addbranch"
              gap={"20px"}>
              <Box className="flex3R-input-box-addbranch">Tambah Discount</Box>
              <FormControl>
                <FormLabel>Judul</FormLabel>
                <Input
                  onChange={inputHandler}
                  id="title"
                  type="text"
                  transition={"1s"}
                  _hover={{
                    borderColor: "#9d9c45",
                    boxShadow: "dark-lg",
                  }}></Input>
                <Flex
                  display={formik.errors.title ? "flex" : "none"}
                  color={"red"}
                  fontSize={"10px"}>
                  {formik.errors.title}
                </Flex>
              </FormControl>
              <FormControl
                display={"flex"}
                flexDir={"row"}
                justifyContent={"space-between"}>
                <Flex
                  flexDir={"column"}
                  w={"45%"}>
                  <FormLabel>Tanggal Mulai</FormLabel>
                  <Input
                    onChange={inputHandler}
                    id="valid_start"
                    type="date"
                    transition={"1s"}
                    _hover={{
                      borderColor: "#9d9c45",
                      boxShadow: "dark-lg",
                    }}></Input>
                </Flex>
                <Flex
                  flexDir={"column"}
                  w={"45%"}>
                  <FormLabel>Tanggal Akhir</FormLabel>
                  <Input
                    onChange={inputHandler}
                    id="valid_to"
                    type="date"
                    transition={"1s"}
                    _hover={{
                      borderColor: "#9d9c45",
                      boxShadow: "dark-lg",
                    }}></Input>
                </Flex>
                <Flex
                  display={formik.errors.valid_start && formik.errors.valid_to ? "flex" : "none"}
                  color={"red"}
                  fontSize={"10px"}>
                  {formik.errors.valid_to }
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Nominal</FormLabel>
                <InputGroup>
                  <Input
                    onChange={inputHandler}
                    id="nominal"
                    type="text"
                    transition={"1s"}
                    _hover={{
                      borderColor: "#9d9c45",
                      boxShadow: "dark-lg",
                    }}></Input>
                  <InputRightElement
                    bgColor={"#9d9c45"}
                    borderRightRadius={"10px"}>
                    <FaPercentage />
                  </InputRightElement>
                </InputGroup>
                <Flex
                  display={formik.errors.nominal ? "flex" : "none"}
                  color={"red"}
                  fontSize={"10px"}>
                  {formik.errors.nominal}
                </Flex>
              </FormControl>

              <FormControl>
                <FormLabel
                  display={"flex"}
                  flexDir={"row"}
                  gap={"20px"}
                  alignItems={"center"}>
                  Pilih Produk
                  <Button
                    bgColor={"#9d9c45"}
                    size={"sm"}
                    onClick={() => {
                      getStock()
                      onOpen();
                    }}>
                    <AiOutlineAppstoreAdd />
                  </Button>
                </FormLabel>
                <Flex
                  w={"100%"}
                  gap={"10px"}
                  flexWrap={"wrap"}
                  border={"1px solid #e2e8f0"}
                  borderRadius={"10px"}
                  p={4}
                  transition={"1s"}
                  _hover={{
                    borderColor: "#9d9c45",
                    boxShadow: "dark-lg",
                  }}>
                    {selectedProducts.map((val) => (
                      <Flex
                      // key={val.id}
                      w={"45%"}
                      h={"10%"}
                      alignItems={"center"}
                      gap={"20px"}
                      border={"1px solid #9d9c45"}
                      borderRadius={"20px"}
                      transition={"1s"}
                      _hover={{
                        borderColor: "#9d9c45",
                        boxShadow: "dark-lg",
                      }}>
                      <Icon
                        as={AiOutlineCloseCircle}
                        cursor={"pointer"} ml={"10px"}></Icon>
                      <Image
                        src={val.Product.photo_product_url}
                        w={"20%"}
                        h={"100%"}
                        p={1}></Image>
                      {val.Product.product_name}
                    </Flex>

                    ))}
                </Flex>
                <Flex
                  display={formik.errors.phone_number ? "flex" : "none"}
                  color={"red"}
                  fontSize={"10px"}>
                  {formik.errors.phone_number}
                </Flex>
              </FormControl>
            </Flex>
          </Flex>

          <Flex
            justifyContent={"center"}
            mt={"50px"}>
            <Button
              onClick={formik.handleSubmit}
              m={"20px"}
              w={"40%"}
              cursor={"pointer"}
              bgGradient="linear(to-r, #9d9c45, #f0ee93 )"
              transition={"1"}
              fontWeight={"bolder"}
              _hover={{
                bgGradient: "linear(to-l, #9d9c45, #f0ee93 )",
              }}>
              Simpan
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered>
        <ModalOverlay />
        <ModalContent
          maxW={"500px"}
          w={"100%"}
          borderRadius={"20px"}>
          <DiscountAddProductModal
            isOpen={isOpen}
            onClose={onClose}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            dtStock = {dtStock}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
