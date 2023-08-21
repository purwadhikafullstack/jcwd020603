import { Route, Routes } from "react-router-dom";
// import "./App.css";
import routes from "./routes/Routes";
import { useEffect, useState } from "react";
import { Center, Image, Flex } from "@chakra-ui/react";
import logo from "./assets/SVG/2.svg";
import Loading from "./components/loading";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <>{loading ? <Loading /> : <Routes>{routes.map((val) => val)}</Routes>}</>
  );
}

export default App;
