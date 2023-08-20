import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { api } from "../api/api";
import { useState } from "react";

export function DeleteStock(props) {
  const toast = useToast();
  const [stock, setStock] = useState({
    quantity_before: props.stock.quantity_stock,
  });

  const deleteStock = async () => {
    try {
      await api()
        .delete("/stock/v3/" + props.id, { params: stock })
        .then((result) => {
          console.log(result.data);
        });
      toast({
        title: "Stock Deleted",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: false,
      });
      props.onClose();
    } catch (error) {
      console.error(error);
      alert("Deleting Failed");
    }
  };

  return (
    <>
      <Modal onClose={props.onClose} size={"xs"} isOpen={props.isOpen}>
        <ModalOverlay />
        <ModalContent mt={"300px"}>
          <ModalHeader>Konfirmasi Hapus Data </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Apakah anda yakin akan menghapus stock{" "}
            {`${props.stock.Product.product_name}`}?
          </ModalBody>
          <ModalFooter gap={5}>
            <Button onClick={props.onClose} colorScheme="yellow">
              Cancel
            </Button>
            <Button onClick={deleteStock} colorScheme="red">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
