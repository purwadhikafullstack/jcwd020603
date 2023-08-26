import { Flex, Grid } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { CardProduct } from "./cardProduct";
import { useLocation, useParams } from "react-router-dom";

export default function Promo({ nearestBranch }) {
  const userSelector = useSelector((state) => state.auth);

  const [discountProduct, setDiscountProduct] = useState([]);
  const location = useLocation();
  const category_name = location.state?.category_name;
  const discount_id = location.state?.discount_id;

  const getDiscountProduct = async () => {
    console.log(discount_id);

    try {
      const response = await api().get("/stock/discount", {
        params: {
          discount_id: discount_id,
          branch_id:
            nearestBranch || JSON.parse(localStorage.getItem("nearestBranch")),
        },
      });
      console.log("respnse", response.data);
      setDiscountProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDiscountProduct();
  }, [category_name, discount_id]);

  return (
    <>
      <Flex id="baseContainerB">
        <Flex id="headB" paddingTop={"20px"}>
          {discountProduct.length > 0 && (
            <div style={{ fontSize: "40px", fontWeight: "bold" }}>
              {discountProduct[0].Discount.title}
            </div>
          )}
        </Flex>
        <Grid id="productB">
          {discountProduct.map((val, idx) => (
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
