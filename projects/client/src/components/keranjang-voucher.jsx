import { Center, Flex, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

export default function VoucherPromo() {
  //klik 'Pakai Kode Voucher'
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
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
        <Flex w={"100%"} padding={"20px"} flexDir={"column"} rowGap={"20px"}>
          <Flex w={"100%"} alignItems={"center"}>
            <Flex color={"#626467"} fontWeight={"600"} fontSize={"20px"}>
              Voucher & Promo
            </Flex>
          </Flex>
          {!isClicked ? (
            <Flex
              h={"30px"}
              bg={"#EAF4E7"}
              color={"#2A960C"}
              fontSize={"10px"}
              fontWeight={"600"}
              alignItems={"center"}
              padding={"10px"}
              letterSpacing={"2px"}
              borderRadius={"5px"}
              onClick={() => {
                setIsClicked(true);
              }}
            >
              PAKAI KODE VOUCHER / PROMO
            </Flex>
          ) : (
            <>
              <Flex className="voucherFontRes">
                <Icon
                  as={RxCross2}
                  fontSize={"18px"}
                  color={"#626467"}
                  onClick={() => {
                    setIsClicked(false);
                  }}
                />
                <Flex
                  w={"40%"}
                  color={"#2A960C"}
                  flexDir={"column"}
                  paddingLeft={"20px"}
                  gap={"10px"}
                >
                  <Flex flexDir={"column"}>
                    GRATISONGKIR
                    <Flex fontSize={"10px"} fontWeight={"200"}>
                      Gratis biaya pengiriman!
                    </Flex>
                  </Flex>
                  <Flex flexDir={"column"}>
                    DISKON10%
                    <Flex fontSize={"10px"} fontWeight={"200"}>
                      Potongan Harga 10%!
                    </Flex>
                  </Flex>
                  <Flex flexDir={"column"}>
                    DISKON20%
                    <Flex fontSize={"10px"} fontWeight={"200"}>
                      Potongan Harga 20%!
                    </Flex>
                  </Flex>
                </Flex>
                <Flex w={"60%"} flexDir={"column"}>
                  <Flex
                    gap={"10px"}
                    padding={"0px 10px 10px 10px"}
                    alignItems={"center"}
                  >
                    <Input
                      className="inputVoucher"
                      placeholder="Kode Promo"
                    ></Input>
                    <Center className="tombolPakai">PAKAI</Center>
                  </Flex>
                  <Flex
                    color={"#2A960C"}
                    fontSize={"10px"}
                    fontWeight={"500"}
                    padding={"0px 10px"}
                  >
                    Voucher Berhasil Digunakan!
                  </Flex>
                  <Flex
                    color={"red"}
                    fontSize={"10px"}
                    fontWeight={"500"}
                    padding={"0px 10px"}
                  >
                    Voucher Tidak Terdaftar
                  </Flex>
                </Flex>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
}
