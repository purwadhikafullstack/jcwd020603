import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Image,
  Input,
  Icon,
  Textarea,
  Center,
  Select,
  Avatar,
  InputGroup,
  InputRightElement,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { api } from "../api/api";
import { useDispatch } from "react-redux";
import { MdArrowBack, MdOutlineLocationOn } from "react-icons/md";
import { TbPhotoSearch } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";

export function AddCategory(props) {
  const [selectedFile, setSelectedFile] = useState(null);

  //menyimpan file gambar yang dipilih
  const [imgUrl, setImgUrl] = useState();
  const [category, setCategory] = useState("");
  const toast = useToast();
  const inputFileRef = useRef(null);
  const handleFile = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);

    //buat ngemunculin gambar--
    const reader = new FileReader();
    reader.onload = () => {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
    //-------------------------
  };
  const inputHandler = (e) => {
    const { value } = e.target;
    setCategory(value);
  };

  const categoryImage = async () => {
    if (!selectedFile || !category) {
      toast({
        title: "Error",
        description: "Pastikan Form Gambar / Nama Kategori sudah diisi",
        status: "warning",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("categoryImg", selectedFile);
    formData.append("category_name", category);

    try {
      await api()
        .post("/category/v1", formData)
        .then((result) => {});
      toast({
        title: "Success",
        description: "Kategori baru berhasil dibuat",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      setSelectedFile(null);
      setCategory("");
      props.onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Kategori baru gagal dibuat",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setCategory("");
    props.onClose();
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Kategori Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              w={"100%"}
              h={"100%"}
              justifyContent={"center"}
              flexDir={"column"}
            >
              <Center w={"100%"} h={"100%"}>
                {selectedFile ? (
                  <Flex flexDir={"column"}>
                    <Image
                      src={imgUrl}
                      w={"100%"}
                      h={"450px"}
                      objectFit={"contain"}
                    />
                    <Button
                      bg={"#0095f6"}
                      color={"white"}
                      onClick={() => inputFileRef.current.click()}
                      onChange={handleFile}
                    >
                      Select from computer
                    </Button>
                    <Input
                      accept="image/png,image/jpeg"
                      type="file"
                      ref={inputFileRef}
                      onChange={handleFile}
                      display={"none"}
                    />
                  </Flex>
                ) : (
                  <Flex flexDir={"column"}>
                    <Icon as={TbPhotoSearch} fontSize={"100px"} />
                    <Button
                      bg={"#0095f6"}
                      color={"white"}
                      onClick={() => inputFileRef.current.click()}
                      onChange={handleFile}
                    >
                      Select from computer
                    </Button>
                    <Input
                      accept="image/png,image/jpeg"
                      type="file"
                      ref={inputFileRef}
                      onChange={handleFile}
                      display={"none"}
                    />
                  </Flex>
                )}
              </Center>
              <Input
                height="50px"
                placeholder="Category Name"
                borderRadius="5px"
                value={category}
                onChange={inputHandler}
              />
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              variant="ghost"
              colorScheme="green"
              onClick={() => {
                categoryImage();
                props.fetchDataCategory();
              }}
            >
              Save
            </Button>
            <Button variant="ghost" colorScheme="red" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
