import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ModalAlamatPengiriman(props) {
  const { selectedAddress } = props;
  const nav = useNavigate();

  return (
    <>
      <Flex padding={"20px"} flexDir={"column"} rowGap={"20px"}>
        <Flex flexDir={"column"} rowGap={"10px"}>
          <Flex fontWeight={"600"}>Pastikan alamat pengiriman sudah benar</Flex>
          <Flex w={"100%"} fontSize={"12px"} fontWeight={"500"}>
            {selectedAddress.address_name} | {selectedAddress.address_phone}
          </Flex>
          <Flex w={"100%"} fontSize={"12px"} flexDir={"column"}>
            <Flex>
              {selectedAddress.address}, {selectedAddress.district}
            </Flex>
            <Flex>
              {selectedAddress.City?.city_name},{" "}
              {selectedAddress.City?.postal_code}
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent={"right"} gap={"20px"}>
          <Button
            color={"grey"}
            onClick={() => {
              nav("/address");
              props.onClose();
            }}
          >
            UBAH ALAMAT
          </Button>
          <Button
            color="green"
            bg={"#BBDEBD"}
            onClick={() => {
              nav("/cart");
              props.onClose();
            }}
          >
            BENAR
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
