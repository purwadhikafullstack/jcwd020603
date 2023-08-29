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
} from "@chakra-ui/react";
import { api } from "../api/api";
import { useState, useRef, useEffect } from "react";
import { TbPhotoSearch } from "react-icons/tb";
import { useSelector } from "react-redux";

export function AddStock(props) {
  const { selectedOption, setSelectedOption } = useState("");
  const userSelector = useSelector((state) => state.auth);

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
    console.log(tempStock);
  };

  const addStock = async () => {
    if (!stock) {
      alert("Please input a stock details");
      return;
    }
    console.log(stock);
    try {
      await api()
        .post("/stock/v1", stock)
        .then((result) => {
          console.log(result.data);
        });
      alert("Posting success");
      props.onClose();
    } catch (error) {
      console.log(error);
      alert("Posting failed");
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

  console.log("ini produkk", dataProduct.product_name);
  console.log("ini produkk", dataProduct);

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
