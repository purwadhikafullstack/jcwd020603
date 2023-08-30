import { Center, Flex, Icon, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { api } from "../api/api";

export default function VoucherPromo(props) {
  const { totalBelanja, setGetVoucher, nearestBranch } = props;
  const [inputCode, setInputCode] = useState("");
  // klik 'Pakai Kode Voucher'
  const [isClicked, setIsClicked] = useState(false);
  //get all voucher
  const [voucher, setVoucher] = useState([]);
  const fetchAll = async () => {
    try {
      const fetch = await api().get("/voucher", {
        params: { branch_id: nearestBranch },
      });
      setVoucher(fetch.data.result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAll();
  }, []);
  //voucher status
  const [voucherStatus, setVoucherStatus] = useState(null);
  const [voucherUse, setVoucherUse] = useState({});
  const handleVoucherStatus = () => {
    const voucherMatch = voucher.find((val) => val.voucher_code === inputCode);
    if (voucherMatch) {
      const total = totalBelanja.length
        ? totalBelanja.reduce((a, b) => a + b)
        : 0;
      const minTransaction = voucherMatch?.minimal_order <= total;
      if (minTransaction && voucherMatch?.limit != 0) {
        setVoucherStatus("found");
        setVoucherUse(voucherMatch);
      } else if (minTransaction && voucherMatch?.limit == 0) {
        setVoucherStatus("run out");
        setVoucherUse({});
      } else if (!minTransaction) {
        setVoucherStatus("not eligible");
        setVoucherUse({});
      }
    } else {
      setVoucherStatus("not found");
      setVoucherUse({});
    }
  };
  useEffect(() => {
    setGetVoucher(voucherUse);
  }, [voucherUse]);

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
            <>
              <Flex
                w={"100%"}
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
                _hover={{ cursor: "pointer" }}
              >
                PAKAI KODE VOUCHER / PROMO
              </Flex>
            </>
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
                  maxH={"350px"}
                  overflowY={"scroll"}
                  css={{
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {voucher.map((val) => {
                    return (
                      <>
                        <Flex flexDir={"column"} alignItems={"start"}>
                          {val.title}
                          <Flex fontSize={"10px"} fontWeight={"200"}>
                            {val.desc}
                          </Flex>
                          <Flex fontSize={"10px"} fontWeight={"200"}>
                            Min Transaksi: Rp{" "}
                            {val?.minimal_order.toLocaleString("id-ID")}
                          </Flex>
                          <Flex fontSize={"10px"} fontWeight={"400"}>
                            CODE: {val.voucher_code}
                          </Flex>
                        </Flex>
                      </>
                    );
                  })}
                </Flex>
                <Flex w={"60%"} flexDir={"column"}>
                  <Flex
                    gap={"10px"}
                    padding={"0px 10px 10px 10px"}
                    alignItems={"end"}
                    flexDir={"column"}
                  >
                    <Input
                      className="inputVoucher"
                      placeholder="Kode Promo"
                      fontSize={"12px"}
                      onChange={(e) =>
                        setInputCode(e.target.value.toUpperCase())
                      }
                      style={{ textTransform: "uppercase" }}
                    ></Input>
                    <Center
                      className="tombolPakai"
                      _hover={{ cursor: "pointer" }}
                      onClick={() => {
                        handleVoucherStatus();
                      }}
                    >
                      PAKAI
                    </Center>
                  </Flex>
                  {voucherStatus === "not eligible" && (
                    <Flex
                      color={"red"}
                      fontSize={"10px"}
                      fontWeight={"500"}
                      padding={"0px 10px"}
                    >
                      Total Transaksi Tidak Memenuhi!
                    </Flex>
                  )}
                  {voucherStatus === "run out" && (
                    <Flex
                      color={"red"}
                      fontSize={"10px"}
                      fontWeight={"500"}
                      padding={"0px 10px"}
                    >
                      Voucher sudah habis
                    </Flex>
                  )}
                  {voucherStatus == "found" && (
                    <Flex
                      color={"#2A960C"}
                      fontSize={"10px"}
                      fontWeight={"500"}
                      padding={"0px 10px"}
                    >
                      Voucher Berhasil Digunakan!
                    </Flex>
                  )}
                  {voucherStatus == "not found" && (
                    <Flex
                      color={"red"}
                      fontSize={"10px"}
                      fontWeight={"500"}
                      padding={"0px 10px"}
                    >
                      Voucher Tidak Terdaftar
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
}
