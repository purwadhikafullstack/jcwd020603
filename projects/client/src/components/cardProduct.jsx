import { Flex, Center, Grid, Image, Button, Icon } from "@chakra-ui/react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import "../css/indexB.css";
import { useEffect } from "react";

export function CardProduct(props) {
  const { url, product_name, price, desc, weight, discount } = props;
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

  return (
    <>
      <Flex id="cardProductB" flexDir="column" paddingBottom={"10px"}>
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
    </>
  );
}
