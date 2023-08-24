import { Box, Center, Flex, Icon, Image, Input } from "@chakra-ui/react";
import KeranjangList from "./keranjang-list-produk";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MetodePengiriman from "./keranjang-metode-pengiriman";
import VoucherPromo from "./keranjang-voucher";
import RincianPembayaran from "./keranjang-pembayaran";
import NavbarKeranjang from "./navbar-keranjang";
import DaftarAlamat from "./keranjang-daftar-alamat";
import { api } from "../api/api";

export default function ContentKeranjang(props) {
  const nav = useNavigate();
  const [count, tambah, kurang] = useCounter(1, 1);

  return (
    <>
      <Box>
        <NavbarKeranjang />
      </Box>
      <Center>
        <Flex
          maxW={"100vw"}
          w={"100%"}
          minH={"100vh"}
          h={"100%"}
          padding={"80px 20px 20px 20px"}
          zIndex={0}
          alignItems={"center"}
          flexDir={"column"}
          justifyContent={"space-between"}
          rowGap={"20px"}
        >
          <Flex w={"100%"} flexDir={"column"} rowGap={"20px"}>
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
                  {props.prodCart.map((val, idx) => {
                    return (
                      <KeranjangList
                        key={idx}
                        index={idx}
                        {...val}
                        count={count}
                        tambah={tambah}
                        kurang={kurang}
                      />
                    );
                  })}
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
                  <Flex>Rp 258.000</Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex>
              <DaftarAlamat />
            </Flex>
            <Flex>
              <MetodePengiriman />
            </Flex>
            <Flex>
              <VoucherPromo />
            </Flex>
            <Flex>
              <RincianPembayaran />
            </Flex>
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
            onClick={() => {
              nav("/payment");
            }}
          >
            PESAN SEKARANG
          </Center>
        </Flex>
      </Center>
    </>
  );
}

function useCounter(val, step) {
  const [count, setCount] = useState(val);
  function tambah() {
    setCount(count + step);
  }
  function kurang() {
    if (count > 1) {
      setCount(count - step);
    }
  }
  return [count, tambah, kurang];
}
