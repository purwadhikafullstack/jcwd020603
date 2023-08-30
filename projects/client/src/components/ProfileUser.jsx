import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Image,
  Box,
  InputGroup,
} from "@chakra-ui/react";
import { api } from "../api/api";
import "../css/indexR.css";
// import { FaMapMarkerAlt } from "react-icons/fa";
// import { TbCameraPlus } from "react-icons/tb";
import { HiMiniPencilSquare } from "react-icons/hi2";
// import { Icon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import ProfileFotoAlamat from "./profileFotoAlamat";
import ProfileData from "./profileData";

export default function Profile() {
  const userSelector = useSelector((state) => state.auth);
  // const bd = userSelector.birth_date.spil("T", 0);
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const [image, setImage] = useState(userSelector.avatar_url);
  const [bgimage, setBgimage] = useState(userSelector.bg_url);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    setSelectedFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    let avatar;
    await api()
      .post("avatar/" + userSelector.id, selectedFile)
      .then((res) => {
        avatar = res.data;
      });

    if (avatar) {
      dispatch({
        type: "login",
        payload: avatar,
      });
    }
    alert("berhasil");
  };

  useEffect(() => {
    if (selectedFile) {
      return uploadFile;
    }
  }, [selectedFile]);

  return (
    <Flex className="responsiveProfile">
      <ProfileFotoAlamat />
      <ProfileData />
    </Flex>
  );
}
