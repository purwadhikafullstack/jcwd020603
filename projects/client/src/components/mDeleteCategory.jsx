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

export function DeleteCategory(props) {
  const toast = useToast();
  console.log(props);
  const deleteCategory = async () => {
    await api.delete("/category/v3/" + props.id);
    toast({
      title: "Category Deleted",
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
            Apakah anda yakin akan menghapus kategori{" "}
            {`${props.category.category_name}`}?
          </ModalBody>
          <ModalFooter gap={5}>
            <Button onClick={props.onClose} colorScheme="yellow">
              Cancel
            </Button>
            <Button onClick={deleteCategory} colorScheme="red">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
