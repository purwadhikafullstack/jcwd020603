import {
  Flex,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MdLocationPin } from "react-icons/md";
import logo from "../assets/logo/horizontal.png";

import "../css/indexB.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalSetAlamat from "./modal-set-alamat";

export default function TopBar2({
  address,
  selectedAddress,
  branchName,
  isLoaded,
  setIsLoaded,
  minDistance,
}) {
  const userSelector = useSelector((state) => state.auth);
  console.log("test", branchName);
  const nav = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [district, setDistrict] = useState("");
  //menampilkan lokasi user dari geoloc
  const getFormattedAddress = () => {
    if (address) {
      const splitAddress = address.split(",");
      return setDistrict(splitAddress.length > 0 ? splitAddress[1].trim() : "");
    }
  };
  //check user sebelum set alamat
  const checkUser = () => {
    if (!userSelector?.user_name) {
      onOpen();
    } else {
      nav("/address");
    }
  };
  useEffect(() => {
    getFormattedAddress();
    if (!address) {
      setIsLoaded(true);
    }
  }, [address]);
  console.log(district);
  useEffect(() => {
    if (district) {
      setIsLoaded(true);
    }
  }, [district]);
  return (
    <>
      <Flex id="containerTopBarB" justifyContent={"center"}>
        <Flex id="topBar2B">
          <Flex id="logoSSB" paddingLeft={"5px"} cursor={"pointer"}>
            <img src={logo} className="logoB" alt="" />
          </Flex>
          <Flex
            alignItems={"center"}
            className="flexSideBarB"
            cursor={"pointer"}
            onClick={checkUser}
          >
            <Icon id="iconLocationB" as={MdLocationPin} />
            <Skeleton height={"30px"} isLoaded={isLoaded}>
              <Flex id="alamatTopBarB">
                {address ? (
                  selectedAddress?.address != null ? (
                    <>
                      <Flex>Alamat Anda : {selectedAddress?.address}</Flex>
                      <Flex>
                        Toko Terdekat :{" "}
                        {minDistance < 65 ? branchName : "Tidak Tersedia"}
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Flex>alamat anda</Flex>
                      <Flex>{district}</Flex>
                    </>
                  )
                ) : selectedAddress?.address != null ? (
                  <>
                    <Flex>Alamat Anda : {selectedAddress?.address}</Flex>
                    <Flex>
                      Toko Terdekat :{" "}
                      {minDistance < 65 || minDistance == Infinity
                        ? branchName
                        : "Tidak Tersedia"}
                    </Flex>
                  </>
                ) : (
                  <>
                    <Flex>Alamat belum dipilih</Flex>
                    <Flex>Mulai atur alamat pengiriman</Flex>
                  </>
                )}
              </Flex>
            </Skeleton>
          </Flex>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalSetAlamat onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
}
