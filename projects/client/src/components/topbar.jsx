import { Flex, Icon, Skeleton, SkeletonText } from "@chakra-ui/react";
import { MdLocationPin } from "react-icons/md";
import logo from "../assets/logo/vertical.png";

import "../css/indexB.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TopBar({
  address,
  selectedAddress,
  branchName,
  isLoaded,
  setIsLoaded,
  minDistance,
}) {
  const userSelector = useSelector((state) => state.auth);
  console.log(branchName);
  console.log(selectedAddress);
  const nav = useNavigate();
  const [district, setDistrict] = useState("");
  const getFormattedAddress = () => {
    if (address) {
      const splitAddress = address.split(",");
      setDistrict(splitAddress.length > 0 ? splitAddress[1].trim() : "");
    }
  };
  useEffect(() => {
    getFormattedAddress();
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
        <Flex id="topBarB">
          <Flex
            alignItems={"center"}
            className="flexSideBarB"
            cursor={"pointer"}
            onClick={() => nav("/address")}
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
    </>
  );
}
