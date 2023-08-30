import { Flex, Icon, Image, Spinner } from "@chakra-ui/react";
import { BiRadioCircle, BiRadioCircleMarked } from "react-icons/bi";
import logo_jne from "../assets/logo_jne.png";
import logo_tiki from "../assets/logo_tiki.png";
import logo_pos from "../assets/logo_pos.png";
import { useState } from "react";

export default function MetodePengiriman({
  setCourier,
  shipCost,
  isLoading,
  setIsLoading,
  setCost,
  cost,
  setCourierName,
}) {
  //mendapatkan courier
  const [Clicked, setClicked] = useState("");
  const handleClick = (e) => {
    setIsLoading(true);
    setClicked(e.currentTarget.id);
    setCourier(e.currentTarget.id);
    setCost({});
  };
  //mendapatkan biaya
  const handleCost = (idx) => {
    setCost(shipCost[idx]);
  };
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
        <Flex
          w={"100%"}
          padding={"20px"}
          flexDir={"column"}
          rowGap={"20px"}
          alignItems={"center"}
        >
          <Flex
            color={"#626467"}
            fontWeight={"600"}
            fontSize={"20px"}
            w={"100%"}
            alignItems={"center"}
          >
            Metode Pengiriman
          </Flex>
          <Flex w={"100%"} flexDir={"column"}>
            <Flex
              w={"100%"}
              padding={"10px 0px"}
              gap={"20px"}
              borderBottom={"1px solid lightgrey"}
              id="jne"
              onClick={(e) => handleClick(e)}
            >
              <Icon
                _hover={{ cursor: "pointer" }}
                as={Clicked == "jne" ? BiRadioCircleMarked : BiRadioCircle}
                fontSize={"35px"}
                color={"#2A960C"}
              />
              <Flex w={"52px"} h={"32px"} borderRadius={"5px"}>
                <Image src={logo_jne} w={"100%"} h={"100%"} />
              </Flex>
              <Flex alignItems={"center"} fontWeight={"500"} fontSize={"14px"}>
                Jalur Nugraha Ekakurir (JNE)
              </Flex>
            </Flex>
            <Flex
              w={"100%"}
              padding={"10px 0px"}
              gap={"20px"}
              borderBottom={"1px solid lightgrey"}
              id="pos"
              onClick={(e) => handleClick(e)}
            >
              <Icon
                _hover={{ cursor: "pointer" }}
                as={Clicked == "pos" ? BiRadioCircleMarked : BiRadioCircle}
                fontSize={"35px"}
                color={"#2A960C"}
              />
              <Flex w={"52px"} h={"32px"} borderRadius={"5px"}>
                <Image src={logo_pos} w={"100%"} h={"100%"} />
              </Flex>
              <Flex alignItems={"center"} fontWeight={"500"} fontSize={"14px"}>
                Pos Indonesia
              </Flex>
            </Flex>
            <Flex
              w={"100%"}
              padding={"10px 0px"}
              gap={"20px"}
              borderBottom={"1px solid lightgrey"}
              id="tiki"
              onClick={(e) => handleClick(e)}
            >
              <Icon
                _hover={{ cursor: "pointer" }}
                as={Clicked == "tiki" ? BiRadioCircleMarked : BiRadioCircle}
                fontSize={"35px"}
                color={"#2A960C"}
              />
              <Flex w={"52px"} h={"32px"} borderRadius={"5px"}>
                <Image src={logo_tiki} w={"100%"} h={"100%"} />
              </Flex>
              <Flex alignItems={"center"} fontWeight={"500"} fontSize={"14px"}>
                Titipan Kilat (TIKI)
              </Flex>
            </Flex>
          </Flex>
          {shipCost.length ? (
            <Flex w={"100%"} flexDir={"column"} rowGap={"10px"}>
              <Flex fontSize={"14px"}>Ongkos Kirim</Flex>
              {isLoading ? (
                <Spinner />
              ) : (
                shipCost.map((val, idx) => {
                  return (
                    <>
                      <Flex
                        fontSize={"12px"}
                        alignItems={"center"}
                        gap={"10px"}
                        id={idx}
                        onClick={(e) => handleCost(e.target.id)}
                      >
                        <Icon
                          values={val}
                          id={idx}
                          onClick={(e) => handleCost(e.target.id)}
                          _hover={{ cursor: "pointer" }}
                          as={
                            cost?.service == val?.service
                              ? BiRadioCircleMarked
                              : BiRadioCircle
                          }
                          fontSize={"20px"}
                          color={"#2A960C"}
                        />
                        {val.description} : Rp{" "}
                        {val.cost[0].value.toLocaleString("id-ID")}
                      </Flex>
                    </>
                  );
                })
              )}
            </Flex>
          ) : null}
        </Flex>
      </Flex>
    </>
  );
}
