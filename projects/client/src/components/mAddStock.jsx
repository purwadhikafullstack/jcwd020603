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
} from "@chakra-ui/react";
import { api } from "../api/api";
import { useState, useRef, useEffect } from "react";
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

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Stock Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex className="containerAddProduct">
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
