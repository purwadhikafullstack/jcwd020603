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
import { useSelector } from "react-redux";
import AdminNavbar from "./AdminNavbar";

export default function AdminOrderList() {
  const windowWidth = window.innerWidth;
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  const searchRef = useRef(null);
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
  const [shown, setShown] = useState({ page: 1 });
  const [filtering, setFiltering] = useState({
    page: shown.page,
    sort: "createdAt",
    order: "DESC",
    search: "",
    time: "",
    time2: "",
    status: "",
    branch_id: "",
  });
  const [totalPages, setTotalPages] = useState(0);
  const [allBranchOrder, setAllBranchOrder] = useState([]);
  const [countOrder, setCountOrder] = useState(0);
  const [doneOrder, setDoneOrder] = useState(0);
  const [undoneOrder, setUndoneOrder] = useState(0);
  const getAllOrders = async () => {
    const params = { ...filtering };
    if (userSelector.branch_id !== null) {
      params.branch_id = userSelector.branch_id;
    }
    const get = await api().get("/order/admin", {
      params: { ...params },
    });
    setAllBranchOrder(get.data.result);
    setTotalPages(get.data.total);
    setCountOrder(get.data.count);
    setDoneOrder(get.data.done);
    setUndoneOrder(get.data.undone);
  };
  useEffect(() => {
    getAllOrders();
    getSelector();
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
  //get selector branch
  const [selector, setSelector] = useState([]);
  const getSelector = async () => {
    const get = await api().get("/branch/selector");
    setSelector(get.data.result);
  };
  //selector status
  const SelectorStatus = [
    { value: "Menunggu Pembayaran" },
    { value: "Menunggu Konfirmasi Pembayaran" },
    { value: "Diproses" },
    { value: "Dikirim" },
    { value: "Pesanan Dikonfirmasi" },
    { value: "Dibatalkan" },
  ];

  return (
    <>
      <Box>
        <AdminNavbar onOpen={onOpen} />
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
                  {countOrder}
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
                  {doneOrder}
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
          flexDir={"column"}
          rowGap={"10px"}
        >
          <Flex justifyContent={"space-between"} w={"100%"}>
            <Flex>List Pesanan</Flex>
            <InputGroup maxW={"300px"} w={"100%"}>
              <Input placeholder="search" bg={"white"} ref={searchRef}></Input>
              <InputRightElement
                as={BiSearch}
                w={"30px"}
                h={"30px"}
                padding={"10px 10px 0px 0px"}
                onClick={() => {
                  setFiltering({
                    ...filtering,
                    search: searchRef.current.value,
                  });
                  setShown({ page: 1 });
                }}
              />
            </InputGroup>
          </Flex>
          <Flex w={"100%"} gap={"10px"} justifyContent={"right"}>
            <Input
              placeholder="Pilih Tanggal"
              bg={"white"}
              type="date"
              value={filtering.time}
              maxW={"200px"}
              onChange={(e) => {
                setFiltering({ ...filtering, time: e.target.value });
                setShown({ page: 1 });
              }}
            ></Input>
            -
            <Input
              placeholder="Pilih Tanggal"
              bg={"white"}
              type="date"
              maxW={"200px"}
              value={filtering.time2}
              onChange={(e) => {
                setFiltering({ ...filtering, time2: e.target.value });
                setShown({ page: 1 });
              }}
            ></Input>
            <Select
              placeholder="Semua Cabang"
              bg={"white"}
              display={userSelector.role == "ADMIN" ? "none" : "flex"}
              onChange={(e) => {
                setFiltering({ ...filtering, branch_id: e.target.value });
              }}
            >
              {selector.map((val) => {
                return <option value={val.id}>{val.branch_name}</option>;
              })}
            </Select>
            <Select
              placeholder="Pilih Status"
              bg={"white"}
              fontSize={"14px"}
              onChange={(e) =>
                setFiltering({ ...filtering, status: e.target.value })
              }
            >
              {SelectorStatus.map((val) => {
                return <option value={val.value}>{val.value}</option>;
              })}
            </Select>
          </Flex>
          <Flex
            maxW={"65px"}
            fontSize={"12px"}
            _hover={{ cursor: "pointer", color: "lightgrey" }}
            onClick={() => {
              setFiltering({
                page: 1,
                order: "DESC",
                search: "",
                time: "",
                time2: "",
                status: "",
                branch_id: userSelector.branch_id || "",
              });
              setShown({ page: 1 });
            }}
          >
            Reset Filter
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
                      <Icon
                        id="ascendingB"
                        as={MdArrowBackIosNew}
                        onClick={() => {
                          setFiltering({ ...filtering, order: "ASC" });
                        }}
                      />
                      <Icon
                        id="descendingB"
                        as={MdArrowBackIosNew}
                        onClick={() => {
                          setFiltering({ ...filtering, order: "DESC" });
                        }}
                      />
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
                      <Td textAlign={"center"}>{val.User?.user_name}</Td>
                      <Td textAlign={"center"}>{val.status}</Td>
                      <Td textAlign={"center"}>
                        {moment(val.createdAt).format("ll")}
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
