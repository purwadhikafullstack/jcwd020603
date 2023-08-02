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
  useToast
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
import {BiEdit } from "react-icons/bi"
import {FaStore} from "react-icons/fa"
import {FaPeopleGroup} from "react-icons/fa6"
import {RiDeleteBin6Fill} from "react-icons/ri"
import {BsFillPersonPlusFill} from "react-icons/bs"
import AddAdminBranch from "./AdminBranchAddModal";



export default function AdminBranch() {
  const toast = useToast()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [dtBranch, setDtBranch] = useState([]);

  // ambil data
  const fetchAll = async () => {
    try {
      const branch = await api.get("/branch/all-branch").then((res) => {
        console.log(res.data.Data);
        setDtBranch(res.data.Data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  // const mapBranch = dtBranch.Data;
  console.log(dtBranch);

  useEffect(() => {
    fetchAll();
  }, []);


  const hadleDelete = async (branch_id, user_id, user_name, branch_name) => {
    const confirmMessage = `Anda akan menghapus Admin : ${user_name} dan Branch : ${branch_name}`

    if(window.confirm(confirmMessage)){
      await api.delete("/branch/", {data : {branch_id, user_id}})
      .then((res) => {
         toast({
          title: "Admin dan Cabang berhasil hapus",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
       fetchAll()
      })
      .catch ((error) => {
        console.log(error);
      })
    } else {
      console.log("nggak jadi ni yeee");
    }
}

// useEffect (() => {
//   fetchAll()
// }, [hadleDelete()])



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
        <Flex fontSize={"26px"} fontWeight={"700"}>
          Admin Branch Management
        </Flex>

        <Grid className="gridMenuG" flexDir={"row"}>
          <Flex className="menuTotalG">
            <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#fdefce"}>
              <Icon
                as={FaPeopleGroup}
                fontSize={"30px"}
                color={"#ffb21c"}
              />
            </Center>
            <Flex flexDir={"column"}>
              <Flex fontSize={"24px"} fontWeight={"extrabold"}>
                {dtBranch.length}
              </Flex>
              <Flex color={"grey"} fontWeight={"semibold"}>
                Total Karyawan
              </Flex>
            </Flex>
          </Flex>

          <Flex className="menuTotalG">
            <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#cbe4fb"}>
              <Icon
                as={FaStore}
                fontSize={"30px"}
                color={"#007bfe"}
              />
            </Center>
            <Flex flexDir={"column"}>
              <Flex fontSize={"24px"} fontWeight={"extrabold"}>
                {dtBranch.length}
              </Flex>
              <Flex color={"grey"} fontWeight={"semibold"}>
                Total Branch
              </Flex>
            </Flex>
          </Flex>
        </Grid>
        <Flex flexDir={"column"} rowGap={"10px"}>
          <Flex
            fontSize={"24px"}
            fontWeight={"700"}
            paddingBottom={"20px"}
            justifyContent={"space-between"}
          >
            <Flex flexDir={"column"} gap={"5%"} fontSize={15}>
              Data Cabang dan Karyawan 
              <Button h={"30px"} bgColor={"#9d9c45"} gap={"10px"} cursor={"pointer"} onClick={() => {onOpen()}}><BsFillPersonPlusFill/>Tambah</Button>
            </Flex>
            <Flex maxW={"400px"} w={"100%"} gap={"10px"}>
              <Select placeholder="Pilih Lokasi Cabang" bg={"white"}>
                <option value="bandung">Bandung</option>
                <option value="sukabumi">Sukabumi</option>
                <option value="batam">Batam</option>
              </Select>
              <InputGroup>
                <Input placeholder="search" bg={"white"}></Input>
                <InputRightElement
                  as={BiSearch}
                  w={"30px"}
                  h={"30px"}
                  padding={"10px 10px 0px 0px"}
                />
              </InputGroup>
            </Flex>
          </Flex>

          {/* <TableContainer w={"100%"}> */}
          {/* <Box><Button>Tambah Data</Button></Box> */}
          <Table size="sm" w={"100%"} variant="simple" className="custom-table" maxW={"850px"}>
            <Thead w={"100%"} bg={"#ffb21c"} fontSize={"12px"}>
              <Tr>
                <Th>No</Th>
                <Th>Nama</Th>
                <Th>Email </Th>
                <Th>Nomor HP</Th>
                <Th>Nama Branch</Th>
                <Th>Alamat Branch</Th>
                <Th>Kota - Provinsi</Th>
                <Th>Aksi</Th>
              </Tr>
            </Thead>

            <Tbody fontSize={"10px"}>
              {dtBranch.map((val, index) => (
                <Tr key={val.id} className="table-row">
                  <Td>{index + 1}</Td>
                  <Td>{val.user_name}</Td>
                  <Td>{val.email}</Td>
                  <Td>{val.phone_number}</Td>
                  <Td>{val.Branch.branch_name}</Td>
                  <Td>{val.Branch.branch_address}</Td>
                  <Td>{val.Branch.city} - {val.Branch.province}</Td>
                  <Td alignItems={"center"} position={"center"}>
                     <Flex flexDir={"row"} w={"100%"} h={"100%"} gap={"15px"}>
                     <Button bgColor={"#9d9c45"} w={"100%"} cursor={"pointer"} ><BiEdit/></Button>
                     <Button bgColor={"red.500"} w={"100%"} cursor={"pointer"}
                     onClick={()=> {
                        hadleDelete(val.branch_id, val.id, val.user_name, val.Branch.branch_name)
                     }}><RiDeleteBin6Fill width={"100%"}/></Button>
                     </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay/>
        <ModalContent maxW={"700px"} w={"100%"} borderRadius={"20px"} >
          <AddAdminBranch isOpen={isOpen} onClose={onClose}  />
        </ModalContent>
      </Modal>
    </>
  );
}
