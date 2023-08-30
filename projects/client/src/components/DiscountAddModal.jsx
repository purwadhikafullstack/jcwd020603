import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import "../css/adminBranchR.css";
import { api } from "../api/api";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { FaPercentage } from "react-icons/fa";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import DiscountAddProductModal from "./DiscountAddProductModal";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

export default function DiscountAddModal(props) {
  const userSelector = useSelector((state) => state.auth);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dtStock, setDtStock] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [getDiscountId, setGetDiscountId] = useState([]);
  const { dtDis, fetchAll, numberIdx, isEdit, dtDisSelected } = props;
  const { title, valid_start, valid_to, nominal, id, discount_id, photo_discount_url  } = dtDis[numberIdx];
  const valid_startConvert = moment(valid_start).format("YYYY-MM-DD");
  const valid_toConvert = moment(valid_to).format("YYYY-MM-DD");
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [sendDiscount_id, setSendDiscount_id] = useState()
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();
  YupPassword(Yup);
  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

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
            branch_id : userSelector.branch_id,
            product_id: [...selectedId],
            discount_id: id,
          };
         const editDiskon =  await api()
            .patch("/discount", dataDiscountEdit)
            if(editDiskon && selectedFile){
              const formData = new FormData();
              formData.append("PhotoDiscount", selectedFile);
              await api()
                .patch(`/discount/photo-discount/${dataDiscountEdit.discount_id}`, formData)
            }
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
            branch_id : userSelector.branch_id,
            product_id: [...selectedId],
            discount_id
          };
        const tambahDiskon =  await api()
            .post("/discount", dataDiscountTambah)
              setGetDiscountId(tambahDiskon.data.data)
            if( tambahDiskon.data.data.id && selectedFile){
              const formData = new FormData();
              formData.append("PhotoDiscount", selectedFile);
              await api()
                .patch(`/discount/photo-discount/${tambahDiskon.data.data.id}`, formData)
            }
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
    if (id === "nominal") {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue) && numericValue >= 0) {
        formik.setFieldValue(id, numericValue);
      }
    } else {
      formik.setFieldValue(id, value);
    }
  }

  
  const getStock = async () => {
    const getData = await api()
      .get("/stock/byBranch", { params: { branch_id: userSelector.branch_id } })
      .then((res) => {
        setDtStock(res.data.data);
      });
  };
  const getStockByDiscount = async () => {
    const stockByDiscount = await api()
      .get("/stock/byDiscount", { params: { discount_id: id, branch_id: userSelector.branch_id } })
      .then((result) => {
        if (isEdit == true) {
          setSelectedProducts(result.data.data);
        }
       
      });
  };
  useEffect(() => {
    getStock();
    getStockByDiscount()
  }, []);

  return (
    <>
      <Flex>
        <Flex className="flex2R-addbranch">
          <Flex className="flex3R-addbranch">
            <Flex className="flex3R-input_user-disvoc" gap={"20px"}>
              <Box className="flex3R-input-box-addbranch">Tambah Discount</Box>
              {/* <Flex w={"40%"} > */}
               <Center cursor={"pointer"} w={"100%"} mt={"30px"}>
                  <Input
                    accept="image/png , image/jpg, image/gif"
                    onChange={handleFile}
                    ref={inputFileRef}
                    type="file"
                    display={"none"}
                  />
                   <Image
                   rounded={10}
                    h={"20%"}
                    w={"40%"}
                    mt={"30px"}
                    align={"center"}  
                    position={"absolute"}
                    zIndex={4}
                    size={{base : "lg", sm: "xl", md: "xl", lg: "2xl"}}
                    src={isEdit == true ? (selectedFile ? image : photo_discount_url) : image}
                    transition={"1s"}
                    _hover={{
                      borderColor: "#9d9c45",
                      boxShadow: "dark-lg",
                    }}
                    onClick={() => {
                      inputFileRef.current.click();
                    }}
                  />
                 Tambah Foto Diskon
              </Center>
              {/* </Flex> */}
             
              <FormControl mt={"60px"}>
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
                  {selectedProducts?.map((val) => (
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
              onClick={() => { formik.handleSubmit() }}
              m={"20px"}
              isLoading={loading}
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
            dtDisSelected={dtDisSelected}
            isEdit={props.isEdit}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
