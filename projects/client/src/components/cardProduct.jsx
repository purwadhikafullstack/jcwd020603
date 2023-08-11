import {
  Flex,
  Center,
  Grid,
  Image,
  Button,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import "../css/indexB.css";
import { useEffect, useState } from "react";
import ModalProduct from "./modal-product";

export function CardProduct(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { url, product_name, price, desc, weight, discount, id, stock_id } =
    props;
  const discountedPrice = price - (price * discount) / 100;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    }).format(amount);
  };

  // useEffect(() => {
  //   console.log(props.stocks);
  // }, []);
  console.log(props);

  //get product value
  const [prodVal, setProdVal] = useState({
    //untuk simpan value product yang di klik
    id: "",
    stock_id: "",
    photo_product_url: "",
    price: "",
    product_name: "",
    desc: "",
    weight: "",
    qty: "",
    discount: "",
    discountedPrice: "",
  });
  const getProdVal = (val, idx) => {
    const newDiscount = discount || 0;
    const newDiscountedPrice = newDiscount
      ? price - (price * newDiscount) / 100
      : 0;
    setProdVal({
      ...prodVal,
      id: id,
      stock_id: stock_id,
      photo_product_url: url,
      price: price,
      product_name: product_name,
      desc: desc,
      weight: weight,
      discount: newDiscount,
      discountedPrice: newDiscountedPrice,
    });
  };
  useEffect(() => {
    console.log(prodVal);
  }, [prodVal]);

  return (
    <>
      <Flex
        id="cardProductB"
        flexDir="column"
        paddingBottom={"10px"}
        onClick={() => {
          getProdVal();
          onOpen();
        }}
      >
        <Center flex="2">
          <Image id="image_productB" src={url} />
        </Center>
        <Flex flex="1" paddingLeft={"10px"} flexDir={"column"}>
          <Flex id="product_nameB">{product_name}</Flex>
          <Flex id="satuanB">{desc}</Flex>
          <Flex
            flexDir={"flex"}
            justifyContent={"space-between"}
            paddingRight={"10px"}
            alignItems={"flex-end"}
          >
            {discount ? (
              <Flex flexDir={"column"}>
                {discount === 50 ? (
                  <Flex flexDir={"column"}>
                    <Flex id="hasilDiscountB">{formatCurrency(price)}</Flex>
                    <Flex>
                      <Flex id="discountBOGOB">Buy1Get1</Flex>
                    </Flex>
                  </Flex>
                ) : (
                  <Flex flexDir={"column"}>
                    <Flex id="hasilDiscountB">
                      {formatCurrency(discountedPrice)}
                    </Flex>
                    <Flex>
                      <Flex id="discountB">{discount}%</Flex>
                      <Flex id="priceB">{formatCurrency(price)}</Flex>
                    </Flex>
                  </Flex>
                )}
              </Flex>
            ) : (
              <Flex flexDir={"column"}>
                <Flex id="hasilDiscountB">{formatCurrency(price)}</Flex>
              </Flex>
            )}
            <Icon id="iconAddCartB" as={MdOutlineAddShoppingCart} />
          </Flex>
        </Flex>
      </Flex>
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          borderRadius={"15px"}
          css={{
            width: "500px",
            margin: "0 auto",
          }}
        >
          <ModalProduct
            isOpen={isOpen}
            onClose={onClose}
            prodVal={prodVal}
            setProdVal={setProdVal}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}
