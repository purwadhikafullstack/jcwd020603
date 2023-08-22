import {
  Box,
  Center,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Category from "../components/category";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import TopBar from "../components/topbar";
import TopBar2 from "../components/topbar2";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import SidebarMini from "../components/sidebar-mini";
import { useDispatch } from "react-redux";
import ModalNearestBranch from "../components/modal-nearest-branch";

export default function LandingPage() {
  const windowWidth = window.outerWidth;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(false);
  const [latlong, setLatlong] = useState({
    latitude: "",
    longitude: "",
  });
  const getGeoloc = () => {
    const success = (position) => {
      // console.log(position.coords.latitude);
      // console.log(position.coords.longitude);
      // console.log(position);
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
  console.log("latlong", latlong);
  useEffect(() => {
    getGeoloc();
    // console.log(latlong);
  }, []);

  const [address, setAddress] = useState("");
  const getAddress = async () => {
    try {
      // console.log(latlong);
      const response = await api().get(
        `/address?latitude=${latlong.latitude}&longitude=${latlong.longitude}`
      );
      setAddress(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (latlong.latitude) {
      getAddress();
    }
    // console.log(latlong);
  }, [latlong]);

  //menyimpan alamat yang dipilih
  const [selectedAddress, setSelectedAddress] = useState({});
  const getSelectedAddress = async () => {
    const primary = await api().get("/addressG/primary");
    const selected = await api().get("/addressG/current");
    if (selected.data.result) {
      setSelectedAddress(selected.data.result);
    } else {
      setSelectedAddress(primary.data.result);
    }
  };
  useEffect(() => {
    getSelectedAddress();
  }, []);
  console.log(selectedAddress);
  //menyimpan length cart
  const [lengthCart, setLengthCart] = useState(0);

  // Fungsi untuk menghitung jarak berdasarkan latitude dan longitude menggunakan Haversine formula
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  // Fungsi untuk mengkonversi derajat menjadi radian
  function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Fungsi untuk mendapatkan geolokasi pengguna
  async function getGeoloc2() {
    return new Promise((resolve, reject) => {
      const success = (position) => {
        if (selectedAddress && Object.keys(selectedAddress).length > 0) {
          const latitude = selectedAddress?.latitude;
          const longitude = selectedAddress?.longitude;
          resolve({ latitude, longitude });
        } else {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        }
      };
      const error = () => {
        reject("Unable to retrieve user location.");
      };
      navigator.geolocation.getCurrentPosition(success, error);
    });
  }

  const [nearestBranch, setNearestBranch] = useState("");
  const [branchName, setBranchName] = useState("");
  const [minDistance, setMinDistance] = useState("");
  // Fungsi untuk mencari cabang terdekat
  async function findNearestBranch(userLat, userLon, branches) {
    let nearestBranch = null;
    let minDistance = Infinity;

    for (const branch of branches) {
      const branchLat = branch.latitude;
      const branchLon = branch.longitude;

      const distance = haversineDistance(
        userLat,
        userLon,
        branchLat,
        branchLon
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestBranch = branch;
      }
    }
    setMinDistance(minDistance);
    return nearestBranch;
  }
  console.log("minmin", minDistance);

  // Fungsi untuk mencari branch terdekat berdasarkan latitude dan longitude user
  async function findNearestBranchForUser() {
    try {
      const latlong = await getGeoloc2();
      const token = JSON.parse(localStorage.getItem("auth"));
      const response = await api().get("/branch/getbranch", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const branches = response.data;
      // console.log("ini branches", branches);
      const nearestBranch = await findNearestBranch(
        latlong.latitude,
        latlong.longitude,
        branches
      );

      return { nearestBranch, latlong };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
  // Contoh penggunaan
  findNearestBranchForUser()
    .then(({ nearestBranch, latlong }) => {
      if (nearestBranch) {
        // console.log(`Nearest branch to user: ${nearestBranch.branch_name}`);
        // console.log(`User latitude: ${latlong.latitude}`);
        // console.log(`User longitude: ${latlong.longitude}`);
        setNearestBranch(nearestBranch.id);
        setBranchName(nearestBranch.branch_name);
      } else {
        console.log("No branches found.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  useEffect(() => {
    if (nearestBranch && minDistance < 65) {
      return localStorage.setItem(
        "nearestBranch",
        JSON.stringify(nearestBranch)
      );
    } else if (nearestBranch && minDistance > 65) {
      localStorage.removeItem("nearestBranch");
      return onOpen();
    }
  }, [nearestBranch]);
  console.log(nearestBranch);
  console.log(branchName);

  return (
    <>
      {windowWidth > 850 ? (
        <Center>
          <Flex maxWidth={"1160px"} w={"100%"}>
            <Flex>
              {windowWidth > 850 ? (
                <Sidebar setLengthCart={setLengthCart} />
              ) : (
                <SidebarMini setLengthCart={setLengthCart} />
              )}
            </Flex>
            <Flex flexDir={"column"}>
              <TopBar
                setIsLoaded={setIsLoaded}
                isLoaded={isLoaded}
                address={address}
                selectedAddress={selectedAddress}
                branchName={branchName}
                minDistance={minDistance}
              />
              <Category
                lengthCart={lengthCart}
                selectedAddress={selectedAddress}
              />
            </Flex>
          </Flex>
        </Center>
      ) : (
        <>
          <TopBar2
            address={address}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            branchName={branchName}
            minDistance={minDistance}
          />
          <Category lengthCart={lengthCart} selectedAddress={selectedAddress} />
          <Footer lengthCart={lengthCart} />
        </>
      )}
      <Modal isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent w={"100%"} maxW={"430px"} borderRadius={"15px"}>
          <ModalNearestBranch onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
}
