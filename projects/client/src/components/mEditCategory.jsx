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
  Image,
  Input,
  Icon,
  Center,
} from "@chakra-ui/react";
import { api } from "../api/api";
import { useDispatch } from "react-redux";
import { MdArrowBack, MdOutlineLocationOn } from "react-icons/md";
import { TbPhotoSearch } from "react-icons/tb";
import { useState, useRef, useEffect } from "react";

export function EditCategory(props) {
  const [selectedFile, setSelectedFile] = useState(null);

  const [imgUrl, setImgUrl] = useState(props.category.photo_category_url);
  const [category, setCategory] = useState(props.category.category_name);

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
    const formData = new FormData();
    if (selectedFile) {
      formData.append("categoryImg", selectedFile);
    }
    formData.append("category_name", category);

    try {
      console.log(formData);
      await api()
        .patch("/category/v2/" + props.id, formData)
        .then((result) => {
          console.log(result.data);
        });
      alert("Posting success");
      setSelectedFile(null);
      setCategory("");
      props.onClose();
    } catch (error) {
      console.error(error);
      alert("Posting failed");
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
          <ModalHeader>Edit Kategori</ModalHeader>
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
                    <Image
                      src={imgUrl}
                      w={"100%"}
                      h={"300px"}
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
                props.fetchData();
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
