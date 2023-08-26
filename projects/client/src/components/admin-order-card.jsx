import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { useNavigate } from "react-router";

export default function AdminOrderCard(props) {
  const { val } = props;
  const nav = useNavigate();
  return (
    <>
      <Flex
        w={"100%"}
        maxW={"600px"}
        bg={"white"}
        border={"2px solid grey"}
        borderRadius={"15px"}
        flexDir={"column"}
      >
        <Flex
          gap={"10px"}
          fontSize={"16px"}
          padding={"10px"}
          borderBottom={"2px solid grey"}
          bg={"#ffb21c"}
          borderTopRadius={"14px"}
        >
          <Flex minW={"70px"}>No Order </Flex>
          <Flex fontWeight={"700"}> {val.order_number}</Flex>
        </Flex>
        <Flex
          gap={"10px"}
          fontSize={"14px"}
          padding={"10px"}
          flexDir={"column"}
        >
          <Flex gap={"10px"}>
            <Flex minW={"50px"}>Nama</Flex>
            <Flex fontWeight={"700"}>: {val.User?.user_name}</Flex>
          </Flex>
          <Flex gap={"10px"}>
            <Flex minW={"50px"}>Status</Flex>
            <Flex fontWeight={"700"}>: {val.status}</Flex>
          </Flex>
          <Flex gap={"10px"}>
            <Flex minW={"50px"}>Tanggal</Flex>
            <Flex fontWeight={"700"}>: {val.createdAt}</Flex>
          </Flex>
          <Flex gap={"10px"}>
            <Flex minW={"50px"}>Total</Flex>
            <Flex fontWeight={"700"}>
              : Rp {val.total?.toLocaleString("id-ID")}
            </Flex>
          </Flex>
        </Flex>
        <Flex padding={"10px"}>
          <Button
            bg={"#fff7e7"}
            border={"2px solid grey"}
            onClick={() => {
              nav(`/admin/orders/${val.order_number}`);
            }}
          >
            Detail Pesanan
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
