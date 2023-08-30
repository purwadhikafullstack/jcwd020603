import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useEffect } from "react";

export default function ModalPesananSelesai(props) {
  const { peraturan, orderId } = props;
  const nav = useNavigate();
  const input = { status: "Pesanan Dikonfirmasi" };
  const id = peraturan?.id || orderId?.id;
  const order_number = peraturan?.order_number || orderId?.order_number;
  const changeStatus = async () => {
    try {
      const update = await api().patch(`/order/confirm/${id}`, input);
      props.getOrders && props.getOrders();
      props.getLatestOrder && props.getLatestOrder();
      props.onClose();
      return nav(`/orders/${order_number}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Flex padding={"20px"} flexDir={"column"} rowGap={"20px"}>
        <Flex fontWeight={"600"}>
          Klik Selesai untuk menyelesaikan pesanan, pastikan barang yang kamu
          terima sudah benar.
        </Flex>
        <Flex justifyContent={"right"} gap={"20px"}>
          <Button
            color={"grey"}
            onClick={() => {
              props.onClose();
            }}
          >
            Tidak
          </Button>
          <Button color="green" bg={"#BBDEBD"} onClick={changeStatus}>
            Selesai
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
