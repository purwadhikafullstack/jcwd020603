import {Box, Button, Center, Flex, Icon, Input, InputGroup, InputRightElement,Select,Table,Tbody,Td,Th,Thead,Tr,Modal,ModalOverlay,ModalContent,
} from "@chakra-ui/react";
import { BiSearch} from "react-icons/bi";
import AdminNavbar from "./AdminNavbar";
import "../css/indexG.css";
import "../css/indexR.css";
import { BiEdit } from "react-icons/bi";
import { FaStore } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { MdArrowBackIosNew } from "react-icons/md";
import DiscountAddModal from "./DiscountAddModal";
import ModalKonfirmasiDeletDiscount from "./modal-konfirmasi-deleteDiscount";
import Pagination from "./pagination";

export default function DiscountContent(props) {
  
 const {
  userSelector, roleOfUSer, searchRef,getBranch_name, setSearch,setOrdered,ascMOdeStart, ascMOdeTo,setAscModeTo,ascMOdeNominal, setAscModeNominal, totalDiscount,
  totalPages, pages, shown, setShown, onOpen, onClose, dtDis, onOpenDel,  onCloseDel,  dtDisSelected,  isEdit,  setIsEdit,  activeCheck,
  numberIdx, setNumberIdx,fetchAll,isOpen, isOpenDel, itemPerPage, setSorted, inputHandlerBranch_name, setAscModeStart, branch_namenya, } = props
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
          Pengaturan Diskon
        </Flex>

        <Flex gap={"10px"} flexDir={{base : "column", sm: "row", lg: "row", xl : "row"}} alignItems={"center"}
        justifyContent={"space-evenly"} 
        >
          <Flex className="menuTotalG">
            <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#fdefce"}>
              <Icon
                as={TbShoppingCartDiscount}
                fontSize={"30px"}
                color={"#ffb21c"}
              />
            </Center>
            <Flex flexDir={"column"}>
              <Flex fontSize={"24px"} fontWeight={"extrabold"}>
                {totalDiscount}
              </Flex>
              <Flex color={"grey"} fontWeight={"semibold"}>
                Total Diskon
              </Flex>
            </Flex>
          </Flex>

          <Flex className="menuTotalG">
            <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#cbe4fb"}>
              <Icon as={FaStore} fontSize={"30px"} color={"#007bfe"} />
            </Center>
            <Flex flexDir={"column"}>
              <Flex fontSize={"18px"} textAlign={"center"} fontWeight={"extrabold"}>
                {branch_namenya()}
              </Flex>
              <Flex color={"grey"} fontWeight={"semibold"}>
                Nama Cabang
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
              display={userSelector.role == "ADMIN" ? "flex" : "none"}
                bgColor={"#9d9c45"}
                gap={"10px"}
                cursor={"pointer"}
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
                display={() => (roleOfUSer == "SUPER ADMIN" ? "flex" : "none")}
              >
                {getBranch_name.map((val, index) => (
                  <option key={index} value={val.id}>{val.branch_name}</option>
                ))}
              </Select>
              <InputGroup>
                <Input placeholder="search" ref={searchRef} bg={"white"}></Input>
                <InputRightElement
                  as={BiSearch}
                  w={"30px"}
                  h={"30px"}
                  cursor={"pointer"}
                  padding={"10px 10px 0px 0px"}
                  onClick={()=> {setSearch(searchRef.current.value)}}
                />
              </InputGroup>
            </Flex>
          </Flex>
          {/* tampilan data discount */}
          <Flex w={"100%"} overflowX={"auto"} flexDir={"column"} >
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
                <Th>Status</Th>
                <Th>Judul</Th>
                <Th cursor={"pointer"} onClick={()=> {
                  setSorted("valid_start")
                  setOrdered(ascMOdeStart ? "ASC" : "DESC")
                  setAscModeStart(!ascMOdeStart)
                }}><Flex w={"100px"}><Flex w={"70%"}>Tanggal Mulai</Flex>
                {ascMOdeStart ? <MdArrowBackIosNew size={"8%"} id="descendingB"/> : 
                <MdArrowBackIosNew id="ascendingB" size={"8%"}/>}</Flex></Th>

                 <Th cursor={"pointer"} onClick={()=> {
                  setSorted("valid_to")
                  setOrdered(ascMOdeTo ? "ASC" : "DESC")
                  setAscModeTo(!ascMOdeTo)
                }}><Flex w={"100px"}><Flex w={"70%"}>Tanggal Akhir</Flex>
                {ascMOdeTo ? <MdArrowBackIosNew size={"8%"} id="descendingB"/> : 
                <MdArrowBackIosNew id="ascendingB" size={"8%"}/>}</Flex></Th>

                 <Th cursor={"pointer"} onClick={()=> {
                  setSorted("nominal")
                  setOrdered(ascMOdeNominal ? "ASC" : "DESC")
                  setAscModeNominal(!ascMOdeNominal)
                }}><Flex w={"100px"}><Flex w={"70%"}>Nominal (%)</Flex>
                {ascMOdeNominal ? <MdArrowBackIosNew size={"8%"} id="descendingB"/> : 
                <MdArrowBackIosNew id="ascendingB" size={"8%"}/>}</Flex></Th>
                <Th display={roleOfUSer == "ADMIN" ? "" : "none"} alignItems={"center"} >Aksi</Th>
              </Tr>
            </Thead>

            <Tbody fontSize={"10px"}>
              {dtDis?.map((val, index) => (
                <Tr key={val.id} className="table-row">
                  <Td>{(shown.page - 1)*itemPerPage + (index + 1)}</Td>
                  <Td>
                    {activeCheck(val.valid_start, val.valid_to)
                      ? "Aktif"
                      : "OFF"}
                  </Td>
                  <Td>{val?.title}</Td>
                  <Td>{val?.valid_start?.split("T")[0]}</Td>
                  <Td>{val?.valid_to?.split("T")[0]}</Td>
                  <Td>{val?.nominal}</Td>
                  <Td alignItems={"center"} position={"center"} display={userSelector.role =="ADMIN" ? "flex" : "none"}>
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
        </Flex>
        <Flex justifyContent={"end"}>
          <Pagination
            shown={shown}
            setShown={setShown}
            totalPages={totalPages}
            pages={pages}/>
          </Flex>
      </Flex>
                        
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW={"500px"} w={"100%"} borderRadius={"20px"}>
          <DiscountAddModal
            isOpen={isOpen}
            onClose={onClose}
            fetchAll={fetchAll}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            dtDis={dtDis}
            numberIdx={numberIdx}
            dtDisSelected={dtDisSelected}
          />
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenDel} onClose={onCloseDel} isCentered>
        <ModalOverlay />
        <ModalContent maxW={"500px"} w={"100%"} borderRadius={"20px"}>
          <ModalKonfirmasiDeletDiscount
            isOpen={isOpenDel}
            onClose={onCloseDel}
            fetchAll={fetchAll}
            dtDis={dtDis}
            numberIdx={numberIdx}
            dtDisSelected={dtDisSelected}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
