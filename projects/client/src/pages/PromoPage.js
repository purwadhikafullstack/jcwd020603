import {
  Box,
  Center,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Footer from "../components/footer";
import Product from "../components/product";
import Sidebar from "../components/sidebar";
import { useLocation } from "react-router-dom";
import SidebarMini from "../components/sidebar-mini";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Promo from "../components/promo";
import ModalNearestBranch from "../components/modal-nearest-branch";

export default function PromoPage() {
  const [nearestBranch, setNearestBranch] = useState();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("nearestBranch"))) {
      setNearestBranch(JSON.parse(localStorage.getItem("nearestBranch")));
    }
  }, []);
  const windowWidth = window.innerWidth;
  const [nearestBranchSet, setNearestBranchSet] = useState(false);
  const [lengthCart, setLengthCart] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {windowWidth > 850 ? (
        <Center>
          <Flex maxWidth={"1160px"} w={"100%"}>
            <Flex>
              {windowWidth > 850 ? (
                <Sidebar
                  setLengthCart={setLengthCart}
                  nearestBranchSet={nearestBranchSet}
                />
              ) : (
                <SidebarMini
                  setLengthCart={setLengthCart}
                  nearestBranchSet={nearestBranchSet}
                />
              )}
            </Flex>
            <Flex flexDir={"column"}>
              <Promo nearestBranch={nearestBranch} />
            </Flex>
          </Flex>
        </Center>
      ) : (
        <>
          <Promo nearestBranch={nearestBranch} />
          <Footer lengthCart={lengthCart} nearestBranchSet={nearestBranchSet} />
        </>
      )}
      <Modal isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalNearestBranch onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
}
