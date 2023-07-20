import { Route, Routes } from "react-router-dom";
// import "./App.css";
import routes from "./routes/Routes";
import { useEffect, useState } from "react";
import { Center, Image, Flex } from "@chakra-ui/react";
import logo from "./assets/SVG/2.svg";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <>
      {loading ? (
        <Center
          h={"100vh"}
          maxW={"100vw"}
          w={"100%"}
          display={"flex"}
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex w={"30%"} h={"30%"} justifyContent={"center"} p={4}>
            <Image src={logo} />
          </Flex>
        </Center>
      ) : (
        <Routes>{routes.map((val) => val)}</Routes>
      )}
    </>
  );
}

export default App;
