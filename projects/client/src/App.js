import { Provider } from "react-redux";
import store from "./redux/store";
import { Center, Spinner } from "@chakra-ui/react";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import routes from "./routes/Routes";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(setLoading(false));
      }, 1000);
    });
  }, [loading]);

  return (
    <>
      {loading ? (
        <Center h={"100vh"}>
          <Spinner />
        </Center>
      ) : (
        <Provider store={store}>
          <Routes>{routes.map((val) => val)}</Routes>
        </Provider>
      )}
    </>
  );
}

export default App;
