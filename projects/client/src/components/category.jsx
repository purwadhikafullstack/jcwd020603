import { useState, useEffect } from "react";
import { Flex, Center, Grid, Image, Box, Icon } from "@chakra-ui/react";
import "../css/indexB.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CardProduct } from "./cardProduct";
import { CardCategory } from "./cardCategory";
import { CardCarousel } from "./cardCarousel";
import { SearchBar } from "./searchBar";
import { api } from "../api/api";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../redux/searchAction";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const performSearch = (searchTerm) => {
    const searchResults = stocks.filter((val) =>
      val.Product.product_name.includes(searchTerm)
    );
    dispatch(setSearchResults(searchResults));
  };

  useEffect(() => {
    api
      .get("/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    api
      .get("/stock")
      .then((response) => {
        setStocks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Mengambil searchTerm dari local storage jika tersedia
    const storedSearchTerm = localStorage.getItem("searchTerm");
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
  }, []);

  // Menyimpan searchTerm ke local storage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  return (
    <>
      <Flex id="baseContainerB">
        <SearchBar onSearch={performSearch} />
        <Flex id="headB" paddingTop={"20px"}>
          KATEGORI
        </Flex>
        <Flex id="bgCategoryB">
          <Flex id="categoryB">
            {categories.map((val) => (
              <CardCategory
                photo_category_url={val.photo_category_url}
                category_name={val.category_name}
              />
            ))}
          </Flex>
        </Flex>
        <Flex id="carouselB">
          <Carousel autoPlay interval={3000} infiniteLoop>
            {categories.map((val) => (
              <CardCarousel
                photo_category_url={val.photo_category_url}
                key={val.url}
              />
            ))}
          </Carousel>
        </Flex>
        <Flex id="headB">PRODUK</Flex>
        <Grid id="productB">
          {stocks.map((val, idx) => (
            <CardProduct
              key={val.Product.id}
              id={val.product_id}
              url={val.Product?.photo_product_url}
              product_name={val.Product?.product_name}
              price={val.Product?.price}
              desc={val.Product?.desc}
              discount={val.Discount?.nominal}
              weight={val.Product?.weight}
              stock_id={val.id}
            />
          ))}
        </Grid>
      </Flex>
    </>
  );
}
