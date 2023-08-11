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

export function DeleteStock(props) {
  const toast = useToast();
  console.log(props);
  const deleteStock = async () => {
    await api().delete("/stock/v3/" + props.id);
    toast({
      title: "Stock Deleted",
      status: "success",
      position: "top-right",
      duration: 3000,
      isClosable: false,
    });
    props.onClose();
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
