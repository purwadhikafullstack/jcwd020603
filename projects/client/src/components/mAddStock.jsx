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
  Input,
  Select,
  Icon,
  Center,
  Image,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { api } from "../api/api";
import { useState, useRef, useEffect } from "react";
import { TbPhotoSearch } from "react-icons/tb";
import { useSelector } from "react-redux";

export function AddStock(props) {
  const { selectedOption, setSelectedOption } = useState("");
  const userSelector = useSelector((state) => state.auth);
  const toast = useToast();
  const [stock, setStock] = useState({
    branch_id: userSelector.branch_id,
    product_id: "",
    quantity_stock: "",
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempStock = { ...stock };
    tempStock[id] = value;
    setStock(tempStock);
  };

  const addStock = async () => {
    if (!stock) {
      toast({
        title: "Error",
        description: "Please input a stock details",
        status: "warning",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      await api()
        .post("/stock/v1", stock)
        .then((result) => {});
      props.fetchData();
      toast({
        title: "Success",
        description: "Stok berhasil ditambahkan",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      props.onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Stok gagal ditambahkan",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleClose = () => {
    setStock("");
    props.onClose();
  };

  const [product, setProduct] = useState([]);
  useEffect(() => {
    api()
      .get("/product")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [dataProduct, setDataProduct] = useState([]);
  useEffect(() => {
    api()
      .get("/product/" + stock.product_id)
      .then((response) => {
        setDataProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [stock]);

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Stock Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex className="containerAddProduct">
              <Center w={"100%"} h={"100%"}>
                {dataProduct ? (
                  <Flex flexDir={"column"}>
                    <Image
                      src={dataProduct.photo_product_url}
                      // w={"100%"}
                      h={"200px"}
                      objectFit={"contain"}
                    />
                    <Select
                      className="inputAddProduct"
                      value={selectedOption}
                      id="product_id"
                      onClick={inputHandler}
                      placeholder="Produk"
                    >
                      {product.map((product) => (
                        <option key={product.id} value={`${product.id}`}>
                          {product.product_name}
                        </option>
                      ))}
                    </Select>
                    <Input
                      className="inputAddProduct"
                      placeholder="Jumlah Stock"
                      id="quantity_stock"
                      onChange={inputHandler}
                    />
                  </Flex>
                ) : (
                  <Flex flexDir={"column"}>
                    <Icon as={TbPhotoSearch} fontSize={"100px"} />
                    <Select
                      className="inputAddProduct"
                      value={selectedOption}
                      id="product_id"
                      onClick={inputHandler}
                      placeholder="Produk"
                    >
                      {product.map((product) => (
                        <option key={product.id} value={`${product.id}`}>
                          {product.product_name}
                        </option>
                      ))}
                    </Select>
                    <Input
                      className="inputAddProduct"
                      placeholder="Jumlah Stock"
                      id="quantity_stock"
                      onChange={inputHandler}
                    />
                  </Flex>
                )}
              </Center>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              variant="ghost"
              colorScheme="green"
              onClick={() => {
                addStock();
                // props.fetchData();
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
