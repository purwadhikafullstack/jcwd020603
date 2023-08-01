import { Box, Center, Flex } from "@chakra-ui/react";
import Category from "../components/category";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import TopBar from "../components/topbar";
import TopBar2 from "../components/topbar2";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import SidebarMini from "../components/sidebar-mini";

export default function LandingPage() {
  const windowWidth = window.outerWidth;
  const [latlong, setLatlong] = useState({
    latitude: "",
    longitude: "",
  });
  const getGeoloc = () => {
    const success = (position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      console.log(position);
      setLatlong({
        ...latlong,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };
    const error = () => {
      alert("unable to retrive your location");
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };

  useEffect(() => {
    getGeoloc();
    // console.log(latlong);
  }, []);

  const [address, setAddress] = useState("");
  const getAddress = async () => {
    try {
      console.log(latlong);
      const response = await api.get(
        `/address?latitude=${latlong.latitude}&longitude=${latlong.longitude}`
      );
      console.log(response.data);
      setAddress(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (latlong.latitude) {
      getAddress();
    }
    console.log(latlong);
  }, [latlong]);
  //menyimpan alamat yang dipilih
  const [selectedAddress, setSelectedAddress] = useState({});

  return (
    <>
      {windowWidth > 600 ? (
        <Center>
          <Flex maxWidth={"1212px"} w={"100%"}>
            <Flex>{windowWidth > 750 ? <Sidebar /> : <SidebarMini />}</Flex>
            <Flex flexDir={"column"}>
              <TopBar
                address={address}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
              <Category />
            </Flex>
          </Flex>
        </Center>
      ) : (
        <>
          <TopBar2
            address={address}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
          <Category />
          <Footer />
        </>
      )}
    </>
  );
}
