import { Button, Flex, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function ModalKonfirmasiDeletAdmin(props) {
  const nav = useNavigate();
  const toast = useToast();

  console.log(props.dtBranch[props.number].branch_id);
  const branch_id = props.dtBranch[props.number];
  const handleDelete = async (branch_id) => {
    await api()
      .delete("/branch/", {
        data: { branch_id: props.dtBranch[props.number].branch_id },
      })
      .then((res) => {
        toast({
          title: "Admin dan Cabang berhasil dihapus",
          status: "success",
          position: "top",
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
          Apakah Anda yakin ingin menghapus data Admin : "
          {props.dtBranch[props.number].user_name}" dan Branch : "
          {props.dtBranch[props.number].Branch.branch_name}" ??
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
          <Button bg={" #f7d1d5"} color={"red"} onClick={handleDelete}>
            YA
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
