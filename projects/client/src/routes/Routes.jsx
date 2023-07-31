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
import SuperAdminCategoryPage from "../pages/Super-Admin-Category-Page";
import SuperAdminProductPage from "../pages/Super-Admin-Product-Page";
import AdminStockPage from "../pages/Admin-Stock-Page";

const routes = [
  <Route
    path="/"
    element={
      <ProtectedPage needLogin={true} guestOnly={true}>
        <LandingPage />
      </ProtectedPage>
    }
  ></Route>,

  <Route
    path="/dashboard"
    element={
      <ProtectedPage needLogin={true} guestOnly={true} adminOnly={true}>
        <Dashboard />
      </ProtectedPage>
    }
  ></Route>,

  // <Route
  //   path="/login"
  //   element={
  //     <ProtectedPage>
  //       <LoginPage />
  //     </ProtectedPage>
  //   }
  // ></Route>,

  // <Route
  //   path="/register"
  //   element={
  //     <ProtectedPage>
  //       <RegisterPage />
  //     </ProtectedPage>
  //   }
  // ></Route>,

  // <Route
  //   path="/verify/:token"
  //   element={
  //     <ProtectedPage>
  //       <VerifyPage />
  //     </ProtectedPage>
  //   }
  // ></Route>,

  // <Route
  //   path="/*"
  //   element={
  //     <ProtectedPage>
  //       <NotFound />
  //     </ProtectedPage>
  //   }
  // ></Route>,

  // <Route
  //   path="/dummy"
  //   element={
  //     <ProtectedPage>
  //       <Dummy />
  //     </ProtectedPage>
  //   }
  // ></Route>,

  // <Route path="/" element={<LandingPage />}></Route>,
  <Route path="/product" element={<ProductPage />}></Route>,
  <Route path="/sa-category" element={<SuperAdminCategoryPage />}></Route>,
  <Route path="/sa-product" element={<SuperAdminProductPage />}></Route>,
  <Route path="/a-stock" element={<AdminStockPage />}></Route>,

  // <Route path="/home" element={<Home />}></Route>,
  // <Route path="/homeadmin" element={<HomeAdmin />}></Route>,
  // <Route path="/" element={<Dummy />}></Route>,
  // <Route path="/dashboard" element={<Dashboard />}></Route>,
  <Route path="/login" element={<LoginPage />}></Route>,
  <Route path="/register" element={<RegisterPage />}></Route>,
  <Route path="/verify/:token" element={<VerifyPage />}></Route>,
  <Route path="/*" element={<NotFound />}></Route>,
];

export default routes;
