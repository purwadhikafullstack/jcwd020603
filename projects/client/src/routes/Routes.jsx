import { Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFound from "../pages/NotFound";
import ProtectedPage from "./ProtectedPage";
import Dummy from "../pages/Dummy";
import VerifyPage from "../pages/VerifyPage";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import ProductPage from "../pages/ProductPage";
import SAProductPage from "../pages/SAdminProductPage";

const routes = [
  // <Route
  //   path="/"
  //   element={
  //     <ProtectedPage needLogin={true} guestOnly={true} userOnly={true}>
  //       <LandingPage />
  //     </ProtectedPage>
  //   }
  // ></Route>,

  <Route
    path="/dashboard"
    element={
      <ProtectedPage needLogin={true}>
        <Dashboard />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/login"
    element={
      <ProtectedPage guestOnly={true}>
        <LoginPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/register"
    element={
      <ProtectedPage guestOnly={true}>
        <RegisterPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/verify/:token"
    element={
      <ProtectedPage guestOnly={true}>
        <VerifyPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/*"
    element={
      <ProtectedPage>
        <NotFound />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/dummy"
    element={
      <ProtectedPage>
        <Dummy />
      </ProtectedPage>
    }
  ></Route>,

  <Route path="" element={<LandingPage />}></Route>,
  <Route path="/product" element={<ProductPage />}></Route>,
  <Route path="/sa-product" element={<SAProductPage />}></Route>,
  // <Route path="/home" element={<Home />}></Route>,
  // <Route path="/homeadmin" element={<HomeAdmin />}></Route>,
  // <Route path="/" element={<Dummy />}></Route>,
  // <Route path="/login" element={<LoginPage />}></Route>,
  // <Route path="/register" element={<RegisterPage />}></Route>,
  // <Route path="/verify/:token" element={<VerifyPage />}></Route>,
  // <Route path="/*" element={<NotFound />}></Route>,
];

export default routes;
