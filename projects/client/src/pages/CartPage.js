import { Box, Center, Flex } from "@chakra-ui/react";
import ContentKeranjang from "../components/content-keranjang";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import SidebarMini from "../components/sidebar-mini";
import WebKeranjang from "../components/web-content-keranjang";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useDispatch } from "react-redux";

export default function CartPage() {
  const windowWidth = window.innerWidth;
  const nearestBranch = JSON.parse(localStorage.getItem("nearestBranch"))
  // function get all cart
  const [prodCart, setProdCart] = useState([]);
  const getAll = async () => {
    await api()
      .get("/cart",{params:{branch_id:nearestBranch}})
      .then((res) => {
        setProdCart(res.data.result);
        console.log(res.data.result);
      });
  };
  //function getItem dan dispatch address
  // const dispatch = useDispatch();
  // const getAddress = () => {
  //   try {
  //     const alamat = JSON.parse(localStorage.getItem("address"));
  //     dispatch({
  //       type: "address",
  //       payload: alamat,
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  useEffect(() => {
    getAll();
    // getAddress();
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
              <ContentKeranjang />
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
    // <>
    //   {windowWidth > 600 ? (
    //     <Center>
    //       <Flex maxWidth={"1160px"} w={"100%"}>
    //         <Flex>
    //           {windowWidth > 750 ? (
    //             <Sidebar prodCart={prodCart} />
    //           ) : (
    //             <SidebarMini />
    //           )}
    //         </Flex>
    //         <Flex maxW={"910px"} bg={"blue"}>
    //           {windowWidth > 700 ? (
    //             <Flex maxWidth={"910px"} bg={"red"}>
    //               <WebKeranjang prodCart={prodCart} getAll={getAll} />
    //             </Flex>
    //           ) : (
    //             <Flex>
    //               <ContentKeranjang prodCart={prodCart} getAll={getAll} />
    //             </Flex>
    //           )}
    //         </Flex>
    //       </Flex>
    //     </Center>
    //   ) : (
    //     <>
    //       <ContentKeranjang prodCart={prodCart} getAll={getAll} />
    //       <Footer />
    //     </>
    //   )}
    // </>
  );
}
