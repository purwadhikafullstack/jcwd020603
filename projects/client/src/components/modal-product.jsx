import {
  Center,
  Flex,
  Icon,
  Image,
  assignRef,
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

export default function ModalProduct(props) {
  const { prodVal, setProdVal, checked, setChecked } = props;
  const [count, tambah, kurang] = useCounter(1, 1);
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

  //function cek update post produk ke cart
  const toast = useToast();
  const updateAdd = async () => {
    try {
      const update = await api().post(
        `/cart/${prodVal?.id}?discounted_price=${prodVal?.discountedPrice}`,
        prodVal
      );
      toast({
        title: update.data.message,
        status: update.data.status,
        position: "top",
        duration: 3000,
      });
    } catch (err) {
      const res = err.response;
      console.log(err);
      toast({
        title: res.data.message,
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

  useEffect(() => {
    console.log(prodVal);
  }, []);

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
                Rp {prodVal.price.toLocaleString("id-ID")}
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
          </Flex>
          <Flex className="footerModalG">
            <Icon as={BiHeart} fontSize={"32px"} />
            <Flex justifyContent={"right"}>
              <Icon as={MdOutlineShoppingCart} fontSize={"32px"} />
              <Center className="redDotCountG">1</Center>
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
                addToCart();
                props.onClose();
              }}
            >
              Tambah Ke Keranjang
            </Center>
          </Flex>
        </Flex>
      </Center>
    </>
  );
}

function useCounter(val, step) {
  const [count, setCount] = useState(val);
  const toast = useToast();
  function tambah(prodVal) {
    if (prodVal.discount != 50) {
      setCount(count + step);
    } else {
      toast({
        title: "Hanya dapat membeli satu produk promo buy 1 get 1",
        status: "error",
        position: "top",
        duration: 4000,
      });
    }
  }
  function kurang(prodVal) {
    if (count > 1 || prodVal.discount != 50) {
      setCount(count - step);
    } else {
      toast({
        title: "Hanya dapat membeli satu produk promo buy 1 get 1",
        status: "error",
        position: "top",
        duration: 4000,
      });
    }
  }
  return [count, tambah, kurang];
}
