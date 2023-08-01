import {
  Box,
  Center,
  Checkbox,
  Flex,
  Icon,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { api } from "../api/api";
import ModalKonfirmasiProduk from "./modal-konfirmasi-produk";

export default function KeranjangList(props) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { Product, Discount } = props.Stock;
  useEffect(() => {
    console.log(props.prodCart);
  }, []);

  //function update qty
  const updateQty = async (qty) => {
    try {
      await api
        .patch(
          `/cart/`,
          { qty },
          {
            params: {
              stock_id: props.stock_id,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          props.getAll();
          props.setSelectedItems([]);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  // function kalau qty nya 0 dia ilang
  const delCart = async (stock_id) => {
    await api.delete("/cart", {
      params: {
        stock_id: stock_id,
      },
    });
    props.getAll();
  };

  //checklist logic
  const { selectedItems, setSelectedItems } = props;

  const check = () => {
    const select = props.prodCart[props.index];
    if (selectedItems.includes(select)) {
      setSelectedItems((prev) => prev.filter((item) => item.id !== select.id));
    } else {
      setSelectedItems((prev) => [...prev, select]);
    }
  };

  const isChecked = selectedItems.includes(props.prodCart[props.index]);
  return (
    <>
      <Flex
        w={"100%"}
        padding={"20px 0px"}
        gap={"5px"}
        borderBottom={"1px solid grey"}
      >
        <Flex w={"5%"} alignItems={"start"}>
          <Checkbox
            colorScheme="green"
            onChange={check}
            isChecked={isChecked}
          ></Checkbox>
        </Flex>
        <Flex w={"10%"}>
          <Box boxSize={"38px"}>
            <Image
              src={Product.photo_product_url}
              borderRadius={"10px"}
              boxSize={"38px"}
            />
          </Box>
        </Flex>
        <Flex w={"85%"} flexDir={"column"} gap={"10px"}>
          <Flex w={"100%"} flexDir={"column"}>
            <Flex fontSize={"12px"} fontWeight={"500"}>
              {Product.product_name}
            </Flex>
            <Flex fontSize={"12px"} color={"grey"}>
              {Product.desc}
            </Flex>
          </Flex>
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            {!props.discounted_price ? (
              <Flex alignItems={"center"}>
                <Flex fontWeight={"500"} fontSize={"12px"}>
                  Rp. {Product.price.toLocaleString("id-ID")}
                </Flex>
              </Flex>
            ) : Discount.nominal == 50 ? (
              <Flex alignItems={"center"} gap={"10px"}>
                <Flex fontSize={"12px"} fontWeight={"700"} color={"#F25F0C"}>
                  Rp {(props.discounted_price * 2).toLocaleString("id-ID")}
                </Flex>
                <Flex>
                  <Center
                    fontSize={"12px"}
                    w={"100%"}
                    minW={"70px"}
                    borderRadius={"5px"}
                    color={"green"}
                    bg={"rgb(231, 244, 49)"}
                  >
                    Buy1Get1
                  </Center>
                </Flex>
              </Flex>
            ) : (
              <Flex flexDir={"column"} maxW={"200px"} w={"100%"}>
                <Flex fontSize={"12px"} fontWeight={"700"} color={"#F25F0C"}>
                  Rp {props.discounted_price.toLocaleString("id-ID")}
                </Flex>
                <Flex w={"50%"} fontSize={"10px"} gap={"10px"}>
                  <Center
                    w={"20%"}
                    bg={"red"}
                    borderRadius={"50%"}
                    color={"white"}
                    fontSize={"8px"}
                  >
                    {Discount.nominal}%
                  </Center>
                  <Flex textDecor={"line-through"}>
                    Rp {Product.price.toLocaleString("id-ID")}
                  </Flex>
                </Flex>
              </Flex>
            )}
            <Flex>
              <Center
                w={"30px"}
                h={"30px"}
                borderRadius={"50%"}
                fontSize={"50px"}
                alignItems={"center"}
                bg={"#ECFFF4"}
              >
                <Icon
                  as={BiMinus}
                  fontSize={"20px"}
                  color={"#199950"}
                  onClick={() => {
                    if (Discount?.nominal != 50) {
                      if (props.prodCart[props.index].qty <= 1) {
                        // delCart(props.stock_id, props.user_id);
                        onOpen();
                      } else if (props.prodCart[props.index].qty > 0) {
                        updateQty(props.prodCart[props.index].qty - 1);
                      }
                    } else {
                      toast({
                        title:
                          "Hanya dapat membeli satu produk promo buy 1 get 1",
                        status: "error",
                        position: "top",
                        duration: 4000,
                      });
                    }
                  }}
                />
              </Center>
              <Center w={"39px"} fontWeight={"600"}>
                {props.qty}
              </Center>
              <Center
                w={"30px"}
                h={"30px"}
                borderRadius={"50%"}
                fontSize={"50px"}
                alignItems={"center"}
                bg={"#ECFFF4"}
              >
                <Icon
                  as={BiPlus}
                  fontSize={"20px"}
                  color={"#199950"}
                  onClick={() => {
                    if (Discount?.nominal != 50) {
                      updateQty(props.prodCart[props.index].qty + 1);
                    } else {
                      toast({
                        title:
                          "Hanya dapat membeli satu produk promo buy 1 get 1",
                        status: "error",
                        position: "top",
                        duration: 4000,
                      });
                    }
                  }}
                />
              </Center>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalKonfirmasiProduk
            isOpen={isOpen}
            onClose={onClose}
            delCart={delCart}
            stock_id={props.stock_id}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
