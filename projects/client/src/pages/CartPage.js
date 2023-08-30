import { Box, Center, Flex } from "@chakra-ui/react";
import ContentKeranjang from "../components/content-keranjang";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import SidebarMini from "../components/sidebar-mini";
import WebKeranjang from "../components/web-content-keranjang";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function CartPage() {
  const windowWidth = window.innerWidth;
  const nearestBranch = JSON.parse(localStorage.getItem("nearestBranch"));
  // function get all cart
  const [prodCart, setProdCart] = useState([]);
  const getAll = async () => {
    try {
      await api()
        .get("/cart", { params: { branch_id: nearestBranch } })
        .then((res) => {
          setProdCart(res.data.result);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAll();
  }, []);
  return (
    <>
      {windowWidth > 600 ? (
        <Center>
          <Flex maxW={"1160px"} w={"100%"}>
            {windowWidth >= 750 ? (
              <Flex>
                <Sidebar prodCart={prodCart} />
              </Flex>
            ) : (
              <Flex>
                <SidebarMini prodCart={prodCart} />
              </Flex>
            )}
            {windowWidth >= 700 ? (
              <WebKeranjang prodCart={prodCart} getAll={getAll} />
            ) : (
              <ContentKeranjang prodCart={prodCart} getAll={getAll} />
            )}
          </Flex>
        </Center>
      ) : (
        <>
          <ContentKeranjang prodCart={prodCart} getAll={getAll} />
          <Footer prodCart={prodCart} />
        </>
      )}
    </>
  );
}
