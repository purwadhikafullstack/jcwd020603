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
import "../css/discount-voucher.css";
import { api } from "../api/api";
import { useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaStore } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdArrowBackIosNew } from "react-icons/md";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { useSelector } from "react-redux";
import moment from "moment";
import VoucherAddUpdateModal from "./VoucherAddUpdateModal";
import ModalKonfirmasiDeleteVoucher from "./modal-konfirmasi-deleteVoucher";
import Pagination from "./pagination";

export default function Voucher() {
  const userSelector = useSelector((state) => state.auth);
  const roleOfUSer = userSelector.role;
  const searchRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure(); //state untuk pengaturan modal add
  const {
    isOpen: isOpenDel,
    onOpen: onOpenDel,
    onClose: onCloseDel,
  } = useDisclosure();
  const [dtVocer, setDtVocer] = useState([]); // state untuk menyimpan data
  const [isEdit, setIsEdit] = useState(false); //state untuk menentukan modal tambah atau edit
  const [getBranch_name, setGetBranch_name] = useState([])
  const [inputBranch_name,setInputBranch_name] = useState()
  const [search,setSearch] = useState()
  const [sorted,setSorted] = useState()
  const [ordered,setOrdered] = useState()
  const [totalData,setTotalData] = useState([])
  const [pages, setPages] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [shown, setShown] = useState({page : 1})
  const [ascMOdeStart,setAscModeStart] = useState(true)
  const [ascMOdeTo,setAscModeTo] = useState(true)
  const [ascMOdeNominal,setAscModeNominal] = useState(true)

  const fetchDtBranch = async() => {
    try {
      await api().get("/sales-report/dt-branch").then((res) => {
        setGetBranch_name(res.data.data)
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const inputHandlerBranch_name = (e) => {
    setInputBranch_name(e.target.value)
  }


  let ini_namanya = null
  const branch_namenya = () => {
    if(roleOfUSer == "SUPER ADMIN"){
      if(inputBranch_name){
        for (const obj of getBranch_name) {
          if (obj.id == inputBranch_name) {
             ini_namanya = obj.branch_name;
            break; 
          }
        }
        return ini_namanya
      } else {
        return "Semua Cabang"
      }
    } else {
      for (const obj of getBranch_name) {
        if (obj.id == userSelector.branch_id) {
          ini_namanya = obj.branch_name;
          break;
        }
      }
      return ini_namanya
    }
  }

  const branch_id = userSelector.role == "ADMIN" ? userSelector.branch_id : inputBranch_name
  // ambil data
  const fetchAll = async () => {
    const sendBody = {
      branch_id : branch_id || "", 
      search : search || "", 
      ordering : ordered || "valid_start", 
      sort : sorted || "ASC", 
      page : shown.page -1 || "0"}
    try {
      const voucher = await api()
        .post("/voucher/all-filter", sendBody)
        .then((res) => {
          setDtVocer(res.data.Data);
          setTotalPages(res.data.total)
          setTotalData(res.data.jumlah_data)
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const itemPerPage = 3
  const pageHandler = () => {
    const output = []
    for (let i = 1; i <= totalPages; i++) {
      output.push(i)
    }
    setPages(output)
  }
  useEffect(() => {
    pageHandler()
  }, [dtVocer, totalPages, shown.page])
  useEffect(() => {
    if(shown.page > 0 && shown.page <= totalPages){
      setPages(shown.page)
    }
  }, [shown])

  const activeCheck = (valid_start, valid_to) => {
    const today = moment();
    const startDay = moment(valid_start);
    const lastDay = moment(valid_to);
    return today.isSameOrAfter(startDay) && today.isSameOrBefore(lastDay);
  };

  useEffect(() => {
    fetchAll();
    fetchDtBranch()
  }, []);

  useEffect(() => {
    fetchAll();
  }, [inputBranch_name, search, shown , sorted, ordered]);

  const [numberIdx, setNumberIdx] = useState(0);

  return (
    <>
      <Box>
        <AdminNavbar onOpen={onOpen} />
      </Box>
      <Flex className="flex1R-disvoc">
      <Flex fontSize={"26px"} fontWeight={"700"} justifyContent={"center"}>
          Pengaturan Voucher
        </Flex>

        <Flex gap={"10px"} flexDir={{base : "column", sm: "row", lg: "row", xl : "row"}} alignItems={"center"}
        justifyContent={"space-evenly"} 
        >
          <Flex className="menuTotalG">
            <Center className="center1R-disvoc">
              <Icon
                as={TbShoppingCartDiscount}
                fontSize={"30px"}
                color={"#ffb21c"}
              />
            </Center>
            <Flex flexDir={"column"}>
              <Flex className="flex3R-disvoc">{totalData}</Flex>
              <Flex color={"grey"} fontWeight={"semibold"}>
                Total Voucher
              </Flex>
            </Flex>
          </Flex>

          <Flex className="menuTotalG">
            <Center className="center2R-disvoc">
              <Icon as={FaStore} fontSize={"30px"} color={"#007bfe"} />
            </Center>
            <Flex flexDir={"column"}>
              <Flex className="flex3R-disvoc" textAlign={"center"}>{branch_namenya()}</Flex>
              <Flex color={"grey"} fontWeight={"semibold"}>
               Nama Cabang
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex flexDir={"column"} rowGap={"10px"}>
          <Flex className="flex4R-disvoc" w={"100%"} justifyContent={{base : "space-evenly", sm : "space-evenly", md: "space-between", lg: "space-between"}}>
               <Flex  w={"100%"} gap={"10px"}>
            <Flex flexDir={"column"} gap={"5%"} fontSize={15}>
              <Button
                display={userSelector.role == "ADMIN" ? "flex" : "none"}
                className="button1-disvoc"
                bgColor={"#9d9c45"}
                onClick={() => {
                  setIsEdit(false);
                  onOpen();
                }}
              >
                <BsFillPersonPlusFill />
                Tambah
              </Button>
            </Flex>
            
            <Select
                onChange={inputHandlerBranch_name}
                id="branch_name"
                w={"100%"}
                placeholder="Pilih Lokasi Cabang"
                bg={"white"}
                display={() => (userSelector.role == "SUPER ADMIN" ? "flex" : "none")}
              >
                {getBranch_name.map((val, index) => (
                  <option key={index} value={val.id}>{val.branch_name}</option>
                ))}
              </Select>
              <InputGroup >
                <Input placeholder="search" bg={"white"} ref={searchRef}></Input>
                <InputRightElement
                  as={BiSearch}
                  w={"30px"}
                  h={"30px"}
                  padding={"10px 10px 0px 0px"}
                  onClick={()=> {setSearch(searchRef.current.value)}}
                />
              </InputGroup>
            </Flex>
          </Flex>
          {/* tampilan data discount */}
          <Flex w={"100%"} overflowX={"auto"}>
            <Table className="custom-table" size="sm" variant="simple">
              <Thead w={"100%"} bg={"#ffb21c"} fontSize={"12px"}>
                <Tr>
                  <Th>No</Th>
                  <Th>Status</Th>
                  <Th>Judul</Th>
                  <Th>kode voucher</Th>
                  {/* <Th>Tangggal Mulai</Th> */}
                  <Th cursor={"pointer"} onClick={()=> {
                  setSorted("valid_start")
                  setOrdered(ascMOdeStart ? "ASC" : "DESC")
                  setAscModeStart(!ascMOdeStart)
                   }}><Flex w={"100px"}><Flex w={"70%"}>Tanggal Mulai</Flex>
                  {ascMOdeStart ? <MdArrowBackIosNew size={"15px"} id="descendingB"/> : 
                  <MdArrowBackIosNew id="ascendingB" size={"15px"}/>}</Flex></Th>

                  <Th cursor={"pointer"} onClick={()=> {
                  setSorted("valid_to")
                  setOrdered(ascMOdeTo ? "ASC" : "DESC")
                  setAscModeTo(!ascMOdeTo)
                }}><Flex w={"100px"}><Flex w={"70%"}>Tanggal Akhir</Flex>
                {ascMOdeTo ? <MdArrowBackIosNew size={"15px"} id="descendingB"/> : 
                <MdArrowBackIosNew id="ascendingB" size={"15px"}/>}</Flex></Th>

                  <Th cursor={"pointer"} onClick={()=> {
                  setSorted("nominal")
                  setOrdered(ascMOdeNominal ? "ASC" : "DESC")
                  setAscModeNominal(!ascMOdeNominal)
                }}><Flex w={"100px"}><Flex w={"70%"}>Nominal </Flex>
                {ascMOdeNominal ? <MdArrowBackIosNew size={"15"} id="descendingB"/> : 
                <MdArrowBackIosNew id="ascendingB" size={"15"}/>}</Flex></Th>
                  <Th>Limit</Th>
                  <Th>Minimal Order</Th>
                  <Th>Keterangan</Th>
                  <Th display={roleOfUSer == "ADMIN" ? "" : "none"}  >Aksi</Th>
                </Tr>
              </Thead>

              <Tbody fontSize={"10px"}>
                {dtVocer?.map((val, index) => (
                  <Tr key={val?.id} className="table-row">
                    <Td>{((shown.page -1)*itemPerPage) + (index + 1)}</Td>
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
                    <Td>{val?.limit}</Td>
                    <Td>{val?.minimal_order}</Td>
                    <Td>{val?.desc}</Td>
                    <Td display={userSelector.role == "ADMIN" ? "flex" : "none"} alignItems={"center"} position={"center"}>
                      <Flex flexDir={"row"} w={"100%"} h={"100%"} gap={"15px"}>
                        <Button
                          bgColor={"#9d9c45"}
                          w={"100%"}
                          cursor={"pointer"}
                          onClick={() => {
                            setNumberIdx(index);
                            setIsEdit(true);
                            onOpen();
                          }}
                        >
                          <BiEdit />
                        </Button>
                        <Button
                          bgColor={"red.500"}
                          w={"100%"}
                          cursor={"pointer"}
                          onClick={() => {
                            onOpenDel();
                            setNumberIdx(index);
                          }}
                        >
                          <RiDeleteBin6Fill width={"100%"} />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
          <Flex justifyContent={"end"}>
          <Pagination
            shown={shown}
            setShown={setShown}
            totalPages={totalPages}
            pages={pages}/>
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW={"600px"} w={"100%"} borderRadius={"20px"}>
          <VoucherAddUpdateModal
            isOpen={isOpen}
            onClose={onClose}
            fetchAll={fetchAll}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            dtVocer={dtVocer}
            numberIdx={numberIdx}
          />
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenDel} onClose={onCloseDel} isCentered>
        <ModalOverlay />
        <ModalContent maxW={"500px"} w={"100%"} borderRadius={"20px"}>
          <ModalKonfirmasiDeleteVoucher
            isOpen={isOpenDel}
            onClose={onCloseDel}
            fetchAll={fetchAll}
            dtVocer={dtVocer}
            numberIdx={numberIdx}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
