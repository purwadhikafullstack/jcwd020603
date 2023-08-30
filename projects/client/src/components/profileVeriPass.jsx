import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import ModalLogoutAdmin from "./modal-logout-admin";

export default function ProfileVeriPass() {
  const nav = useNavigate();
  const toast = useToast();
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logout = () => {
    dispatch({ type: "logout" });
    localStorage.removeItem("auth");
    localStorage.removeItem("nearestBranch");
    nav("/");
  };

  const verify = async () => {
    try {
      console.log(userSelector);
      const email = userSelector.email;
      console.log(email);
      const verifcek = userSelector.verification;
      console.log(verifcek);

      if (!verifcek) {
        toast({
          title: "Silahkan cek email Anda untuk link verifikasi",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        await api().get("/user/send-email-verify", {
          params: { email: email },
        });
      } else {
        return toast({
          title: "Akun Anda sudah terverifikasi",
          status: "warning",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Flex
        w={"100%"}
        h={"30%"}
        rounded={10}
        p={6}
        boxShadow={"lg"}
        flexDir={"column"}
        rowGap={"10px"}
        bgColor={"gray.100"}
        justifyContent={"space-evenly"}
      >
        <Button
          onClick={() => {
            nav("/change-pass");
          }}
          bgColor={"#118925"}
          color={"white"}
          fontWeight={"bold"}
          _hover={{
            background: "gray.200",
            color: "black",
          }}
        >
          Ganti Password
        </Button>
        <Button
          display={userSelector.verification == true ? "none" : "flex"}
          onClick={verify}
          bgColor={"#118925"}
          color={"white"}
          fontWeight={"bold"}
          _hover={{
            background: "green.200",
            color: "black",
          }}
        >
          Verifikasi Akun{" "}
        </Button>

        <Button
          onClick={onOpen}
          bgColor={"#118925"}
          color={"white"}
          fontWeight={"bold"}
          _hover={{
            background: "green.200",
            color: "black",
          }}
        >
          Keluar{" "}
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalLogoutAdmin onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
}
