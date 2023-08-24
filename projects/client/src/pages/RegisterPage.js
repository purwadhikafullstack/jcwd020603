import { Center, Flex } from "@chakra-ui/react";
import Register from "../components/Register";
import SideComp from "../components/SideComp";

export default function RegisterPage() {
  return (
    <>
      <Center w={"100vw"} h={"100vh"}>
        {/* <SideComp /> */}
        <Register />
      </Center>
    </>
  );
}
