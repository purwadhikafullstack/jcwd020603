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

export default function DiscountAddModal(props) {
  const userSelector = useSelector((state) => state.auth);
  const branch_id = useSelector.branch_id;
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dtStock, setDtStock] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const { dtDis, fetchAll, numberIdx, isEdit } = props;
  const { title, valid_start, valid_to, nominal, id, discount_id } =
    dtDis[numberIdx];
  const valid_startConvert = moment(valid_start).format("YYYY-MM-DD");
  const valid_toConvert = moment(valid_to).format("YYYY-MM-DD");
  YupPassword(Yup);
  console.log(props.isEdit);
  console.log(title);
  console.log(dtDis);
  console.log(id);
  console.log(discount_id);

  const formik = useFormik({
    initialValues: {
      title: props.isEdit == true ? title : "",
      valid_start: props.isEdit == true ? valid_startConvert : "",
      valid_to: props.isEdit == true ? valid_toConvert : "",
      nominal: props.isEdit == true ? nominal : "",
      branch_id: userSelector.branch_id,
      product_id: "",
      discount_id: "",
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
      if (isEdit == true) {
        try {
          const {
            title,
            valid_start,
            valid_to,
            nominal,
            branch_id,
            product_id,
            discount_id,
          } = formik.values;
          const dataDiscountEdit = {
            title,
            valid_start,
            valid_to,
            nominal,
            branch_id,
            product_id: [...selectedId],
            discount_id: id,
          };
          await api()
            .patch("/discount", dataDiscountEdit)
            .then((result) => {
              console.log(result.data);
            });
          toast({
            title: "Data diskon berhasil diubah",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          props.setIsEdit(false);
          props.fetchAll();
          props.onClose();
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const {
            title,
            valid_start,
            valid_to,
            nominal,
            branch_id,
            product_id,
            discount_id,
          } = formik.values;
          const dataDiscountTambah = {
            title,
            valid_start,
            valid_to,
            nominal,
            branch_id,
            product_id: [...selectedId],
          };
          await api()
            .post("/discount", dataDiscountTambah)
            .then((result) => {
              console.log(result.data);
            });
          toast({
            title: "Data diskon berhasil ditambahkan",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          props.setIsEdit(false);
          props.fetchAll();
          props.onClose();
        } catch (err) {
          console.log(err);
        }
      }
    },
  });

  function inputHandler(event) {
    const { value, id } = event.target;
    formik.setFieldValue(id, value);
    console.log(formik.values);
  }

  // console.log(userSelector.id);
  const getStock = async () => {
    const getData = await api()
      .get("/stock/", { params: { branDis: userSelector.branch_id } })
      .then((res) => {
        console.log(res.data);
        setDtStock(res.data);
      });
  };

  const getStockByDiscount = async () => {
    const stockByDiscount = await api()
      .get("/stock/", { params: { branDis: id } })
      .then((result) => {
        console.log(result.data);
        if (isEdit == true) {
          setSelectedProducts(result.data);
        }
      });
  };

  console.log(userSelector);
  console.log(userSelector.branch_id);
  console.log(selectedProducts);
  console.log(dtStock);
  console.log(selectedId);

  useEffect(() => {
    getStock();
    getStockByDiscount();
  }, []);

  return (
    <>
      <Flex>
        <Flex className="flex2R-addbranch">
          <Flex className="flex3R-addbranch">
            <Flex className="flex3R-input_user-addbranch" gap={"20px"}>
              <Box className="flex3R-input-box-addbranch">Tambah Discount</Box>
              <FormControl>
                <FormLabel>Judul</FormLabel>
                <Input
                  defaultValue={isEdit ? title : ""}
                  disabled={isEdit ? true : false}
                  onChange={inputHandler}
                  id="title"
                  type="text"
                  transition={"1s"}
                  _hover={{
                    borderColor: "#9d9c45",
                    boxShadow: "dark-lg",
                  }}
                ></Input>
                <Flex
                  display={formik.errors.title ? "flex" : "none"}
                  color={"red"}
                  fontSize={"10px"}
                >
                  {formik.errors.title}
                </Flex>
              </FormControl>
              <FormControl
                display={"flex"}
                flexDir={"row"}
                justifyContent={"space-between"}
              >
                <Flex w={"100%"} flexDir={"column"}>
                  <Flex w={"100%"} justifyContent={"space-between"}>
                    <Flex flexDir={"column"} w={"45%"}>
                      <FormLabel>Tanggal Mulai</FormLabel>
                      <Input
                        defaultValue={isEdit ? valid_startConvert : ""}
                        disabled={isEdit ? true : false}
                        onChange={inputHandler}
                        id="valid_start"
                        type="date"
                        transition={"1s"}
                        _hover={{
                          borderColor: "#9d9c45",
                          boxShadow: "dark-lg",
                        }}
                      ></Input>
                    </Flex>
                    <Flex flexDir={"column"} w={"45%"}>
                      <FormLabel>Tanggal Akhir</FormLabel>
                      <Input
                        defaultValue={isEdit ? valid_toConvert : ""}
                        disabled={isEdit ? true : false}
                        onChange={inputHandler}
                        id="valid_to"
                        type="date"
                        transition={"1s"}
                        _hover={{
                          borderColor: "#9d9c45",
                          boxShadow: "dark-lg",
                        }}
                      ></Input>
                    </Flex>
                  </Flex>
                  <Flex
                    display={formik.errors.valid_to ? "flex" : "none"}
                    color={"red"}
                    fontSize={"10px"}
                    h={"10%"}
                  >
                    {formik.errors.valid_to}
                  </Flex>
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Nominal</FormLabel>
                <InputGroup>
                  <Input
                    defaultValue={isEdit ? nominal : ""}
                    onChange={inputHandler}
                    id="nominal"
                    type="text"
                    transition={"1s"}
                    _hover={{
                      borderColor: "#9d9c45",
                      boxShadow: "dark-lg",
                    }}
                  ></Input>
                  <InputRightElement
                    bgColor={"#9d9c45"}
                    borderRightRadius={"10px"}
                  >
                    <FaPercentage />
                  </InputRightElement>
                </InputGroup>
                <Flex
                  display={formik.errors.nominal ? "flex" : "none"}
                  color={"red"}
                  fontSize={"10px"}
                >
                  {formik.errors.nominal}
                </Flex>
              </FormControl>

              <FormControl>
                <FormLabel
                  display={"flex"}
                  flexDir={"row"}
                  gap={"20px"}
                  alignItems={"center"}
                >
                  Pilih Produk
                  <Button
                    bgColor={"#9d9c45"}
                    size={"sm"}
                    onClick={() => {
                      getStock();
                      onOpen();
                    }}
                  >
                    <AiOutlineAppstoreAdd />
                  </Button>
                </FormLabel>
                <Flex
                  w={"100%"}
                  gap={"10px"}
                  flexWrap={"wrap"}
                  border={"1px solid #e2e8f0"}
                  borderRadius={"10px"}
                  p={2}
                  transition={"1s"}
                  _hover={{
                    borderColor: "#9d9c45",
                    boxShadow: "dark-lg",
                  }}
                >
                  {selectedProducts.map((val) => (
                    <Flex
                      key={val?.id}
                      w={"45%"}
                      h={"10%"}
                      alignItems={"center"}
                      gap={"10px"}
                      p={2}
                      border={"1px solid #9d9c45"}
                      borderRadius={"20px"}
                      transition={"1s"}
                      _hover={{
                        borderColor: "#9d9c45",
                        boxShadow: "dark-lg",
                      }}
                    >
                      <Image
                        src={val?.Product?.photo_product_url}
                        w={"20%"}
                        h={"100%"}
                        p={1}
                      ></Image>
                      {val?.Product?.product_name}
                    </Flex>
                  ))}
                </Flex>
              </FormControl>
            </Flex>
          </Flex>

          <Flex justifyContent={"center"} mt={"50px"}>
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
              }}
            >
              Simpan
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW={"500px"} w={"100%"} borderRadius={"20px"}>
          <DiscountAddProductModal
            isOpen={isOpen}
            onClose={onClose}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            dtStock={dtStock}
            isEdit={props.isEdit}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
