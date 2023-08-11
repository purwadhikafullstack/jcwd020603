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

export function EditStock(props) {
  const { selectedOption, setSelectedOption } = useState("");
  const [stock, setStock] = useState({
    quantity_stock: "",
    discount: "",
  });

  console.log(stock);

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempStock = { ...stock };
    tempStock[id] = value;
    setStock(tempStock);
    console.log(tempStock);
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
    api
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
    api
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
              <Flex>Diskon</Flex>
              <Input
                className="inputAddProduct"
                placeholder="Diskon"
                id="discount"
                defaultValue={props.stock.discount}
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
