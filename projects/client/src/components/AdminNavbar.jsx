import {
  Avatar,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { HiMenu, HiOutlineLogout } from "react-icons/hi";
import AdminSidebar from "./admin-sidebar"
import "../css/indexG.css";
import { useSelector } from "react-redux";
import ModalLogoutAdmin from "./modal-logout-admin";

export default function AdminNavbar() {
  const userSelector = useSelector((state) => state.auth);
  const windowWidth = window.innerWidth;
  const {
    isOpen: isOpenModal1,
    onOpen: onOpenModal1,
    onClose: onCloseModal1,
  } = useDisclosure();
  const {
    isOpen: isOpenModal2,
    onOpen: onOpenModal2,
    onClose: onCloseModal2,
  } = useDisclosure();
  return (
    <>
      <Flex
        maxW={"910px"}
        w={"100%"}
        h={"60px"}
        position={"fixed"}
        zIndex={1}
        top={0}
        justifyContent={windowWidth >= 880 ? "right" : "space-between"}
        alignItems={"center"}
        padding={"20px 30px"}
        bg={"white"}
      >
        {windowWidth <= 880 ? (
          <Flex>
            <Icon
              as={HiMenu}
              fontSize={"24px"}
              onClick={() => {
                onOpenModal1();
              }}
            />
          </Flex>
        ) : null}

        <Flex
          fontSize={"16px"}
          fontWeight={"500"}
          gap={"20px"}
          alignItems={"center"}
        >
          <Avatar w={"40px"} h={"40px"} />
          {userSelector.user_name}
          <Icon
            as={HiOutlineLogout}
            fontSize={"25px"}
            onClick={() => {
              onOpenModal2();
            }}
          />
        </Flex>
      </Flex>
      <Drawer isOpen={isOpenModal1} placement="left" onClose={onCloseModal1}>
        <DrawerOverlay />
        <DrawerContent
          css={{
            maxWidth: "250px",
          }}
        >
          <AdminSidebar />
        </DrawerContent>
      </Drawer>
      <Modal isOpen={isOpenModal2} onClose={onCloseModal2} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalLogoutAdmin onClose={onCloseModal2} />
        </ModalContent>
      </Modal>
    </>
  );
}
