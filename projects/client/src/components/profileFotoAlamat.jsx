import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Input,
  Image,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/api";
import { GrDocumentUpdate } from "react-icons/gr";
import logoPro from "../assets/PNG/bgProfile3.png";
import { Link } from "react-router-dom";

export default function ProfileFotoAlamat() {
  const userSelector = useSelector((state) => state.auth);
  console.log(userSelector);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(userSelector.avatar_url);
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const updateAvatar = async () => {
    const formData = new FormData();
    formData.append("Avatar", selectedFile);
    let avatar;
    await api()
      .patch("/user/avatar/" + userSelector.id, formData)
      .then((res) => (avatar = res.data));

    if (avatar) {
      dispatch({
        type: "login",
        payload: avatar,
      });
    }
    toast({
      title: "Data berhasil di ubah",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  //get primary address user
  const [primaryAddress, setPrimaryAddress] = useState({});
  const getPrimary = async () => {
    const primary = await api().get("addressG/primary");
    setPrimaryAddress(primary.data.result);
  };
  useEffect(() => {
    getPrimary();
  }, []);
  console.log(primaryAddress);

  return (
    <>
      <Flex
        w={"100%"}
        h={"100%"}
        boxShadow={"lg"}
        flexDir={"column"}
        rowGap={"20px"}
        bgColor={"gray.100"}
        padding={"20px"}
        borderRadius={"10px"}
      >
        <Flex
          w={"100%"}
          h={"100%"}
          minH={"350px"}
          boxShadow={"dark-lg"}
          p={2}
          rounded={10}
          position={"relative"}
        >
          <Center cursor={"pointer"} w={"100%"}>
            <Input
              accept="image/png , image/jpg, image/gif"
              onChange={handleFile}
              ref={inputFileRef}
              type="file"
              display={"none"}
            />
            <Avatar
              zIndex={4}
              size={"2xl"}
              src={image}
              onClick={() => {
                inputFileRef.current.click();
              }}
            />
            <Image
              position={"absolute"}
              src={logoPro}
              rounded={12}
              w={"100%"}
              minH={"350px"}
              h={"100%"}
              blur={"3xl"}
              filter={"blur(2px)"}
            ></Image>
          </Center>
          <Button
            position={"absolute"}
            zIndex={"4"}
            fontWeight={"bolder"}
            isLoading={loading}
            bgColor={"green.200"}
            // variant={"ghost"}
            color={"green"}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                updateAvatar();
              }, 1000);
            }}
          >
            <Icon as={GrDocumentUpdate} mr={"10%"}></Icon> Simpan
          </Button>
        </Flex>
        <Flex
          w={"100%"}
          h={"100%"}
          justifyContent={"space-around"}
          alignItems={"center"}
          rounded={10}
          boxShadow={"dark-lg"}
          padding={"5px"}
        >
          <Icon
            textAlign={"center"}
            as={FaMapMarkerAlt}
            w={"8%"}
            h={"30px"}
            color={"red.600"}
          ></Icon>
          <Flex
            flexDir={"column"}
            w={"80%"}
            h={"80%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {primaryAddress && Object.keys(primaryAddress).length > 0 ? (
              <Box fontSize={"14px"} fontWeight={"bold"} cursor={"pointer"}>
                {primaryAddress?.address}, {primaryAddress?.district},{" "}
                {primaryAddress?.City?.type} {primaryAddress?.City?.city_name} -{" "}
                {primaryAddress?.City?.province}
              </Box>
            ) : (
              <Flex fontSize={"14px"} fontWeight={"bold"} cursor={"pointer"}>
                {" "}
                Atur Alamat Utama{" "}
                <Link to={"/address"}>
                  <Flex color={"green"} paddingLeft={"3px"}>
                    disini
                  </Flex>
                </Link>
              </Flex>
            )}

            {/* <Box border={"1px solid gray"} w={"100%"}></Box> */}
            {/* <Button
              w={"100%"}
              h={"30%"}
              fontWeight={"bold"}
              bgColor={"#118925"}
              color={"white"}
              _hover={{
                color: "black",
                bgColor: "green.200",
              }}
            >
              Edit Alamat
            </Button> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
