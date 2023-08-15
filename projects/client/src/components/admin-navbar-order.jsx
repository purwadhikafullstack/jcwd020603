import {
  Avatar,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { HiMenu, HiOutlineLogout } from "react-icons/hi";
import AdminSidebar from "./admin-sidebar";
import { useSelector } from "react-redux";

export default function AdminNavbarOrder() {
  const userSelector = useSelector((state) => state.auth);
  const windowWidth = window.innerWidth;
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                onOpen();
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
          <Icon as={HiOutlineLogout} fontSize={"25px"} />
        </Flex>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          css={{
            maxWidth: "250px",
          }}
        >
          <AdminSidebar />
        </DrawerContent>
      </Drawer>
    </>
  );
}
