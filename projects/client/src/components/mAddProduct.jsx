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
import { TbPhotoSearch } from "react-icons/tb";
import { useState, useRef, useEffect } from "react";

export function AddProduct(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const { selectedOption, setSelectedOption } = useState("");
  const [imgUrl, setImgUrl] = useState();

  const [product, setProduct] = useState({
    product_name: "",
    price: "",
    category_id: "",
    weight: "",
    desc: "",
  });

  const inputFileRef = useRef(null);
  const handleFile = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempProduct = { ...product };
    tempProduct[id] = value;
    setProduct(tempProduct);
    console.log(tempProduct);
  };

  const productImage = async () => {
    if (!selectedFile || !product) {
      alert("Please select an image and enter a product desc.");
      return;
    }
    console.log(product);
    const formData = new FormData();
    formData.append("productImg", selectedFile);
    formData.append("product_name", product.product_name);
    formData.append("price", product.price);
    formData.append("category_id", product.category_id);
    formData.append("desc", product.desc);
    formData.append("weight", product.weight);

    try {
      console.log(formData);
      await api()
        .post("/product/v1", formData)
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
    api()
      .get("/category/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Produk Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex className="containerAddProduct">
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
                className="inputAddProduct"
                placeholder="Nama Produk"
                id="product_name"
                onChange={inputHandler}
              />
              <Input
                className="inputAddProduct"
                placeholder="Harga Produk"
                id="price"
                onChange={inputHandler}
              />
              <Select
                className="inputAddProduct"
                value={selectedOption}
                id="category_id"
                onClick={inputHandler}
                placeholder="Kategori"
              >
                {categories.map((category) => (
                  <option key={category.id} value={`${category.id}`}>
                    {category.category_name}
                  </option>
                ))}
              </Select>
              <Input
                className="inputAddProduct"
                placeholder="Deskripsi Produk"
                id="desc"
                onChange={inputHandler}
              />
              <Input
                className="inputAddProduct"
                placeholder="Berat Total"
                id="weight"
                onChange={inputHandler}
              />
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              variant="ghost"
              colorScheme="green"
              onClick={() => {
                productImage();
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
