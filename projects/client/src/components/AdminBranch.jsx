import {
  Box,
  Button,
  Center,
  Flex,
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
  useToast,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import AdminNavbar from "./AdminNavbar";
import "../css/indexG.css";
import "../css/indexR.css";
import { api } from "../api/api";
import { useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BsFillPersonPlusFill } from "react-icons/bs";
import AddAdminBranch from "./AdminBranchAddModal";
import EditAdminBranch from "./AdminBranchEditModal";
import ModalKonfirmasiDeletAdmin from "./modal-konfirmasi-deleteAdminBranch";
import Pagination from "./pagination";

export default function AdminBranch() {
  const searchRef = useRef();
  const [getBranch_name, setGetBranch_name] = useState([]);
  const [inpurBranch_name, setInputBranch_name] = useState();
  const [sorted, setSorted] = useState();
  const [ordered, setOrdered] = useState();
  const [ascModeUserName, setAscModeUserName] = useState(true);
  const [ascModeBranchName, setAscModeBranchName] = useState(true);
  const [search, setSearch] = useState();
  const [jumlahBranch, setJumlahBranch] = useState();
  const [pages, setPages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [shown, setShown] = useState({ page: 1 });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDel,
    onOpen: onOpenDel,
    onClose: onCloseDel,
  } = useDisclosure();
  const [dtBranch, setDtBranch] = useState([]);

  // ambil data
  const fetchAll = async () => {
    const sendData = {
      branch_id: inpurBranch_name || "",
      search: search || "",
      sort: sorted || "user_name",
      ordering: ordered || "ASC",
      page: shown.page - 1 || 0,
    };
    try {
      const branch = await api()
        .post("/branch/all-branch-filter", sendData)
        .then((res) => {
          setDtBranch(res.data.Data);
          setTotalPages(res.data.total);
          setJumlahBranch(res.data.jumlahBranch);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const itemPerPage = 3;
  const pageHandler = () => {
    const output = [];
    for (let i = 1; i <= totalPages; i++) {
      output.push(i);
    }
    setPages(output);
  };
  useEffect(() => {
    pageHandler();
  }, [dtBranch, totalPages, shown.page]);
  useEffect(() => {
    if (shown.page > 0 && shown.page <= totalPages) {
      setPages(shown.page);
    }
  }, [shown]);
  const inputHandlerBranch_name = (e) => {
    setInputBranch_name(e.target.value);
  };
  const fetchDtBranch = async () => {
    try {
      await api()
        .get("/sales-report/dt-branch")
        .then((res) => {
          setGetBranch_name(res.data.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAll();
    fetchDtBranch();
  }, []);

  useEffect(() => {
    fetchAll();
  }, [inpurBranch_name, search, shown]);

  const [number, setNumber] = useState(0);

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
        bg={"#FFF7E7"}
      >
        <Flex fontSize={"26px"} fontWeight={"700"} justifyContent={"center"}>
          Pengaturan Admin Cabang
        </Flex>

        <Flex
          gap={"10px"}
          flexDir={{ base: "column", sm: "row", lg: "row", xl: "row" }}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Flex className="menuTotalG">
            <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#fdefce"}>
              <Icon as={FaPeopleGroup} fontSize={"30px"} color={"#ffb21c"} />
            </Center>
            <Flex flexDir={"column"}>
              <Flex fontSize={"24px"} fontWeight={"extrabold"}>
                {jumlahBranch}
              </Flex>
              <Flex color={"grey"} fontWeight={"semibold"}>
                Total Karyawan
              </Flex>
            </Flex>
          </Flex>

          <Flex className="menuTotalG">
            <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#cbe4fb"}>
              <Icon as={FaStore} fontSize={"30px"} color={"#007bfe"} />
            </Center>
            <Flex flexDir={"column"}>
              <Flex fontSize={"24px"} fontWeight={"extrabold"}>
                {jumlahBranch}
              </Flex>
              <Flex color={"grey"} fontWeight={"semibold"}>
                Total Cabang
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex flexDir={"column"} rowGap={"10px"}>
          <Flex
            fontSize={"24px"}
            fontWeight={"700"}
            paddingBottom={"20px"}
            justifyContent={"space-between"}
          >
            <Flex w={"100%"} gap={"10px"}>
              <Flex flexDir={"column"} gap={"5%"} fontSize={"15px"}>
                <Button
                  bgColor={"#9d9c45"}
                  gap={"10px"}
                  cursor={"pointer"}
                  onClick={() => {
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
              >
                {getBranch_name.map((val, index) => (
                  <option key={index} value={val.id}>
                    {val.branch_name}
                  </option>
                ))}
              </Select>
              <InputGroup>
                <Input
                  placeholder="search"
                  ref={searchRef}
                  bg={"white"}
                ></Input>
                <InputRightElement
                  as={BiSearch}
                  w={"30px"}
                  h={"30px"}
                  cursor={"pointer"}
                  padding={"10px 10px 0px 0px"}
                  onClick={() => {
                    setSearch(searchRef.current.value);
                  }}
                />
              </InputGroup>
            </Flex>
          </Flex>

          <Flex w={"100%"} overflowX={"auto"} flexDir={"column"}>
            <Table
              size="sm"
              w={"100%"}
              variant="simple"
              className="custom-table"
              maxW={"850px"}
            >
              <Thead w={"100%"} bg={"#ffb21c"} fontSize={"12px"}>
                <Tr>
                  <Th>No</Th>
                  {/* <Th>Nama</Th> */}
                  <Th
                    cursor={"pointer"}
                    onClick={() => {
                      setSorted("user_name");
                      setOrdered(ascModeUserName ? "ASC" : "DESC");
                      setAscModeUserName(!ascModeUserName);
                    }}
                  >
                    <Flex w={"100%"} gap={"10%"} alignItems={"center"}>
                      Nama
                      {ascModeUserName ? (
                        <MdArrowBackIosNew size={"8%"} id="descendingB" />
                      ) : (
                        <MdArrowBackIosNew id="ascendingB" size={"8%"} />
                      )}
                    </Flex>
                  </Th>
                  <Th>Email </Th>
                  <Th>Nomor HP</Th>
                  {/* <Th>Nama Branch</Th> */}
                  <Th
                    cursor={"pointer"}
                    onClick={() => {
                      setSorted("branch_name");
                      setOrdered(ascModeBranchName ? "ASC" : "DESC");
                      setAscModeBranchName(!ascModeBranchName);
                    }}
                  >
                    <Flex w={"100%"} gap={"10%"} alignItems={"center"}>
                      Nama Cabang
                      {ascModeBranchName ? (
                        <MdArrowBackIosNew size={"8%"} id="descendingB" />
                      ) : (
                        <MdArrowBackIosNew id="ascendingB" size={"8%"} />
                      )}
                    </Flex>
                  </Th>
                  <Th>Alamat Cabang</Th>
                  <Th>Kota - Provinsi</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>

              <Tbody fontSize={"10px"}>
                {dtBranch?.map((val, index) => (
                  <Tr key={val?.id} className="table-row">
                    <Td>{(shown.page - 1) * itemPerPage + (index + 1)}</Td>
                    <Td>{val?.user_name}</Td>
                    <Td>{val?.email}</Td>
                    <Td>{val?.phone_number}</Td>
                    <Td>{val?.Branch?.branch_name}</Td>
                    <Td>{val?.Branch?.branch_address}</Td>
                    <Td>
                      {val?.Branch?.City?.city_name} - {val?.Branch?.province}
                    </Td>
                    <Td alignItems={"center"} position={"center"}>
                      <Flex flexDir={"row"} w={"100%"} h={"100%"} gap={"15px"}>
                        <Button
                          bgColor={"#9d9c45"}
                          w={"100%"}
                          cursor={"pointer"}
                          onClick={() => {
                            onOpenEdit();
                            setNumber(index);
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
                            setNumber(index);
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
        </Flex>
        {/* Pagination */}
        <Flex justifyContent={"end"}>
          <Pagination
            shown={shown}
            setShown={setShown}
            totalPages={totalPages}
            pages={pages}
          />
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW={"700px"} w={"100%"} borderRadius={"20px"}>
          <AddAdminBranch
            isOpen={isOpen}
            onClose={onClose}
            fetchAll={fetchAll}
          />
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenEdit} onClose={onCloseEdit} isCentered>
        <ModalOverlay />
        <ModalContent maxW={"700px"} w={"100%"} borderRadius={"20px"}>
          <EditAdminBranch
            isOpen={isOpenEdit}
            onClose={onCloseEdit}
            fetchAll={fetchAll}
            dtBranch={dtBranch}
            number={number}
          />
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenDel} onClose={onCloseDel} isCentered>
        <ModalOverlay />
        <ModalContent maxW={"700px"} w={"100%"} borderRadius={"20px"}>
          <ModalKonfirmasiDeletAdmin
            isOpen={isOpenDel}
            onClose={onCloseDel}
            fetchAll={fetchAll}
            dtBranch={dtBranch}
            number={number}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
