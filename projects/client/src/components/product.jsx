import { Flex, Grid, Image } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "./searchBar";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { CardProduct } from "./cardProduct";
import { useLocation, useParams } from "react-router-dom";
import { CardCategory } from "./cardCategory";
import InfiniteScroll from "react-infinite-scroll-component";
import loading from "../assets/loading.webp";

export default function Product() {
  const searchResults = useSelector((state) => state.search);
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const category_name = location.state?.category_name;
  const discount_id = location.state?.discount_id;
  const [productSearchResults, setProductSearchResults] = useState([]);
  const nearestBranch = JSON.parse(localStorage.getItem("nearestBranch"));

  const fetchStock = async () => {
    try {
      const endpoint = `/stock?nearestBranch=${nearestBranch}&&lastId=${lastId}`;
      const get = await api().get(endpoint);
      if (lastId) {
        setProductSearchResults((prevStocks) => [
          ...prevStocks,
          ...get.data.result,
        ]);
      } else {
        setProductSearchResults(get.data.result);
      }
      setHasMore(get.data.hasMore);
      setTempId(get.data.lastId);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchStock();
  }, [nearestBranch, lastId]);

  const fetchMore = () => {
    setLastId(tempId);
  };

  const performSearch = (searchTerm) => {
    api()
      .get("/stock/search", {
        params: {
          search_query: searchTerm,
          branch_id: JSON.parse(localStorage.getItem("nearestBranch")),
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
      .get("/stock/s-category", {
        params: {
          category_name: category_name,
          branch_id: JSON.parse(localStorage.getItem("nearestBranch")),
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
    getCategory();
  }, [category_name, discount_id]);

  useEffect(() => {
    api()
      .get("/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    getCategory();
  }, []);

  const combinedSearchResults = [...productSearchResults];

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
        <InfiniteScroll
          dataLength={combinedSearchResults.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <Flex justifyContent={"center"}>
              <Image src={loading} w={"30px"} h={"30px"} />
            </Flex>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
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
                quantity_stock={val.quantity_stock}
                weight={val.Product?.weight}
                stock_id={val.id}
              />
            ))}
          </Grid>
        </InfiniteScroll>
      </Flex>
    </>
  );
}
