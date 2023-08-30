import {
  Button,
  Center,
  Container,
  Flex,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function HomeAdmin() {
  const nav = useNavigate();
  const toast = useToast();
  const userSelector = useSelector((state) => state.auth);

  const verify = async () => {
    try {
      toast.closeAll();
      const email = userSelector.email;
      const verifcek = userSelector.verification;
      console.log(verifcek);

      if (!verifcek) {
        await api()
          .get("/user/send-email-verify", {
            params: { email: email },
          })
          .then((res) => {
            alert(res.data.message);
            toast({
              title: "Silahkan cek email kamu untuk link verifikasi",
              status: "success",
              position: "top",
              duration: 5000,
              isClosable: true,
            });
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
      <Center
        w={"100vw"}
        h={"100vh"}
        alignContent={"center"}
        bgColor={("green.200", "green.200")}
      >
        <Flex
          size={"lg"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          w={"50%"}
          h={"50%"}
          fontSize={"200%"}
          gap={"5%"}
          rounded={"5"}
        >
          Selamat Datang di DASHBOARD PAGE untuk ADMIN
          <Button
            onClick={() => {
              nav("/");
            }}
          >
            Dummy
          </Button>
          <Button onClick={verify}>Verify</Button>
        </Flex>
      </Center>
    </>
  );
}
