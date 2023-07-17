import { Flex, Center, Grid, Image, Button, Icon } from "@chakra-ui/react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import "../css/indexB.css";
import { useEffect } from "react";

export function CardProductCoba(props) {
  // const price = parseInt(props.price);
  const { url, product_name, price, desc, weight, isDiscount } = props;
  const discount = parseInt(props.discount);
  const discountedPrice = price - (price * isDiscount) / 100;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    }).format(amount);
  };

  useEffect(() => {
    console.log(props.stocks);
  }, []);

  return (
    <>
      <Flex id="cardProductB" flexDir="column" paddingBottom={"10px"}>
        <Image id="image_productB" src={url} alt={product_name} />
        <Flex flex="1" paddingLeft={"10px"} flexDir={"column"}>
          <Flex id="product_nameB">{product_name}</Flex>
          <Flex id="satuanB">{desc}</Flex>
          <Flex
            flexDir={"flex"}
            justifyContent={"space-between"}
            paddingRight={"10px"}
            alignItems={"flex-end"}
          >
            {isDiscount && (
              <Flex flexDir={"column"}>
                {props.discount === "50%" ? (
                  <>
                    <Flex id="hasilDiscountB">{formatCurrency(price)}</Flex>
                    <Flex>
                      <Flex id="discountBOGOB">Buy1Get1</Flex>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Flex id="hasilDiscountB">
                      {formatCurrency(
                        price - (price * parseInt(props.discount)) / 100
                      )}
                    </Flex>
                    <Flex>
                      <Flex id="discountB">{props.discount}</Flex>
                      <Flex id="priceB">{formatCurrency(price)}</Flex>
                    </Flex>
                  </>
                )}
              </Flex>
            )}
            {!isDiscount && (
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
