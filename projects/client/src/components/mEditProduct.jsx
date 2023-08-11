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
  Select,
} from "@chakra-ui/react";
import { api } from "../api/api";
import { useDispatch } from "react-redux";
import { MdArrowBack, MdOutlineLocationOn } from "react-icons/md";
import { TbPhotoSearch } from "react-icons/tb";
import { useState, useRef, useEffect } from "react";

export function EditProduct(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const { selectedOption, setSelectedOption } = useState("");
  const [imgUrl, setImgUrl] = useState(props.product.photo_product_url);
  const [product, setProduct] = useState({
    product_name: "",
    price: "",
    category_id: "",
    weight: "",
    desc: "",
  });

  console.log(product);

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
    const { id, value } = e.target;
    const tempProduct = { ...product };
    tempProduct[id] = value;
    setProduct(tempProduct);
    console.log(tempProduct);
  };

  const categoryImage = async () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("productImg", selectedFile);
    }
    formData.append("product_name", product.product_name);
    formData.append("price", product.price);
    formData.append("category_id", product.category_id);
    formData.append("desc", product.desc);
    formData.append("weight", product.weight);

    try {
      console.log(formData);
      await api()
        .patch("/product/v2/" + props.id, formData)
        .then((result) => {
          console.log(result.data);
        });
      alert("Posting success");
      setSelectedFile(null);
      setProduct("");
      props.onClose();
    } catch (error) {
      console.error(error);
      alert("Posting failed");
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setProduct("");
    props.onClose();
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/category/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getCategoryName = (x) => {
    const category = categories.find((y) => y.id === x);
    return category ? category.category_name : "";
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Produk</ModalHeader>
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
                borderRadius="5px"
                placeholder="Nama Produk"
                id="product_name"
                defaultValue={props.product.product_name}
                onChange={inputHandler}
              />
              <Input
                height="50px"
                borderRadius="5px"
                placeholder="Harga Produk"
                id="price"
                defaultValue={props.product.price}
                onChange={inputHandler}
              />
              <Select
                value={selectedOption}
                id="category_id"
                onClick={inputHandler}
                defaultValue={props.product.category_id}
              >
                {categories.map((category) => (
                  <option key={category.id} value={`${category.id}`}>
                    {category.category_name}
                  </option>
                ))}
              </Select>
              <Input
                height="50px"
                borderRadius="5px"
                placeholder="Deskripsi Produk"
                id="desc"
                defaultValue={props.product.desc}
                onChange={inputHandler}
              />
              <Input
                height="50px"
                borderRadius="5px"
                placeholder="Berat Total"
                id="weight"
                defaultValue={props.product.weight}
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
