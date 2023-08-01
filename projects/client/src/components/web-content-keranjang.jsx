import {
  Box,
  Center,
  Checkbox,
  Flex,
  Icon,
  Stack,
  useAccordion,
} from "@chakra-ui/react";
import NavbarKeranjang from "./navbar-keranjang";
import KeranjangList from "./keranjang-list-produk";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MetodePengiriman from "./keranjang-metode-pengiriman";
import VoucherPromo from "./keranjang-voucher";
import RincianPembayaran from "./keranjang-pembayaran";
import DaftarAlamat from "./keranjang-daftar-alamat";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { api } from "../api/api";
import { useSelector } from "react-redux";

export default function WebKeranjang(props) {
  const addressSelector = useSelector((state) => state.address);
  const { prodCart } = props;
  const nav = useNavigate();
  useEffect(() => {
    console.log(prodCart);
  }, [prodCart]);
  const [selectedItems, setSelectedItems] = useState([]);

  //count total harga belanja
  const totalBelanja = selectedItems.map((val, idx) => {
    const price = selectedItems[idx].discounted_price
      ? selectedItems[idx].discounted_price == 50
        ? Number(selectedItems[idx].Stock.Product.price)
        : Number(selectedItems[idx].discounted_price)
      : Number(selectedItems[idx].Stock.Product.price);
    return price * Number(selectedItems[idx].qty);
  });
  //count berat belanja
  const [weightTotal, setWeightTotal] = useState(0);
  const itungWeight = selectedItems.map(
    (val, idx) =>
      Number(selectedItems[idx].Stock.Product.weight) *
      Number(selectedItems[idx].qty)
  );
  const totalWeight = () => {
    if (itungWeight.length) {
      setWeightTotal(itungWeight.reduce((a, b) => a + b));
    }
  };
  //get biaya pengiriman dari rajaOngkir
  const [courier, setCourier] = useState("");
  const [shipCost, setShipCost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(courier);
  const inputCost = {
    origin: prodCart[0]?.Stock.Branch?.city_id,
    destination: addressSelector.city_id,
    weight: weightTotal,
    courier: courier,
  };
  console.log(inputCost);
  const getCost = async () => {
    const token = JSON.parse(localStorage.getItem("auth"));
    try {
      await api
        .post("/cart/cost", inputCost, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setShipCost(res.data.data[0].costs);
          console.log(res.data.data[0].costs);
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err.response);
    }
  };
  useEffect(() => {
    getCost();
  }, [courier]);
  useEffect(() => {
    console.log(selectedItems);
    console.log(totalBelanja);
    totalWeight();
  }, [selectedItems]);
  //menyimpan biaya pengiriman
  const [cost, setCost] = useState({});

  return (
    <>
      <Box>
        <NavbarKeranjang />
      </Box>
      <Flex>
        <Flex className="flexLuarG">
          <Flex w={"50%"} flexDir={"column"} rowGap={"20px"}>
            <Flex
              w={"100%"}
              borderRadius={"5px"}
              flexDir={"column"}
              boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.2);"}
            >
              <Flex
                w={"100%"}
                h={"5px"}
                bg={"#FD8D25"}
                borderTopRadius={"5px"}
              ></Flex>
              <Flex w={"100%"} padding={"20px"} flexDir={"column"}>
                <Flex
                  w={"100%"}
                  fontSize={"20px"}
                  color={"#626467"}
                  fontWeight={"600"}
                >
                  Produk
                </Flex>
                <Flex
                  w={"100%"}
                  flexDir={"column"}
                  maxHeight={"585px"}
                  overflowX={"scroll"}
                  css={{
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {prodCart?.length ? (
                    <>
                      {prodCart.map((val, idx) => {
                        return (
                          <KeranjangList
                            index={idx}
                            {...val}
                            prodCart={prodCart}
                            getAll={props.getAll}
                            selectedItems={selectedItems}
                            setSelectedItems={setSelectedItems}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <Center
                        w={"100%"}
                        h={"300px"}
                        flexDir={"column"}
                        fontWeight={"500"}
                        rowGap={"10px"}
                        color={"#2A960C"}
                      >
                        <Icon as={MdOutlineAddShoppingCart} fontSize={"80px"} />
                        Anda belum memiliki produk di keranjang
                        <Flex
                          bg={"#2A960C"}
                          color={"white"}
                          padding={"5px"}
                          borderRadius={"10px"}
                          fontSize={"10px"}
                          cursor={"pointer"}
                          onClick={() => {
                            nav("/");
                          }}
                        >
                          Klik untuk memilih produk
                        </Flex>
                      </Center>
                    </>
                  )}
                </Flex>
                <Flex
                  w={"100%"}
                  h={"41px"}
                  justifyContent={"space-between"}
                  color={"#626467"}
                  fontSize={"14px"}
                  fontWeight={"600"}
                  paddingTop={"20px"}
                >
                  <Flex>Total Belanja</Flex>
                  <Flex>
                    Rp{" "}
                    {totalBelanja.length
                      ? totalBelanja
                          .reduce((a, b) => a + b)
                          .toLocaleString("id-ID")
                      : 0}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <VoucherPromo />
          </Flex>
          <Flex
            w={"50%"}
            flexDir={"column"}
            alignItems={"center"}
            minH={"100vh"}
            justifyContent={"space-between"}
            rowGap={"20px"}
          >
            <Flex w={"100%"} rowGap={"20px"} flexDir={"column"}>
              <DaftarAlamat />
              <MetodePengiriman
                setCourier={setCourier}
                shipCost={shipCost}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                setCost={setCost}
                cost={cost}
              />
              <RincianPembayaran totalBelanja={totalBelanja} cost={cost} />
            </Flex>
            <Center
              w={"90%"}
              padding={"5px"}
              bg={"#2A960C"}
              color={"white"}
              fontSize={"16px"}
              fontWeight={"500"}
              borderRadius={"10px"}
              letterSpacing={"1px"}
              boxShadow={"0px -4px 10px rgb(0,0,0,0.3)"}
              onClick={() => {
                nav("/payment");
              }}
            >
              PESAN SEKARANG
            </Center>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
