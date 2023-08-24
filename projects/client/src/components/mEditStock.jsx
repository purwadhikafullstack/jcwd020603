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
} from "@chakra-ui/react";
import { api } from "../api/api";
import { useState, useRef, useEffect } from "react";

export function EditStock(props) {
  const { selectedOption, setSelectedOption } = useState("");
  const [stock, setStock] = useState({
    quantity_before: props.stock.quantity_stock,
    status: "",
    quantity_stock: "",
    status_quantity: "",
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempStock = { ...stock };
    tempStock[id] = value;

    if (tempStock.quantity_before > value) {
      tempStock.status_quantity = tempStock.quantity_before - value;
      tempStock.status = "DECREMENT";
    } else {
      tempStock.status_quantity = value - tempStock.quantity_before;
      tempStock.status = "INCREMENT";
    }

    setStock(tempStock);
  };

  const editStock = async () => {
    try {
      console.log(stock);
      await api()
        .patch("/stock/v2/" + props.id, stock)
        .then((result) => {
          console.log(result.data);
        });
      alert("Posting success");
      props.onClose();
    } catch (error) {
      console.error(error);
      alert("Posting failed");
    }
  };

  const handleClose = () => {
    setStock("");
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

  const getCategoryName = (x) => {
    const category = categories.find((y) => y.id === x);
    return category ? category.category_name : "";
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Stock</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex className="containerAddProduct">
              <Flex
                fontSize={"20"}
                fontWeight={"medium"}
                className="inputAddProduct"
              >
                {props.stock.Product.product_name}
              </Flex>
              <Flex>Jumlah Stock</Flex>
              <Input
                className="inputAddProduct"
                placeholder="Jumlah Stock"
                id="quantity_stock"
                defaultValue={props.stock.quantity_stock}
                onChange={inputHandler}
              />
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              variant="ghost"
              colorScheme="green"
              onClick={() => {
                editStock();
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
