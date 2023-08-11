import { Button, Flex, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function ModalKonfirmasiDeletDiscount(props) {
  const nav = useNavigate();
  const toast = useToast();
  console.log(props.dtDis);
  console.log(props.dtDis[props.numberIdx]);
  const discount_id = props.dtDis[props.numberIdx].id;

  const handleDelete = async () => {
    await api()
      .delete("/discount/", { data: { discount_id: discount_id } })
      .then((res) => {
        toast({
          title: "Discount berhasil dihapus",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      });
    props.fetchAll();
    props.onClose().catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <Flex padding={"20px"} flexDir={"column"} rowGap={"20px"}>
        <Flex fontWeight={"600"}>
          Apakah Anda yakin ingin menghapus Diskon : "
          {props.dtDis[props.numberIdx].title}" ??
        </Flex>
        <Flex justifyContent={"right"} gap={"20px"}>
          <Button
            color={"grey"}
            onClick={() => {
              props.onClose();
            }}
          >
            TIDAK
          </Button>
          <Button
            bg={" #f7d1d5"}
            color={"red"}
            onClick={() => {
              handleDelete();
            }}
          >
            YA
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
