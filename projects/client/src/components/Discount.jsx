import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { BsFillBoxSeamFill, BsFillBagCheckFill } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { BiSearch, BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import "../css/indexG.css";
import "../css/indexR.css";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { BiDotsHorizontal, BiEdit } from "react-icons/bi";
import { FaStore } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { TbShoppingCartDiscount } from "react-icons/tb";
import AddAdminBranch from "./AdminBranchAddModal";
import EditAdminBranch from "./AdminBranchEditModal";
import ModalKonfirmasiDeletAdmin from "./modal-konfirmasi-deleteAdminBranch";
import { useSelector } from "react-redux";
import moment from "moment";
import DiscountAddModal from "./DiscountAddModal";
import ModalKonfirmasiDeletDiscount from "./modal-konfirmasi-deleteDiscount";

export default function Discount() {
  const userSelector = useSelector((state) => state.auth);
  const roleOfUSer = userSelector.role;
  const [activeDis, setActiveDis] = ([])
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure(); //state untuk pengaturan modal add
  const {
    isOpen: isOpenDel,
    onOpen: onOpenDel,
    onClose: onCloseDel,
  } = useDisclosure();
  const [dtDis, setDtDis] = useState([]);// state untuk menyimpan data discount
  const [isEdit, setIsEdit] = useState(false); //state untuk menentukan modal tambah atau edit

  // ambil data discount
  const fetchAll = async () => {
    try {
      const discount = await api.get("/discount/all").then((res) => {
        setDtDis(res.data.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const activeCheck = (valid_start, valid_to) => {
    const today = moment();
    const startDay = moment(valid_start);
    const lastDay = moment(valid_to);
    return today.isSameOrAfter(startDay) && today.isSameOrBefore(lastDay);
  };

  console.log(dtDis);
  useEffect(() => {
    fetchAll();
  }, []);

  const [numberIdx, setNumberIdx] = useState(0);

  return (
    <>
      <Box>
        <AdminNavbar onOpen={onOpen} />
      </Box>
      <Flex
        maxW={"910px"}
        w={"100%"}
        h={"100vh"}
        padding={"30px"}
        flexDir={"column"}
        rowGap={"20px"}
        marginTop={"60px"}
        borderTopLeftRadius={"20px"}
        bg={"#FFF7E7"}>
        <Flex
          fontSize={"26px"}
          fontWeight={"700"}>
          Pengaturan Diskon
        </Flex>

        <Grid
          className="gridMenuG"
          flexDir={"row"}>
          <Flex className="menuTotalG">
            <Center
              w={"60px"}
              h={"60px"}
              borderRadius={"50%"}
              bg={"#fdefce"}>
              <Icon
                as={TbShoppingCartDiscount}
                fontSize={"30px"}
                color={"#ffb21c"}
              />
            </Center>
            <Flex flexDir={"column"}>
              <Flex
                fontSize={"24px"}
                fontWeight={"extrabold"}>
                {dtDis.length}
              </Flex>
              <Flex
                color={"grey"}
                fontWeight={"semibold"}>
                Total Diskon
              </Flex>
            </Flex>
          </Flex>

          <Flex className="menuTotalG">
            <Center
              w={"60px"}
              h={"60px"}
              borderRadius={"50%"}
              bg={"#cbe4fb"}>
              <Icon
                as={FaStore}
                fontSize={"30px"}
                color={"#007bfe"}
              />
            </Center>
            <Flex flexDir={"column"}>
              <Flex
                fontSize={"24px"}
                fontWeight={"extrabold"}>
                {userSelector.branch_id}
              </Flex>
              <Flex
                color={"grey"}
                fontWeight={"semibold"}>
                Cabang ID
              </Flex>
            </Flex>
          </Flex>
        </Grid>
        <Flex
          flexDir={"column"}
          rowGap={"10px"}>
          <Flex
            fontSize={"24px"}
            fontWeight={"700"}
            paddingBottom={"20px"}
            justifyContent={"space-between"}>
            <Flex
              flexDir={"column"}
              gap={"5%"}
              fontSize={15}>
              Data Diskon
              <Button
                h={"30px"}
                bgColor={"#9d9c45"}
                gap={"10px"}
                cursor={"pointer"}
                onClick={() => {
                  setIsEdit(false)
                  onOpen();
                  
                }}>
                <BsFillPersonPlusFill />
                Tambah
              </Button>
            </Flex>
            <Flex
              maxW={"400px"}
              w={"100%"}
              gap={"10px"}>
              <Select
                placeholder="Pilih Lokasi Cabang"
                bg={"white"}
                display={() => (roleOfUSer == "SUPER ADMIN" ? "flex" : "none")}>
              </Select>
              <InputGroup>
                <Input
                  placeholder="search"
                  bg={"white"}></Input>
                <InputRightElement
                  as={BiSearch}
                  w={"30px"}
                  h={"30px"}
                  padding={"10px 10px 0px 0px"}
                />
              </InputGroup>
            </Flex>
          </Flex>
          {/* tampilan data discount */}
          <Table
            size="sm"
            w={"100%"}
            variant="simple"
            className="custom-table"
            maxW={"850px"}>
            <Thead
              w={"100%"}
              bg={"#ffb21c"}
              fontSize={"12px"}>
              <Tr>
                <Th>No</Th>
                <Th>Status</Th>
                <Th>Judul</Th>
                <Th>Tangggal Mulai</Th>
                <Th>Tanggal Akhir</Th>
                <Th>Nominal (%)</Th>
                <Th>Detail</Th>
              </Tr>
            </Thead>

            <Tbody fontSize={"10px"}>
              {dtDis.map((val, index) => (
                <Tr
                  key={val.id}
                  className="table-row">
                  <Td>{index + 1}</Td>
                  <Td>
                    {activeCheck(val.valid_start, val.valid_to)
                      ? "Aktif" 
                      : "OFF"}
                  </Td>
                  <Td>{val.title}</Td>
                  <Td>{val.valid_start.split("T")[0]}</Td>
                  <Td>{val.valid_to.split("T")[0]}</Td>
                  <Td>{val.nominal}</Td>
                  <Td
                    alignItems={"center"}
                    position={"center"}>
                    <Flex
                      flexDir={"row"}
                      w={"100%"}
                      h={"100%"}
                      gap={"15px"}>
                      <Button
                        bgColor={"#9d9c45"}
                        w={"100%"}
                        cursor={"pointer"}
                        onClick={() => {
                          setNumberIdx(index);
                          setIsEdit(true);
                          onOpen();
                        }}>
                        <BiEdit />
                      </Button>
                      <Button
                        bgColor={"red.500"}
                        w={"100%"}
                        cursor={"pointer"}
                        onClick={() => {
                          onOpenDel();
                          setNumberIdx(index);
                        }}>
                        <RiDeleteBin6Fill width={"100%"} />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
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
          <DiscountAddModal
            isOpen={isOpen}
            onClose={onClose}
            fetchAll={fetchAll}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            dtDis={dtDis}
            numberIdx={numberIdx}
          />
        </ModalContent>
      </Modal>

      {/* <Modal isOpen={isOpenEdit} onClose={onCloseEdit} isCentered>
        <ModalOverlay/>
        <ModalContent maxW={"500px"} w={"100%"} borderRadius={"20px"} >
          <EditAdminBranch isOpen={isOpenEdit} onClose={onCloseEdit} fetchAll = {fetchAll} dtDis ={dtDis} number={number} />
        </ModalContent>
      </Modal> */}

      <Modal isOpen={isOpenDel} onClose={onCloseDel} isCentered>
        <ModalOverlay/>
        <ModalContent maxW={"500px"} w={"100%"} borderRadius={"20px"} >
          <ModalKonfirmasiDeletDiscount isOpen={isOpenDel} onClose={onCloseDel} fetchAll = {fetchAll} dtDis ={dtDis}  numberIdx={numberIdx} />
        </ModalContent>
      </Modal>
    </>
  );
}
