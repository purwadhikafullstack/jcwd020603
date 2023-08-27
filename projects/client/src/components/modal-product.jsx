import {
  Center,
  Flex,
  Icon,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  assignRef,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  BiHeart,
  BiMinus,
  BiPlus,
  BiSolidChevronDownCircle,
} from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { api } from "../api/api";
import ModalAlamatPengiriman from "./modal-alamat-pengiriman";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCart } from "../hooks/useFetchCart";
import ModalNearestBranch from "./modal-nearest-branch";

export default function ModalProduct(props) {
  const { prodVal, setProdVal, checked, setChecked, selectedAddress } = props;
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cart);
  const nearestBranch = localStorage.getItem("nearestBranch");
  const [count, tambah, kurang] = useCounter(1, 1);
  const {
    isOpen: isOpenModal1,
    onOpen: onOpenModal1,
    onClose: onCloseModal1,
  } = useDisclosure();
  const {
    isOpen: isOpenModal2,
    onOpen: onOpenModal2,
    onClose: onCloseModal2,
  } = useDisclosure();
  const { countAll, fetch } = useFetchCart();

  // insert qty ke prodVal
  const insertQty = () => {
    const check = prodVal.discount;
    let tempObj = {};
    if (check == 50) {
      tempObj = { qty: count * 2 };
    } else {
      tempObj = { qty: count };
    }
    setProdVal({
      ...prodVal,
      ...tempObj,
    });
    console.log({ ...prodVal, ...tempObj });
  };
  useEffect(() => {
    insertQty();
  }, [count]);
  //get jumlah keranjang
  // const [countAll, setCountAll] = useState(0);
  // const getCount = async () => {
  //   await api()
  //     .get("/cart")
  //     .then((res) => {
  //       setCountAll(res.data.total);
  //       console.log(res.data.result);
  //     });
  // };
  console.log("prodVal", prodVal);
  //function cek update post produk ke cart
  const toast = useToast();
  const updateAdd = async () => {
    try {
      const update = await api().post(
        `/cart/${prodVal?.stock_id}?discounted_price=${prodVal?.discountedPrice}&&branch_id=${nearestBranch}`,
        prodVal
      );
      await fetch(nearestBranch);
      toast({
        title: update.data.message,
        status: update.data.status,
        position: "top",
        duration: 3000,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Login terlebih dahulu untuk menambahkan produk",
        status: "error",
        position: "top",
        duration: 3000,
      });
    }
  };

  //tambah produk ke cart
  const addToCart = () => {
    updateAdd();
  };

  //kondisional jumlah stok
  const [stokValue, setStokValue] = useState("");
  const stockAmount = () => {
    const amount = prodVal.quantity_stock;
    if (amount > 10) {
      return setStokValue("Stok Tersedia > 10");
    } else if (amount <= 10 && amount != 0) {
      return setStokValue(`Stok Tersedia : ${amount}`);
    } else if (amount <= 0) {
      return setStokValue("Stok Habis");
    }
  };
  useEffect(() => {
    console.log(prodVal);
    stockAmount();
  }, []);
  console.log("total", countAll);
  useEffect(() => {
    dispatch({
      type: "cart",
      payload: countAll,
    });
  }, [countAll, dispatch]);

  return (
    <>
      <Center>
        <Flex w={"100%"} maxW={"500px"} maxH={"700px"} flexDir={"column"}>
          <Center className="centerTerluarG">
            <Flex className="modalProdFlexG">
              <Icon
                as={BiSolidChevronDownCircle}
                fontSize={"38px"}
                color={"rgb(160,160,160,0.8)"}
                onClick={() => {
                  props.onClose();
                }}
              />
            </Flex>
            <Image className="prodImageG" src={prodVal.photo_product_url} />
          </Center>
          <Flex className="flexHargaG">
            {!prodVal.discountedPrice ? (
              <Flex className="styleHargaG">
                Rp{" "}
                {prodVal?.price != null
                  ? prodVal?.price.toLocaleString("id-ID")
                  : 0}
              </Flex>
            ) : prodVal.discount == 50 ? (
              <Flex flexDir={"column"} rowGap={"5px"}>
                <Flex className="styleHargaG">
                  Rp {prodVal.price.toLocaleString("id-ID")}
                </Flex>
                <Flex>
                  <Center className="buy1get1G">Buy1Get1</Center>
                </Flex>
              </Flex>
            ) : (
              <Flex flexDir={"column"} alignItems={"start"}>
                <Flex className="styleHargaG">
                  Rp {prodVal.discountedPrice.toLocaleString("id-ID")}
                </Flex>
                <Flex w={"50%"} fontSize={"14px"} gap={"10px"}>
                  <Center className="redDiscountG">{prodVal.discount}%</Center>
                  <Flex textDecor={"line-through"}>
                    Rp {prodVal.price.toLocaleString("id-ID")}
                  </Flex>
                </Flex>
              </Flex>
            )}
            <Flex fontSize={"16px"} fontWeight={"500"}>
              {prodVal.product_name}
            </Flex>
            <Flex fontSize={"12px"} color={"#767676"}>
              {prodVal.desc}
            </Flex>
            <Flex fontSize={"12px"}>{stokValue}</Flex>
          </Flex>
          <Flex className="footerModalG">
            <Icon as={BiHeart} fontSize={"32px"} />
            <Flex
              justifyContent={"right"}
              onClick={() => {
                if (
                  selectedAddress &&
                  Object.keys(selectedAddress).length > 0
                ) {
                  onOpenModal1();
                } else {
                  toast({
                    title: "Tentukan alamat pengiriman terlebih dahulu",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              }}
            >
              <Icon as={MdOutlineShoppingCart} fontSize={"32px"} />
              <Center
                className="redDotCountG"
                display={cartSelector.total == 0 ? "none" : "flex"}
              >
                {cartSelector.total}
              </Center>
            </Flex>
            <Flex className="counterQtyG">
              <Icon
                as={BiMinus}
                fontSize={"20px"}
                onClick={() => kurang(prodVal)}
              />
              <Flex className="countNumberG">{count}</Flex>
              <Icon
                as={BiPlus}
                fontSize={"20px"}
                onClick={() => tambah(prodVal)}
              />
            </Flex>
            <Center
              className="tombolAddtoCart"
              onClick={() => {
                if (nearestBranch == null || !nearestBranch) {
                  onOpenModal2();
                } else {
                  addToCart();
                  props.onClose();
                }
              }}
            >
              Tambah Ke Keranjang
            </Center>
          </Flex>
        </Flex>
      </Center>
      <Modal isOpen={isOpenModal1} onClose={onCloseModal1} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalAlamatPengiriman
            onClose={onCloseModal1}
            isOpen={isOpenModal1}
            selectedAddress={selectedAddress}
          />
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenModal2} onClose={onCloseModal2} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalNearestBranch
            onClose={onCloseModal2}
            isOpen={isOpenModal2}
            selectedAddress={selectedAddress}
          />
        </ModalContent>
      </Modal>
    </>
  );
}

function useCounter(val, step) {
  const [count, setCount] = useState(val);
  const toast = useToast();
  function tambah(prodVal) {
    if (prodVal.discount != 50) {
      if (count < prodVal.quantity_stock) {
        setCount(count + step);
      } else {
        toast({
          title:
            "Jumlah produk telah mencapai batas stok maksimum yang tersedia",
          status: "warning",
          position: "top",
          duration: 4000,
        });
      }
    } else {
      toast({
        title: "Promo Buy 1 Get 1",
        description: "Hanya dapat membeli satu produk promo buy 1 get 1",
        status: "error",
        position: "top",
        duration: 4000,
      });
    }
  }
  function kurang(prodVal) {
    if (prodVal.discount != 50) {
      if (count >= 1 && count != 1) {
        setCount(count - step);
      } else {
        toast({
          title: "Kuantitas Minimum 1 Unit",
          status: "warning",
          position: "top",
          duration: 4000,
        });
      }
    } else {
      toast({
        title: "Promo Buy 1 Get 1",
        description: "Hanya dapat membeli satu produk promo buy 1 get 1",
        status: "error",
        position: "top",
        duration: 4000,
      });
    }
  }
  return [count, tambah, kurang];
}
