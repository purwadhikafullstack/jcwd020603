// import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import routes from "./routes/Routes";
import { useEffect, useState } from "react";
import { Center, Image } from "@chakra-ui/react";
import logo from "./assets/SVG/2.svg";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });
  return (
    <>
      {loading ? (
        <Center
          h={"100vh"}
          // maxW={"500px"}
          w={"100%"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
        >
          <Image src={logo} w={"30%"} h={"30%"} />
        </Center>
      ) : (
        <Routes>{routes.map((val) => val)}</Routes>
      )}
    </>
  );
}

export default App;
