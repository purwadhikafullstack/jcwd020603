import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Icon,
  Stack,
  useAccordion,
  useToast,
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

export default function WebKeranjang(props) {
  const { prodCart } = props;
  const nearestBranch = localStorage.getItem("nearestBranch");
  const nav = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  //menyimpan alamat yang dipilih
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isLoading2, setIsLoading2] = useState(false);
  const getSelectedAddress = async () => {
    try {
      setIsLoading2(true);
      const primary = await api().get("/addressG/primary");
      const selected = await api().get("/addressG/current");
      if (selected.data.result) {
        setSelectedAddress(selected.data.result);
        setIsLoading2(false);
      } else {
        setSelectedAddress(primary.data.result);
        setIsLoading2(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSelectedAddress();
  }, []);

  //count total harga belanja
  const totalBelanja = selectedItems.map((val, idx) => {
    const price = selectedItems[idx]?.Stock?.Discount
      ? selectedItems[idx]?.Stock?.Discount?.nominal == 50
        ? Number(
            selectedItems[idx].Stock.Product.price *
              ((100 - selectedItems[idx]?.Stock?.Discount?.nominal) / 100)
          )
        : Number(
            selectedItems[idx].Stock.Product.price *
              ((100 - selectedItems[idx]?.Stock?.Discount?.nominal) / 100)
          )
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
  const [courierName, setCourierName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputCost = {
    origin: prodCart[0]?.Stock.Branch?.city_id,
    destination: selectedAddress.city_id,
    weight: weightTotal,
    courier: courier,
  };
  const getCost = async () => {
    try {
      await api()
        .post("/cart/cost", inputCost)
        .then((res) => {
          setShipCost(res.data.data[0].costs);
          setCourierName(res.data.data[0].name);
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
    totalWeight();
  }, [selectedItems]);
  //menyimpan biaya pengiriman
  const [cost, setCost] = useState({});
  //menyimpan harga total pembayaran
  const [pembayaran, setPembayaran] = useState(0);
  //input voucher potongan harga
  const [getVoucher, setGetVoucher] = useState({});
  //kurangin limit voucher
  const updateLimit = async () => {
    try {
      const update = await api().patch(
        `/voucher/${getVoucher?.id}?limit=${getVoucher.limit}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  //post orders
  const toast = useToast();
  const postOrder = async () => {
    setIsLoading(true);
    try {
      const newCost = { ...cost, name: courierName };
      const insert = await api().post("/order", {
        selectedItems,
        total: pembayaran,
        status: "Menunggu Pembayaran",
        shipping_cost: JSON.stringify(newCost),
        address_id: selectedAddress.id,
        discount_voucher: getVoucher.nominal,
      });
      setIsLoading(false);
      toast({
        title: insert.data.message,
        status: "warning",
        position: "top",
        duration: 3000,
      });
      return nav("/payment");
    } catch (err) {
      setIsLoading(false);
      toast({
        title: err.response.data.message,
        description: err.response.data.description,
        status: "warning",
        position: "top",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Box>
        <NavbarKeranjang />
      </Box>
      <Flex width={"100%"} padding={"80px 20px 20px"} gap={"20px"}>
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
                          nearestBranch={nearestBranch}
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
          <VoucherPromo
            totalBelanja={totalBelanja}
            getVoucher={getVoucher}
            setGetVoucher={setGetVoucher}
            nearestBranch={nearestBranch}
          />
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
            <DaftarAlamat
              selectedAddress={selectedAddress}
              isLoading2={isLoading2}
            />
            <MetodePengiriman
              setCourier={setCourier}
              shipCost={shipCost}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              setCost={setCost}
              cost={cost}
            />
            <RincianPembayaran
              totalBelanja={totalBelanja}
              cost={cost}
              setPembayaran={setPembayaran}
              getVoucher={getVoucher}
            />
          </Flex>
          <Button
            w={"90%"}
            padding={"5px"}
            bg={"#2A960C"}
            color={"white"}
            fontSize={"16px"}
            fontWeight={"500"}
            borderRadius={"10px"}
            letterSpacing={"1px"}
            boxShadow={"0px -4px 10px rgb(0,0,0,0.3)"}
            isLoading={isLoading}
            onClick={() => {
              if (selectedItems.length > 0) {
                if (cost.service) {
                  updateLimit();
                  postOrder();
                } else {
                  toast({
                    title: "Tidak ada opsi pengiriman yang dipilih",
                    status: "warning",
                    position: "top",
                    duratio: 3000,
                  });
                }
              } else {
                toast({
                  title: "Tidak ada produk yang ingin di pesan",
                  status: "warning",
                  position: "top",
                  duratio: 3000,
                });
              }
            }}
          >
            PESAN SEKARANG
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
