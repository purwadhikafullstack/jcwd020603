import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import AdminNavbar from "./AdminNavbar";
import "../css/indexG.css";
import "../css/indexR.css";
import "../css/discount-voucher.css"
import { api } from "../api/api";
import { useEffect, useState } from "react";
import {BiEdit } from "react-icons/bi";
import { FaStore } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { useSelector } from "react-redux";
import moment from "moment";
import VoucherAddUpdateModal from "./VoucherAddUpdateModal";
import ModalKonfirmasiDeleteVoucher from "./modal-konfirmasi-deleteVoucher";

export default function Voucher() {
  const userSelector = useSelector((state) => state.auth);
  const roleOfUSer = userSelector.role;
  const { isOpen, onOpen, onClose } = useDisclosure(); //state untuk pengaturan modal add
  const {
    isOpen: isOpenDel,
    onOpen: onOpenDel,
    onClose: onCloseDel,
  } = useDisclosure();
  const [dtVocer, setDtVocer] = useState([]);// state untuk menyimpan data
  const [isEdit, setIsEdit] = useState(false); //state untuk menentukan modal tambah atau edit

  // ambil data
  const fetchAll = async () => {
    try {
      const voucher = await api.get("/voucher/").then((res) => {
        console.log(res.data.data);
        setDtVocer(res.data.data);
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
      className="flex1R-disvoc">
        <Flex
          className="flex2R-disvoc">
          Pengaturan Voucher
        </Flex>

        <Grid
          className="gridMenuG"
          flexDir={"row"}>
          <Flex className="menuTotalG">
            <Center
             className="center1R-disvoc">
              <Icon
                as={TbShoppingCartDiscount}
                fontSize={"30px"}
                color={"#ffb21c"}
              />
            </Center>
            <Flex flexDir={"column"}>
              <Flex
                className="flex3R-disvoc">
                {dtVocer?.length}
              </Flex>
              <Flex
                color={"grey"}
                fontWeight={"semibold"}>
                Total Voucher
              </Flex>
            </Flex>
          </Flex>

          <Flex className="menuTotalG">
            <Center
              className="center2R-disvoc" >
              <Icon
                as={FaStore}
                fontSize={"30px"}
                color={"#007bfe"}
              />
            </Center>
            <Flex flexDir={"column"}>
              <Flex
                className="flex3R-disvoc">
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
            className="flex4R-disvoc">
            <Flex
              flexDir={"column"}
              gap={"5%"}
              fontSize={15}>
              Data Voucher
              <Button
                className="button1-disvoc"
                bgColor={'#9d9c45'}
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
          <Flex w={"100%"} overflowX={"auto"}>
          <Table
            className="custom-table"
            size="sm"
            variant="simple">
            <Thead
              w={"100%"}
              bg={"#ffb21c"}
              fontSize={"12px"}>
              <Tr>
                <Th>No</Th>
                <Th>Status</Th>
                <Th>Judul</Th>
                <Th>kode voucher</Th>
                <Th>Tangggal Mulai</Th>
                <Th>Tanggal Akhir</Th>
                <Th>Nominal</Th>
                <Th>Minimal order</Th>
                <Th>Keterangan</Th>
                <Th>Aksi</Th>
              </Tr>
            </Thead>

            <Tbody fontSize={"10px"}>
              {dtVocer?.map((val, index) => (
                <Tr
                  key={val?.id}
                  className="table-row">
                  <Td>{index + 1}</Td>
                  <Td>
                    {activeCheck(val?.valid_start, val?.valid_to)
                      ? "Aktif" 
                      : "OFF"}
                  </Td>
                  <Td>{val?.title}</Td>
                  <Td>{val?.voucher_code}</Td>
                  <Td>{val?.valid_start.split("T")[0]}</Td>
                  <Td>{val?.valid_to.split("T")[0]}</Td>
                  <Td>{val?.nominal}</Td>
                  <Td>{val?.minimal_order}</Td>
                  <Td>{val?.desc}</Td>
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
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent  maxW={"600px"} w={"100%"} borderRadius={"20px"}>
          <VoucherAddUpdateModal
            isOpen={isOpen} onClose={onClose} fetchAll={fetchAll}
            isEdit={isEdit} setIsEdit={setIsEdit} dtVocer={dtVocer} numberIdx={numberIdx}/>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenDel} onClose={onCloseDel} isCentered>
        <ModalOverlay/>
        <ModalContent maxW={"500px"} w={"100%"} borderRadius={"20px"} >
          <ModalKonfirmasiDeleteVoucher  isOpen={isOpenDel} onClose={onCloseDel} fetchAll = {fetchAll} dtVocer ={dtVocer}  numberIdx={numberIdx} />
        </ModalContent>
      </Modal>
    </>
  );
}
