import {
  useDisclosure,
} from "@chakra-ui/react";
import "../css/indexG.css";
import "../css/indexR.css";
import { api } from "../api/api";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import DiscountContent from "./Discount-content";

export default function Discount() {
  const userSelector = useSelector((state) => state.auth);
  const roleOfUSer = userSelector.role;
  const searchRef = useRef()
  const [getBranch_name,setGetBranch_name] = useState([])
  const [inputBranch_name,setInputBranch_name] = useState()
  const [search,setSearch] = useState()
  const [sorted,setSorted] = useState()
  const [ordered,setOrdered] = useState()
  const [ascMOdeStart,setAscModeStart] = useState(true)
  const [ascMOdeTo,setAscModeTo] = useState(true)
  const [ascMOdeNominal,setAscModeNominal] = useState(true)
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [pages, setPages] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [shown, setShown] = useState({page : 1})
  const { isOpen, onOpen, onClose } = useDisclosure(); //state untuk pengaturan modal add
  const {
    isOpen: isOpenDel,
    onOpen: onOpenDel,
    onClose: onCloseDel,
  } = useDisclosure();
  const [dtDis, setDtDis] = useState([]); // state untuk menyimpan data discount
  const [dtDisSelected, setDtDisSelected] = useState([]); // state untuk menyimpan data discount
  const [isEdit, setIsEdit] = useState(false); //state untuk menentukan modal tambah atau edit
  const [numberIdx, setNumberIdx] = useState(0);
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
  // ambil data discount
  const fetchDtSelected = async() => {
    const sendDataselect = {
      branch_id : branch_id || "",
      discount_id : numberIdx || ""
    }
    try {
      await api().post("/discount/stock-selected", sendDataselect)
      .then((res) => {
        setDtDisSelected(res.data)
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  const fetchAll = async () => {
    const sendData = {
      branch_id : branch_id || "",
      search : search || "",
      sort : sorted || "createdAt",
      ordering : ordered || "ASC",
      page : shown.page -1 || "0"
    }
    try {
      await api()
        .post("/discount/stock-discount", sendData)
        .then((res) => {
          setDtDis(res.data.Data);
          setTotalPages(res.data.total)
          setTotalDiscount(res.data.jumlah_discount)
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
  }, [dtDis, totalPages, shown.page])
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
    fetchDtSelected()
  }, []);
  useEffect(() => {
    fetchDtSelected()
  }, [numberIdx]);
  useEffect(() => {
    fetchAll();
    fetchDtSelected()
  }, [inputBranch_name, search, shown, sorted, ordered]);



  return (
   <>
    <DiscountContent userSelector={userSelector} roleOfUSer={roleOfUSer} searchRef={searchRef} getBranch_name={getBranch_name} setGetBranch_name={setGetBranch_name}
     inputBranch_name={inputBranch_name} setInputBranch_name={setInputBranch_name} search={search} setSearch={setSearch} ordered ={ordered} setOrdered ={setOrdered}
     sorted = {sorted} setSorted ={setSorted} ascMOdeStart = {ascMOdeStart} setAscModeStart={setAscModeStart} ascMOdeTo={ascMOdeTo} setAscModeTo={setAscModeTo}
     ascMOdeNominal ={ascMOdeNominal} setAscModeNominal={setAscModeNominal} totalDiscount={totalDiscount} setTotalDiscount={setTotalDiscount} totalPages={totalPages}
     pages={pages} setTotalPages={setTotalPages} shown={shown} setShown={setShown} onOpen={onOpen} isOpen={isOpen} onClose={onClose} dtDis={dtDis} setDtDis={setDtDis} numberIdx={numberIdx}
     onOpenDel ={onOpenDel} isOpenDel ={isOpenDel} onCloseDel = {onCloseDel} dtDisSelected={dtDisSelected} isEdit={isEdit} setIsEdit={setIsEdit} setDtDisSelected={setDtDisSelected} setNumberIdx={setNumberIdx}
     fetchAll={fetchAll} fetchDtBranch={fetchDtBranch} branch_namenya={branch_namenya} inputHandlerBranch_name={inputHandlerBranch_name} itemPerPage={itemPerPage} activeCheck={activeCheck}
      />
   </>
  );
}
