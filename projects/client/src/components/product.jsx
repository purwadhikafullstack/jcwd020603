import { Flex, Grid } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { SearchBar } from "./searchBar";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { CardProduct } from "./cardProduct";
import { useLocation } from "react-router-dom";

export default function Product() {
  const searchResults = useSelector((state) => state.search);
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [stocks, setStocks] = useState([]);

  const [productSearchResults, setProductSearchResults] = useState([]);

  const performSearch = (searchTerm) => {
    api
      .get("/stock/search", {
        params: {
          search_query: searchTerm,
        },
      })
      .then((response) => {
        setProductSearchResults(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const combinedSearchResults = [...searchResults, ...productSearchResults];

  return (
    <>
      <Flex id="baseContainerB">
        <SearchBar
          onSearch={performSearch}
          productSearchResults={productSearchResults}
        />
        <Flex id="headB" paddingTop={"20px"}></Flex>
        <Grid id="productB">
          {combinedSearchResults.map((val, idx) => (
            <CardProduct
              key={val.Product.id}
              url={val.Product.photo_product_url}
              product_name={val.Product.product_name}
              price={val.Product.price}
              desc={val.Product.desc}
              discount={val.discount}
            />
          ))}
        </Grid>
      </Flex>
    </>
  );
}
