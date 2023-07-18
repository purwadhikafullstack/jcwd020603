import { Flex, Center, Grid, Image, Button } from "@chakra-ui/react";
import bgSS from "../assets/logo/bg.jpg";
import "../css/indexB.css";
import { CardProduct } from "./cardProduct";
import { useLocation } from "react-router-dom";
import { SearchBar } from "./searchBar";
import { ACardProduct } from "./aCardProduct";
import { AdminSearchBar } from "./adminSearchBar";

export default function SAdminProduct() {
  const location = useLocation();
  const categoryName = location.state?.categoryName;
  const product = [
    {
      url: "https://s1.bukalapak.com/attachment/112432/contoh_sayuran_buah_image_1.jpg",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "",
    },
    {
      url: "https://siplah-rajastore.oss-ap-southeast-5.aliyuncs.com/product/8ki8n3xBfxQm3tXSEIFX90ajBgilLX3hrLeFW57D.jpg?x-oss-process=style/optimize",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "26%",
    },
    {
      url: "https://siplah-rajastore.oss-ap-southeast-5.aliyuncs.com/product/8ki8n3xBfxQm3tXSEIFX90ajBgilLX3hrLeFW57D.jpg?x-oss-process=style/optimize",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "%",
    },
    {
      url: "https://siplah-rajastore.oss-ap-southeast-5.aliyuncs.com/product/8ki8n3xBfxQm3tXSEIFX90ajBgilLX3hrLeFW57D.jpg?x-oss-process=style/optimize",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "50%",
    },
    {
      url: "https://siplah-rajastore.oss-ap-southeast-5.aliyuncs.com/product/8ki8n3xBfxQm3tXSEIFX90ajBgilLX3hrLeFW57D.jpg?x-oss-process=style/optimize",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "10%",
    },
    {
      url: "https://s1.bukalapak.com/attachment/112432/contoh_sayuran_buah_image_1.jpg",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "26%",
    },
    {
      url: "https://siplah-rajastore.oss-ap-southeast-5.aliyuncs.com/product/8ki8n3xBfxQm3tXSEIFX90ajBgilLX3hrLeFW57D.jpg?x-oss-process=style/optimize",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "26%",
    },
    {
      url: "https://siplah-rajastore.oss-ap-southeast-5.aliyuncs.com/product/8ki8n3xBfxQm3tXSEIFX90ajBgilLX3hrLeFW57D.jpg?x-oss-process=style/optimize",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "26%",
    },
    {
      url: "https://siplah-rajastore.oss-ap-southeast-5.aliyuncs.com/product/8ki8n3xBfxQm3tXSEIFX90ajBgilLX3hrLeFW57D.jpg?x-oss-process=style/optimize",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "26%",
    },
    {
      url: "https://siplah-rajastore.oss-ap-southeast-5.aliyuncs.com/product/8ki8n3xBfxQm3tXSEIFX90ajBgilLX3hrLeFW57D.jpg?x-oss-process=style/optimize",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "10%",
    },
    {
      url: "https://s1.bukalapak.com/attachment/112432/contoh_sayuran_buah_image_1.jpg",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "26%",
    },
    {
      url: "https://siplah-rajastore.oss-ap-southeast-5.aliyuncs.com/product/8ki8n3xBfxQm3tXSEIFX90ajBgilLX3hrLeFW57D.jpg?x-oss-process=style/optimize",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "26%",
    },
    {
      url: "https://siplah-rajastore.oss-ap-southeast-5.aliyuncs.com/product/8ki8n3xBfxQm3tXSEIFX90ajBgilLX3hrLeFW57D.jpg?x-oss-process=style/optimize",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "26%",
    },
    {
      url: "https://siplah-rajastore.oss-ap-southeast-5.aliyuncs.com/product/8ki8n3xBfxQm3tXSEIFX90ajBgilLX3hrLeFW57D.jpg?x-oss-process=style/optimize",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "26%",
    },
    {
      url: "https://siplah-rajastore.oss-ap-southeast-5.aliyuncs.com/product/8ki8n3xBfxQm3tXSEIFX90ajBgilLX3hrLeFW57D.jpg?x-oss-process=style/optimize",
      product_name: "Sembako",
      satuan: "1 liter / pack",
      price: "18500",
      discount: "10%",
    },
  ];
  return (
    <>
      <Flex id="baseContainerB">
        <AdminSearchBar />
        <Flex id="headB" paddingTop={"20px"}>
          PRODUK
        </Flex>
        <ACardProduct />
      </Flex>
    </>
  );
}
