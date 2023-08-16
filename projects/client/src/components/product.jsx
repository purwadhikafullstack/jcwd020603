import { Flex, Grid } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { SearchBar } from "./searchBar";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { CardProduct } from "./cardProduct";
import { useLocation } from "react-router-dom";
import { CardCategory } from "./cardCategory";

export default function Product() {
  const searchResults = useSelector((state) => state.search);
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [stocks, setStocks] = useState([]);

  const category_name = location.state?.category_name;
  const nearestBranch = location.state?.nearestBranch;

  console.log("ini nearestBranch ProductPage", nearestBranch);

  const [productSearchResults, setProductSearchResults] = useState([]);

  const performSearch = (searchTerm) => {
    api()
      .get("/stock/search", {
        params: {
          search_query: searchTerm,
          // branch_id:
        },
      })
      .then((response) => {
        setProductSearchResults(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getCategory = async () => {
    console.log(category_name);
    await api()
      .get("/stock/s-category", { params: { category_name } })
      .then((response) => {
        setProductSearchResults(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCategory();
  }, [category_name]);

  useEffect(() => {
    api()
      .get("/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    api()
      .get("/stock")
      .then((response) => {
        setStocks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const combinedSearchResults = [...productSearchResults];

  console.log(category_name);
  console.log(searchResults);
  console.log(productSearchResults);

  return (
    <>
      <Flex id="baseContainerB">
        <SearchBar
          onSearch={performSearch}
          productSearchResults={productSearchResults}
        />
        <Flex id="headB" paddingTop={"20px"}></Flex>
        <Flex id="bgCategoryB" paddingBottom={"20px"}>
          <Flex id="categoryB">
            {categories.map((val) => (
              <CardCategory
                key={val.id}
                photo_category_url={val.photo_category_url}
                category_name={val.category_name}
              />
            ))}
          </Flex>
        </Flex>
        <Grid id="productB">
          {combinedSearchResults.map((val, idx) => (
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
