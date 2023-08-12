import {
  Box,
  Center,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  Icon,
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
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { BsFillBoxSeamFill, BsFillBagCheckFill } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import AdminNavbarOrder from "./admin-navbar-order";
import { BiSearch, BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import AdminSidebar from "./admin-sidebar";
import { useEffect, useRef, useState } from "react";
import { api } from "../api/api";
import { MdArrowBackIosNew } from "react-icons/md";
import moment from "moment";
import Pagination from "./pagination";
import { color } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminOrderList() {
  const windowWidth = window.innerWidth;
  const nav = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tableHeadRef = useRef(null);
  const tableRowRef = useRef(null);
  const handleTableHeadScroll = (e) => {
    if (tableRowRef.current) {
      tableRowRef.current.scrollLeft = e.target.scrollLeft;
    }
  };
  const handleTableRowScroll = (e) => {
    if (tableHeadRef.current) {
      tableHeadRef.current.scrollLeft = e.target.scrollLeft;
    }
  };
  //get all branch order
  const [filtering, setFiltering] = useState({
    page: 1,
    sort: "",
    order: "DESC",
    search: "",
  });
  const [totalPages, setTotalPages] = useState(0);
  const [allBranchOrder, setAllBranchOrder] = useState([]);
  const [shown, setShown] = useState({ page: 1 });
  const getAllOrders = async () => {
    const get = await api().get("/order/admin", {
      params: { pages: shown.page },
    });
    setAllBranchOrder(get.data.result);
    setTotalPages(get.data.total);
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  useEffect(() => {
    getAllOrders();
  }, [filtering]);
  console.log(allBranchOrder);
  //pagination
  const [pages, setPages] = useState([]);
  function pageHandler() {
    const output = [];
    for (let i = 1; i <= totalPages; i++) {
      output.push(i);
    }
    setPages(output);
  }
  useEffect(() => {
    pageHandler();
  }, [allBranchOrder]);
  useEffect(() => {
    if (shown.page > 0 && shown.page <= totalPages) {
      setFiltering({ ...filtering, page: shown.page });
    }
  }, [shown]);
  //filter pesanan udah selesai
  const doneOrder = allBranchOrder.filter(
    (order) =>
      order.status === "Dibatalkan" || order.status === "Pesanan Dikonfirmasi"
  );
  const undoneOrder = allBranchOrder.length - doneOrder.length;

  return (
    <>
      <Box>
        <AdminNavbarOrder onOpen={onOpen} />
      </Box>
      <Flex
        maxW={"910px"}
        w={"100%"}
        h={"100%"}
        padding={"30px"}
        flexDir={"column"}
        rowGap={"20px"}
        marginTop={"60px"}
        borderTopLeftRadius={"20px"}
        bg={"#FFF7E7"}
      >
        <Flex
          w={"100%"}
          flexDir={"column"}
          rowGap={"20px"}
          alignItems={windowWidth <= 550 ? "center" : null}
        >
          <Flex fontSize={"26px"} fontWeight={"700"}>
            Jumlah Pesanan
          </Flex>

          <Grid className="gridMenuG">
            <Flex className="menuTotalG">
              <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#fdefce"}>
                <Icon
                  as={RiShoppingBag3Fill}
                  fontSize={"30px"}
                  color={"#ffb21c"}
                />
              </Center>
              <Flex flexDir={"column"}>
                <Flex fontSize={"24px"} fontWeight={"extrabold"}>
                  {allBranchOrder.length}
                </Flex>
                <Flex color={"grey"} fontWeight={"semibold"}>
                  Total Pesanan
                </Flex>
              </Flex>
            </Flex>
            <Flex className="menuTotalG">
              <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#cbe4fb"}>
                <Icon
                  as={BsFillBoxSeamFill}
                  fontSize={"30px"}
                  color={"#007bfe"}
                />
              </Center>
              <Flex flexDir={"column"}>
                <Flex fontSize={"24px"} fontWeight={"extrabold"}>
                  {undoneOrder}
                </Flex>
                <Flex color={"grey"} fontWeight={"semibold"}>
                  Pesanan diproses
                </Flex>
              </Flex>
            </Flex>
            <Flex className="menuTotalG">
              <Center w={"60px"} h={"60px"} borderRadius={"50%"} bg={"#ebf5e9"}>
                <Icon
                  as={BsFillBagCheckFill}
                  fontSize={"30px"}
                  color={"#2a960c"}
                />
              </Center>
              <Flex flexDir={"column"}>
                <Flex fontSize={"24px"} fontWeight={"extrabold"}>
                  {doneOrder.length}
                </Flex>
                <Flex color={"grey"} fontWeight={"semibold"}>
                  Pesanan Selesai
                </Flex>
              </Flex>
            </Flex>
          </Grid>
        </Flex>
        <Flex
          fontSize={"24px"}
          fontWeight={"700"}
          paddingBottom={"20px"}
          justifyContent={"space-between"}
        >
          <Flex>List Pesanan</Flex>
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
        <TableContainer id="containerTableB" justifyContent={"space-between"}>
          <Table variant="simple">
            <Thead
              className="tableHeadG"
              onScroll={handleTableHeadScroll}
              ref={tableHeadRef}
              border={"2px solid grey"}
              bg={"#ffb21c"}
            >
              <Tr className="tableHeadMenuG">
                <Th textAlign={"center"}>No Order</Th>
                <Th textAlign={"center"}>Nama</Th>
                <Th textAlign={"center"}>Status</Th>
                <Th>
                  <Flex alignItems="center" id="tableNameB">
                    Tanggal{" "}
                    <Flex flexDirection="column">
                      <Icon id="ascendingB" as={MdArrowBackIosNew} />
                      <Icon id="descendingB" as={MdArrowBackIosNew} />
                    </Flex>
                  </Flex>
                </Th>
                <Th textAlign={"center"}>Total</Th>
              </Tr>
            </Thead>
            <Tbody
              className="tableRowG"
              ref={tableRowRef}
              onScroll={handleTableRowScroll}
              border={"2px solid grey"}
            >
              {allBranchOrder.map((val) => {
                return (
                  <>
                    <Tr
                      justifyContent={"space-between"}
                      w={"100%"}
                      minW={"808px"}
                      _hover={{ backgroundColor: "lightgray" }}
                      onClick={() => {
                        nav(`/admin/orders/${val.order_number}`);
                      }}
                    >
                      <Td textAlign={"center"}>{val.order_number}</Td>
                      <Td textAlign={"center"}>{val.Address?.address_name}</Td>
                      <Td textAlign={"center"}>{val.status}</Td>
                      <Td textAlign={"center"}>
                        {moment(val.date).format("ll")}
                      </Td>
                      <Td textAlign={"center"}>
                        Rp {val.total?.toLocaleString("id-ID")}
                      </Td>
                    </Tr>
                  </>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justifyContent={"end"}>
          <Pagination
            shown={shown}
            setShown={setShown}
            totalPages={totalPages}
            pages={pages}
          />
        </Flex>
      </Flex>
    </>
  );
}
