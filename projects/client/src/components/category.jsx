import { useState, useEffect } from "react";
import {
  Flex,
  Center,
  Grid,
  Image,
  Box,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import "../css/indexB.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CardProduct } from "./cardProduct";
import { CardCategory } from "./cardCategory";
import { CardCarousel } from "./cardCarousel";
import { SearchBar } from "./searchBar";
import { api } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../redux/searchAction";
import InfiniteScroll from "react-infinite-scroll-component";
import loading from "../assets/loading.webp";
import { CardCarouselDefault } from "./cardCarouselDefault";

export default function Category({
  lengthCart,
  selectedAddress,
  nearestBranchSet,
  minDistance,
  nearestBranch,
}) {
  const [categories, setCategories] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stocks, setStocks] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const discountIds = stocks
    .map((stock) => stock.discount_id)
    .filter((discountId) => discountId !== null);
  const uniqueDiscountIds = Array.from(new Set(discountIds));
  const dispatch = useDispatch();
  const performSearch = (searchTerm) => {
    const searchResults = stocks.filter((val) =>
      val.Product.product_name.includes(searchTerm)
    );
    dispatch(setSearchResults(searchResults));
  };

  const fetchStock = async () => {
    try {
      const endpoint =
        minDistance > 65
          ? `/stock?lastId=${lastId}`
          : `/stock?nearestBranch=${nearestBranch}&&lastId=${lastId}`;
      const get = await api().get(endpoint);
      if (lastId) {
        setStocks((prevStocks) => [...prevStocks, ...get.data.result]);
      } else {
        setStocks(get.data.result);
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

  useEffect(() => {
    api()
      .get("/category")
      .then((response) => {
        setCategories(response.data);
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

  useEffect(() => {
    api()
      .get("/discount")
      .then((response) => {
        setDiscounts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Menyimpan searchTerm ke local storage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  return (
    <>
      <Flex id="baseContainerB">
        <SearchBar nearestBranch={nearestBranch} onSearch={performSearch} />
        <Flex id="headB" paddingTop={"20px"}>
          KATEGORI
        </Flex>
        <Flex id="bgCategoryB">
          <Flex id="categoryB">
            {categories.map((val) => (
              <CardCategory
                key={val.id}
                photo_category_url={val.photo_category_url}
                category_name={val.category_name}
                nearestBranch={nearestBranch}
              />
            ))}
          </Flex>
        </Flex>
        <Flex id="carouselB" paddingTop={"10px"}>
          {uniqueDiscountIds.length ? (
            <Carousel autoPlay interval={5000} infiniteLoop>
              {discounts
                .filter((val) => uniqueDiscountIds.includes(val.id))
                .map((val) => (
                  <CardCarousel
                    discount_id={val.id}
                    photo_discount_url={val.photo_discount_url}
                    nearestBranch={nearestBranch}
                    key={val.url}
                  />
                ))}
            </Carousel>
          ) : (
            <Carousel autoPlay interval={5000} infiniteLoop>
              <CardCarouselDefault />
            </Carousel>
          )}
        </Flex>
        <Flex id="headB">PRODUK</Flex>
        <InfiniteScroll
          dataLength={stocks.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <Flex justifyContent={"center"}>
              <Image src={loading} w={"30px"} h={"30px"} />
            </Flex>
          }
        >
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
                quantity_stock={val.quantity_stock}
                stock_id={val.id}
                lengthCart={lengthCart}
                selectedAddress={selectedAddress}
              />
            ))}
          </Grid>
        </InfiniteScroll>
      </Flex>
    </>
  );
}
