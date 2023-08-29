import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import "../css/adminBranchR.css";
import "../css/discount-voucher.css";
import { api } from "../api/api";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { FaRupiahSign } from "react-icons/fa6";
import { useSelector } from "react-redux";
import moment from "moment";

export default function VoucherAddUpdateModal(props) {
  const userSelector = useSelector((state) => state.auth);
  const toast = useToast();
  const { dtVocer, fetchAll, numberIdx, isEdit } = props;
  const {
    title,
    valid_start,
    valid_to,
    nominal,
    id,
    voucher_code,
    minimal_order,
    limit,
    desc,
    branch_id
  } = dtVocer[numberIdx];
  const valid_startConvert = moment(valid_start).format("YYYY-MM-DD");
  const valid_toConvert = moment(valid_to).format("YYYY-MM-DD");
  YupPassword(Yup);
  const formik = useFormik({
    initialValues: {
      title: props.isEdit == true ? title : "",
      voucher_code: props.isEdit == true ? voucher_code : "",
      valid_start: props.isEdit == true ? valid_startConvert : "",
      valid_to: props.isEdit == true ? valid_toConvert : "",
      nominal: props.isEdit == true ? nominal : "",
      minimal_order: props.isEdit == true ? minimal_order : "",
      limit: props.isEdit == true ? limit : "",
      desc: props.isEdit == true ? desc : "",
      branch_id : props.branch_id
    },

    validationSchema: Yup.object().shape({
      title: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ),
      voucher_code: Yup.string(),
      valid_start: Yup.string(),
      valid_to: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ),
      nominal: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ).matches(/^[1-9][0-9]*$/, "Tidak Boleh angka negative"),
      minimal_order: Yup.string().matches(/^[1-9][0-9]*$/, "Tidak Boleh angka negative"),
      limit: Yup.string().required(
        "Gagal disimpan.. kolom ini tidak boleh kosong"
      ).matches(/^[1-9][0-9]*$/, "Tidak Boleh angka negative"),
      desc: Yup.string(),
    }),

    onSubmit: async () => {
      if (isEdit == true) {
        try {
          const {
            id,
            title,
            voucher_code,
            valid_start,
            valid_to,
            nominal,
            minimal_order,
            limit,
            desc,
          } = formik.values;
          const dataEditVoucher = {
            id: dtVocer[numberIdx].id,
            title,
            voucher_code,
            valid_start,
            valid_to,
            nominal,
            minimal_order,
            limit,
            desc,
            branch_id : userSelector.branch_id
          };
          await api()
            .patch("/voucher", dataEditVoucher)
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
            voucher_code,
            valid_start,
            valid_to,
            nominal,
            minimal_order,
            limit,
            desc,
          } = formik.values;
          const dataInputVoucher = {
            title,
            voucher_code,
            valid_start,
            valid_to,
            nominal,
            minimal_order,
            limit,
            desc,
            branch_id : userSelector.branch_id
          };
          await api()
            .post("/voucher", dataInputVoucher)
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

  // function inputHandler(event) {
  //   const { value, id } = event.target;
  //   formik.setFieldValue(id, value);
  //   console.log(formik.values);
  // }

  function inputHandler(event) {
    const { value, id } = event.target;
    if (id === "nominal" || id === "minimal_order" || id === "limit" ) {
      const numericValue = parseFloat(value);

      if (!isNaN(numericValue) && numericValue >= 0) {
        formik.setFieldValue(id, numericValue);
      }
    } else if (id === "voucher_code"){
        formik.setFieldValue(id, value.toUpperCase())
    }else {
        formik.setFieldValue(id, value);
    }
    console.log(formik.values);
  }

  return (
    <>
      <Flex>
        <Flex className="flex2R-addbranch">
          <Flex className="flex3R-addbranch">
            <Flex className="flex3R-input_user-disvoc">
              <Box className="flex3R-input-box-addbranch">
                {isEdit == true ? "Edit Voucher" : "Tambah Voucher"}
              </Box>
              <FormControl>
                <Flex className="flex-input1-disvoc">
                  <Flex className="flex-input2-disvoc">
                    <Flex className="flex-input3-disvoc">
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
                    </Flex>

                    <Flex className="flex-input3-disvoc">
                      <FormLabel>Kode Voucher</FormLabel>
                      <Input
                        defaultValue={isEdit ? voucher_code : ""}
                        disabled={isEdit ? true : false}
                        onChange={inputHandler}
                        id="voucher_code"
                        type="text"
                        style={{textTransform: 'uppercase'}}
                        transition={"1s"}
                        _hover={{
                          borderColor: "#9d9c45",
                          boxShadow: "dark-lg",
                        }}
                      ></Input>
                    </Flex>
                  </Flex>
                  <Flex
                    display={formik.errors.title ? "flex" : "none"}
                    color={"red"}
                    fontSize={"10px"}
                  >
                    {formik.errors.title}
                  </Flex>
                </Flex>
              </FormControl>

              <FormControl>
                <Flex className="flex-input1-disvoc">
                  <Flex className="flex-input2-disvoc">
                    <Flex className="flex-input3-disvoc">
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
                    <Flex className="flex-input3-disvoc">
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
                <Flex className="flex-input1-disvoc">
                  <Flex className="flex-input2-disvoc">
                    <Flex className="flex-input3-disvoc">
                      <FormLabel>Nominal</FormLabel>
                      <InputGroup>
                        <Input
                          defaultValue={isEdit ? nominal : ""}
                          onChange={inputHandler}
                          id="nominal"
                          type="number"
                          min={0}
                          transition={"1s"}
                          _hover={{
                            borderColor: "#9d9c45",
                            boxShadow: "dark-lg",
                          }}
                        ></Input>
                        <InputLeftElement
                          bgColor={"#9d9c45"}
                          borderLeftRadius={"10px"}
                        >
                          <FaRupiahSign />
                        </InputLeftElement>
                      </InputGroup>
                    </Flex>

                    <Flex className="flex-input3-disvoc">
                      <FormLabel>Minimal Order</FormLabel>
                      <InputGroup>
                        <Input
                          defaultValue={isEdit ? minimal_order : ""}
                          onChange={inputHandler}
                          id="minimal_order"
                          type="number"
                          transition={"1s"}
                          _hover={{
                            borderColor: "#9d9c45",
                            boxShadow: "dark-lg",
                          }}
                        ></Input>
                        <InputLeftElement
                          bgColor={"#9d9c45"}
                          borderLeftRadius={"10px"}
                        >
                          <FaRupiahSign />
                        </InputLeftElement>
                      </InputGroup>
                    </Flex>
                  </Flex>
                  <Flex
                    display={formik.errors.nominal ? "flex" : "none"}
                    color={"red"}
                    fontSize={"10px"}
                  >
                    {formik.errors.nominal}
                  </Flex>
                </Flex>
              </FormControl>

              <FormControl>
                <Flex className="flex-input1-disvoc">
                  <Flex className="flex-input2-disvoc">
                    <Flex className="flex-input3-disvoc">
                      <FormLabel>Limit</FormLabel>
                      <Input
                        defaultValue={isEdit ? limit : ""}
                        onChange={inputHandler}
                        id="limit"
                        type="number"
                        transition={"1s"}
                        _hover={{
                          borderColor: "#9d9c45",
                          boxShadow: "dark-lg",
                        }}
                      ></Input>
                    </Flex>

                    <Flex className="flex-input3-disvoc">
                      <FormLabel>Keterangan</FormLabel>
                      <Input
                        defaultValue={isEdit ? desc : ""}
                        onChange={inputHandler}
                        id="desc"
                        type="text"
                        transition={"1s"}
                        _hover={{
                          borderColor: "#9d9c45",
                          boxShadow: "dark-lg",
                        }}
                      ></Input>
                    </Flex>
                  </Flex>
                  <Flex
                    display={formik.errors.limit ? "flex" : "none"}
                    color={"red"}
                    fontSize={"10px"}
                  >
                    {formik.errors.limit}
                  </Flex>
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
    </>
  );
}
