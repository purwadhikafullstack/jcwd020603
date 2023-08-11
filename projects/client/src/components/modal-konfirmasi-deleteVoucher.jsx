import { Button, Flex, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function ModalKonfirmasiDeleteVoucher(props) {
  const nav = useNavigate();
  const toast = useToast();
  console.log(props.dtVocer);
  console.log(props.dtVocer[props.numberIdx]);
  const id = props.dtVocer[props.numberIdx].id;

  const handleDelete = async () => {
    await api()
      .delete("/voucher/", { data: { id: id } })
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
          {props.dtVocer[props.numberIdx].title}" ??
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
