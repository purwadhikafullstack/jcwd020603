import { Button, Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ModalLogoutAdmin(props) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: "logout" });
    localStorage.removeItem("auth");
    localStorage.removeItem("nearestBranch");
    return nav("/login");
  };

  return (
    <>
      <Flex padding={"20px"} flexDir={"column"} rowGap={"20px"}>
        <Flex fontWeight={"600"}>Apakah anda ingin logout?</Flex>
        <Flex justifyContent={"right"} gap={"20px"}>
          <Button
            color={"grey"}
            onClick={() => {
              props.onClose();
            }}
          >
            TIDAK
          </Button>
          <Button
            bg={" #f7d1d5"}
            color={"red"}
            onClick={() => {
              logout();
              props.onClose();
            }}
          >
            YA
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
